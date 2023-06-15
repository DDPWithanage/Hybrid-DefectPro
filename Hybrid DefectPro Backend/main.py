#
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np
from keras.models import load_model
import pickle
import zipfile
import read_softwarefile_to_csv
import pyrebase
import requests

config = {
    "apiKey": "AIzaSyCXzTBX6F_xj43lvZ52_r_sw-47Bx8pVPg",
    "authDomain": "defectpredictionsystem.firebaseapp.com",
    "databaseURL": "https://defectpredictionsystem-default-rtdb.firebaseio.com",
    "projectId": "defectpredictionsystem",
    "storageBucket": "defectpredictionsystem.appspot.com",
    "messagingSenderId": "1008193706017",
    "appId": "1:1008193706017:web:3261533df56bb55ffc6b60",
    "measurementId": "G-97JRCJDFK9"
}

# provide initialized connection to the Firebase Realtime Database
firebase = pyrebase.initialize_app(config)
db = firebase.database()  # creates a database object that can be used to interact with Firebase
print("Server Starting...........")
while True:
    # fetching the data stored under the "react" node in the Firebase and returning it as a Python object
    reactdata = db.child("react").get().val()
    print(reactdata)
    if reactdata["filename"] != "":
        print("Wait to start ml...........")
        URL = reactdata["folderuri"]
        # download the data behind the URL - sends an HTTP GET request to the URL specified by the URL variable
        response = requests.get(URL)
        # Open the response into a new file called software.zip in binary write mode and writes the content retrieved
        # from the URL
        open("software.zip", "wb").write(response.content)

        # reads the "software.zip" file, extracts its contents, and places them in the "Software/" directory
        with zipfile.ZipFile('software.zip', 'r') as zip:
            zip.extractall('Software/')

        # reads the extracted software file, converts it to a CSV format, loads the CSV data into a pandas DataFrame
        csv_file_path = read_softwarefile_to_csv.rs_to_csv(f'Software/{reactdata["filename"].split(".")[0]}')
        new_data = pd.read_csv(csv_file_path)
        print(new_data)

        # loads pre-trained machine learning models
        rfc_model = pickle.load(open("Model/rfc_model.pkl", 'rb'))
        model = load_model('Model/cnn_model.h5')

        # Preprocess the new data
        new_features = rfc_model.apply(new_data)
        new_features = new_features.reshape(new_features.shape[0], new_features.shape[1], 1)  # This line reshapes the
        # new_features array to have an additional dimension of size 1.

        # Make predictions using the trained model
        # Takes the preprocessed data as input and returns the predicted outputs for each input sample
        predictions = model.predict(new_features)

        # Convert the predicted probabilities into class labels Indicates that the maximum value is searched along
        # each row of the predictions array - to determines the predicted class label with the highest confidence for
        # each input sample
        predicted_classes = np.argmax(predictions, axis=1)

        # Print the predicted class labels
        print(predicted_classes)

        # Calculate confidence score for the predictions. Each element in confidence_scores represents the confidence
        # level or probability of the predicted class for the corresponding input sample.
        confidence_scores = np.max(predictions, axis=1) * 100

        checkData = {1: True, 0: False}

        data = {"response": str(checkData[predicted_classes[0]]) + ", Confidence Score: " + str(confidence_scores[0]),
                "filename": ""}
        db.child("react").set(data)  # Updates the data in the "react" node of the Firebase
    else:
        print("Please upload your software file.............")
