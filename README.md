# SM_AI_LE 

<h3>Description</h3>
This project is a simple web application component that allows users to upload an image and determine whether the person in the image is smiling or not using a pre-trained machine learning model. The app uses a React frontend for image upload and display, and a Flask backend API that processes the image and returns the result, smiling/not smiling.


<h3>Technologies Used</3>
<h5>Frontend:</5>
<ul>
<li>React</li>
<li>HTML, CSS</li>
</ul>

<h5>Backend:</h5>
<ul>
<li>Flask</li>
<li>TensorFlow/Keras </li>
<li>OpenCV </li>
</ul>
<h3>Requirements</h3>
Python 3.8-3.11
<h5>Python Library</h5>
<ul>
<Flask</li>
<li>numpy</li>
<li>opencv-python</li>
<li>tensorflow</li>
<li>matplotlib</li>
<li>scikit-learn</li>
</ul>

Node.js (for React frontend)

<h3>Setup and Installation</h3>
<h5>Backend </h5>
Make sure you have the following library install:

```bash
pip install Flask
pip install numpy
pip install opencv-python
pip install tensorflow
pip install matplotlib
pip install scikit-learn
```

Using an ubuntu terminal(wsl) run the following command:

```bash
cat models/smaile.zip* > models/smaile.zip
```

Then unzip said flip to get our AI model, smaile.h5
(you could also just run the modelBuilder.py to get the model, but it will take a long time)

After getting smaile.h5 run the app_smaile.py to get the backend running

<h5>Frontend</h5>
Navigate to the my-app directory and run:

```bash
npm install
```
After all the dependicies are downloaded, please run:

```bash
npm start
```

You should be directed to localhost:3000
