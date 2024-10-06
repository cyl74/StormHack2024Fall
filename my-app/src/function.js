import React, { useState } from 'react';
import './App.css';


function UploadFile() {
    const [selectedFile, setSelectedFile] = useState(null);  // State to hold the selected file
    const [imagePreview, setImagePreview] = useState(null);  // State to hold the image preview URL
    const [result, setResult] = useState(null); // State to hold result from AI model (smile/unsmile)
    const [error, setError] = useState(null); // State to hold error messages

    // Function to handle file input changes
    const handleFileChange = async (event) => {
        const file = event.target.files[0];  // Access the first selected file

        if (file && file.type.startsWith('image/')) {  // Check if the file is an image
            setSelectedFile(file);  // Store the file in the state

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);  // Set the image preview URL
            };
            reader.readAsDataURL(file);  // Read the file as a Data URL for image preview

            // Make API call to check for smile
            const formData = new FormData();
            formData.append('image', file);  // Append the image file to FormData

            try {
                const response = await fetch('http://localhost:5000/api/check-smile', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    // Update result based on API response
                    setResult(data.smiling ? "Smiling!" : "Not smiling");
                    setError(null); // Clear any previous error
                } else {
                    setError(data.error || 'Something went wrong');
                    setResult(null); // Clear result if there's an error
                }
            } catch (error) {
                setError('Error connecting to the server');
                setResult(null); // Clear result if there's an error
            }
        } else {
            alert('Please select an image file.');
            setSelectedFile(null);  // Reset the selected file if it's not an image
            setImagePreview(null);  // Clear the image preview
            setResult(null); // Clear result
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} className="file-button"/>  {/* File input */}
            
            {imagePreview && (
                <div>
                    <h3>Image Preview:</h3>
                    <img src={imagePreview} alt="Selected" style={{ width: '300px', height: 'auto' }} />  {/* Display the image preview */}
                    <h1>{result}</h1> {/* Display the smile result */}
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
                </div>
            )}
        </div>
    );
}


export default UploadFile;