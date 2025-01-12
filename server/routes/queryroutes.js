const express = require('express');
const axios = require('axios');
const router = express.Router();

// FastAPI Base URL
const FASTAPI_BASE_URL = 'http://127.0.0.1:8000';

// Route to trigger download and processing
router.post('/download_and_process', async (req, res) => {
    const { index_url } = req.body; 
console.log(index_url)
    if (!index_url) {
        return res.status(400).json({ error: 'index_url query parameter is required' });
    }

    try {
        console.log("Sending index_url to FastAPI for processing:", index_url);

        // Send the request to the FastAPI backend
        const response = await axios.get(`${FASTAPI_BASE_URL}/download_and_process`, {
            params: { index_url },
        });

        console.log("Response from FastAPI:", response.data);
        res.json(response.data); // Send FastAPI response back to the client
    } catch (error) {
        console.error("Error in /download_and_process:", error.message);
        if (error.response) {
            console.error("FastAPI Response Error:", error.response.data);
        }
        res.status(500).json({ error: 'Failed to download and process the document' });
    }
});

// Route to query the processed data
router.post('/query', async (req, res) => {
    const { question } = req.body; // Extract question from request body

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    try {
        console.log("Sending question to FastAPI for querying:", question);

        // Send the request to the FastAPI backend
        const response = await axios.post(`${FASTAPI_BASE_URL}/query`, { question });

        console.log("Response from FastAPI:", response.data);
        res.json(response.data); // Send FastAPI response back to the client
    } catch (error) {
        console.error("Error in /query:", error.message);
        if (error.response) {
            console.error("FastAPI Response Error:", error.response.data);
        }
        res.status(500).json({ error: 'Failed to query the model' });
    }
});

module.exports = router;
