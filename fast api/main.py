from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from typing import List

# Database URL (change credentials if needed)
DATABASE_URL = "postgresql://postgres:yacine@localhost/students"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

# SQLAlchemy Model
class StudentDB(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    group = Column(Integer, nullable=False)

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic models for request/response
class StudentCreate(BaseModel):
    name: str = Field(..., min_length=1, example="John Doe")
    age: int = Field(..., gt=0, lt=150, example=20)
    group: int = Field(..., ge=1, example=5)

class StudentResponse(StudentCreate):
    id: int

    class Config:
        orm_mode = True

# FastAPI app
app = FastAPI(title="Student API")

# CORS - essential for Flutter
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Flutter app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoints
@app.post("/students", response_model=StudentResponse, status_code=201)
def add_student(student: StudentCreate, db: Session = Depends(get_db)):
    new_student = StudentDB(**student.dict())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

@app.get("/students", response_model=List[StudentResponse])
def get_students(db: Session = Depends(get_db)):
    return db.query(StudentDB).all()
