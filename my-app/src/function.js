import React, { useState } from 'react';
import './App.css';


function UploadFile() {
    const [selectedFile, setSelectedFile] = useState(null);  // State to hold the selected file
    const [imagePreview, setImagePreview] = useState(null);  // State to hold the image preview URL
    const [result, setResult] = useState(null); //state to hold result from ai model (smile/unsmile)

    // Function to handle file input changes
    const handleFileChange = (event) => {
        const file = event.target.files[0];  // Access the first selected file

        if (file && file.type.startsWith('image/')) {  // Check if the file is an image
            setSelectedFile(file);  // Store the file in the state

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);  // Set the image preview URL
            };
            reader.readAsDataURL(file);  // Read the file as a Data URL for image preview

            //if(){ // 'smiling' depends on what backend sends over
                //setResult("Smiling!");
            //}
            //else{
                //setResult("Not smiling");
            //}        

        } else {
            alert('Please select an image file.');
            setSelectedFile(null);  // Reset the selected file if it's not an image
            setImagePreview(null);  // Clear the image preview
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} className="file-button"/>  {/* File input */}
            
            {imagePreview && (
                <div>
                    <h3>Image Preview:</h3>
                    <img src={imagePreview} alt="Selected" style={{ width: '300px', height: 'auto' }} />  {/* Display the image preview */}

                    <h1>{result}</h1>
                </div>
            )}
        </div>
    );
}





export default UploadFile;