import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedURL, setUploadedURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [auth] = useAuth();
  const navigate=useNavigate()
  useEffect(() => {
    if (auth?.user?.role !== "professor") {
      navigate("/");
    }
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadMessage(""); // Reset the message
    setUploadedURL(""); // Reset the uploaded URL

    if (file) {
      if (file.type !== "application/pdf") {
        setUploadMessage("Only PDF files are allowed.");
        setSelectedFile(null);
        return;
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile || !title || !date) {
      setUploadMessage("Please fill in all fields and select a file.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", title);
      formData.append("date", date);
      formData.append("profId", auth?.user?._id);

      // Send the file to the backend
      const response = await fetch("http://localhost:8000/api/prof/upload", {
        method: "POST",
        headers: {
          Authorization: auth.token,
        },
        body: formData,
      });

      const res = await response.json();

      if (response.ok) {
        setUploadedURL(res.fileUrl); // URL returned from Cloudinary
        setUploadMessage("Upload successful!");
      } else {
        setUploadMessage(res.message || "Failed to upload data.");
      }
    } catch (error) {
      setUploadMessage("An error occurred during the upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Upload Your PDF
        </h1>
        <form onSubmit={handleUpload}>
          {/* Title Input */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter title"
            />
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* File Input */}
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-medium mb-2"
            >
              Select PDF File
            </label>
            <input
              type="file"
              id="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full ${
              isUploading ? "bg-gray-400" : "bg-indigo-600"
            } text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {/* Upload Message */}
        {uploadMessage && (
          <p className="text-center text-gray-700 mt-4">{uploadMessage}</p>
        )}

        {/* Uploaded File URL */}
        {uploadedURL && (
          <div className="mt-4">
            <p className="text-gray-700">File URL:</p>
            <div className="space-x-2">
              {/* View Link */}
              <a
                href={uploadedURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                View PDF
              </a>
              {/* Download Link */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
