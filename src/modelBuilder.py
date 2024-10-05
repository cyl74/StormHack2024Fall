import os
import numpy as np
import cv2
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split

def load_data(data_dir):
    images = []
    labels = []
    
    for label in ['smile', 'non_smile']:
        folder_path = os.path.join(data_dir, label)
        for img_file in os.listdir(folder_path):
            img_path = os.path.join(folder_path, img_file)
            img = cv2.imread(img_path)
            img = cv2.resize(img, (256, 256))  # Resize to match model input
            images.append(img)
            labels.append(0 if label == 'non_smile' else 1)  # 0 for not smiling, 1 for smiling

    images = np.array(images, dtype='float32') / 255.0  # Normalize pixel values
    labels = np.array(labels)
    return images, labels

# Load data
data_dir = 'dataset'  # Replace with your dataset path
X, y = load_data(data_dir)

# Split the dataset into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

def build_model():
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(256, 256, 3)),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.MaxPooling2D(pool_size=(2, 2)),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(1, activation='sigmoid')  # Output layer for binary classification
    ])
    
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Build the model
model = build_model()


# Train the model
history = model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_val, y_val))


# Plot training history
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.show()

plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()


def predict_image(model, image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (256, 256))  # Resize to match model input
    img = np.expand_dims(img, axis=0) / 255.0  # Normalize pixel values
    prediction = model.predict(img)
    
    if prediction[0][0] > 0.5:
        return "Smiling"
    else:
        return "Not Smiling"

# # Example usage
# result = predict_image(model, 'testInput/hannah.jpg')
# print(result)


model.save('models/smaile.h5')
