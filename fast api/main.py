from fastapi import FastAPI
app = FastAPI()

@app.post("/")
def add_student():
    return {"me"}