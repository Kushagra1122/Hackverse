const url = `https://api.cloudinary.com/v1_1/dypgk6xao/raw/upload`; // Use 'raw/upload' for non-image files

const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "pdfs_file"); // Replace with your actual preset

        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload file: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Upload successful:", responseData);

        return responseData; // Contains `secure_url`, `public_id`, etc.
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export default uploadFile;
