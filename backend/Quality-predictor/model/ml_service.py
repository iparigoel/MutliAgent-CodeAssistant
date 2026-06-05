from fastapi import FastAPI
import joblib

app = FastAPI()

model = joblib.load("quality_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.post("/predict")
def predict(data: dict):
    code = data["code"]
    features = vectorizer.transform([code])
    prediction = int(model.predict(features)[0])
    return {"prediction": prediction}