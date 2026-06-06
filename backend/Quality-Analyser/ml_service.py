from fastapi import FastAPI
import joblib

app = FastAPI()

model = joblib.load("quality_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.post("/predict")
def predict(data: dict):
    try:
        code = data["code"]
        if not code:
            raise Exception("Code input is empty.")

        features = vectorizer.transform([code])
        prob = model.predict_proba(features)[0][1]
        return {"bug_probability": float(prob)}
    except Exception as e:
        return {"error": str(e)}
    