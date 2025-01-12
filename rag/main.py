from fastapi import FastAPI, HTTPException
import requests
from pydantic import BaseModel
import faiss
import json
from sentence_transformers import SentenceTransformer
import numpy as np
import importlib
import subprocess

model = SentenceTransformer('all-MiniLM-L6-v2')
app = FastAPI()

from dotenv import load_dotenv
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv('HF_API_KEY')
headers = {'Authorization':f'Bearer {API_KEY}'}
API_URL = 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B'


if not API_KEY:
    raise ValueError("HF_API_KEY not found in environment variables.")

class QueryInput(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str

@app.get('/download_and_process')
async def download_and_process(index_url: str):
    extract_module = importlib.import_module('extract')
    download_pdf = getattr(extract_module, 'download_pdf')
    download_pdf(index_url, 'knowledge_base/download_1.pdf')

    try:
        result_extract = subprocess.run(
            ['python', 'preprocess.py', 'knowledge_base/download_1.pdf'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if result_extract.returncode != 0:
            raise Exception(f"Error during extract.py execution: {result_extract.stderr.decode()}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in extract.py: {str(e)}")

    # Step 2: Run embedding.py to generate chunked_text.json and faiss_index.bin
    try:
        result_embedding = subprocess.run(
            ['python', 'embeddings.py'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        if result_embedding.returncode != 0:
            raise Exception(f"Error during embedding.py execution: {result_embedding.stderr.decode()}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in embedding.py: {str(e)}")

    # Initialize faiss index and metadata after download_pdf is completed
    global index, metadata
    index = faiss.read_index('faiss_index.bin')
    with open('chunked_text.json', 'r') as f:
        metadata = json.load(f)
    
    return {"status": "Download and processing completed"}

def answer_query(query, model, index, metadata, k=5):
    query_encoded = model.encode(query).reshape(1, -1)
    distances, indices = index.search(query_encoded, k)
    results = [metadata[list(metadata.keys())[idx]] for idx in indices[0]]
    return results

def query_llm(prompt: str) -> str:
    response = requests.post(API_URL, headers=headers, json=prompt)
    return response

@app.post('/query', response_model=QueryResponse)
async def query_endpoint(input: QueryInput) -> QueryResponse:
    try:
        query = input.question
        relevant_chunks = answer_query(query, model, index, metadata, k=3)
        context = '\n\n'.join(relevant_chunks)
        prompt = {
            "inputs": f"Context: {context}\nQuestion: {query}\nAnswer:",
            "parameters": {"temperature": 0.7, "top_p": 0.9, "repetition_penalty": 1.2}
        }
        answer = query_llm(prompt).json()[0]['generated_text'].split('Answer:')[-1]
        return QueryResponse(answer=answer[:answer.rindex('.')+1])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")
