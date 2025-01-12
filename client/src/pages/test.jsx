import React, { useState } from "react";
import axios from "axios";

function Test() {
  const [indexUrl, setIndexUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle PDF download and processing
  const handleDownloadAndProcess = async () => {
    setLoading(true);
    console.log(indexUrl)
    try {
      const response = await axios.post(
        `http://localhost:3000/api/queries/download_and_process`,{
             index_url: indexUrl,
        }
      );
      console.log(response); // Notify the user of success
      setLoading(false);
    } catch (err) {
      setError("Error downloading and processing PDF");
      setLoading(false);
    }
  };

  // Handle query to the language model
  const handleQuery = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/queries/query", {
        question,
      });
      setAnswer(response.data.answer);
      setLoading(false);
    } catch (err) {
      setError("Error querying the model");
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>ML Integration with MERN Stack</h1>

      <div>
        <h2>Download and Process PDF</h2>
        <input
          type="text"
          placeholder="Enter PDF URL"
          value={indexUrl}
          onChange={(e) => setIndexUrl(e.target.value)}
        />
        <button onClick={handleDownloadAndProcess} disabled={loading}>
          {loading ? "Processing..." : "Download and Process PDF"}
        </button>
      </div>

      <div>
        <h2>Ask a Question</h2>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleQuery} disabled={loading}>
          {loading ? "Querying..." : "Ask Question"}
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {answer && (
        <div>
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default Test;
