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
    prob = model.predict_proba(features)[0][1]
    return {"bug_probability": float(prob)}