from flask import Flask, request, jsonify
import numpy as np
import cv2
import tensorflow as tf
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model once at startup
model = tf.keras.models.load_model('models/smaile.h5')

def preprocess_image(image_file):
    """Loads and preprocesses the image for the model from a file stream."""
    img_array = np.frombuffer(image_file.read(), np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (256, 256))  # Resize to match model input
    img = np.expand_dims(img, axis=0) / 255.0  # Normalize pixel values
    return img

def predict_smile(image_file):
    """Predicts whether the person in the image is smiling or not from a file stream."""
    processed_image = preprocess_image(image_file)
    prediction = model.predict(processed_image)
    
    # Return a native Python boolean for JSON serialization
    return bool(prediction[0][0] > 0.5)  # Convert numpy boolean to Python boolean

@app.route('/api/check-smile', methods=['POST'])
def check_smile():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']

    # Predict smile status using the file directly
    is_smiling = predict_smile(file)  # Get boolean result

    return jsonify({'smiling': is_smiling})  # Return boolean in the response

if __name__ == '__main__':
    app.run(debug=True)
