import json
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

with open('chunked_text.json','r') as f:
    data = json.load(f)

def generate_embeddings(data,model,batch_size=32):

    model_embeddings = {}
    chunk_embeddings=[]
    ids = list(data.keys())
    chunks = list(data.values())

    for i in range (0,len(chunks),batch_size):

        embeddings = model.encode(chunks[i:i+batch_size])
        chunk_embeddings.extend(embeddings)
    
    model_embeddings = dict(zip(ids,chunk_embeddings))
    return model_embeddings
    

embeddings = generate_embeddings(data,model)

#print (type(embeddings), len(embeddings),len(ids))

import pickle

with open('embeddings.pkl','wb') as f:
    pickle.dump(embeddings,f)


'''
storing the genreated embeddings in vector database
for efficient similarity searches and quick lookups 
using faiss vector database
'''
import pickle
import faiss 
import numpy as np


def store_in_faiss(embeddings):
    dimension = len(next(iter(embeddings.values())))
    index = faiss.IndexFlatL2(dimension)
    ids = list(embeddings.keys())
    vectors = list(embeddings.values())

    # converting to numpy array and adding to datdabase index
    vectors = np.array(vectors).astype('float32')
    index.add(vectors)

    return ids, index


with open('embeddings.pkl','rb') as f:
    embeddings = pickle.load(f)

ids, index = store_in_faiss(embeddings)

faiss.write_index(index,'faiss_index.bin')
