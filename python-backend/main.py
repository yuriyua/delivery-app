from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlmodel import select, Session
from database import get_session
from models import User
from security import verify_password, create_access_token
from typing import List

app = FastAPI()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@app.get("/")
async def root():
    return {"status": "ok", "message": "Python API is running!"}

@app.post("/api/auth/login")
async def login(login_data: LoginRequest, session: Session = Depends(get_session)):
    statement = select(User).where(User.email == login_data.email)
    user = session.exec(statement).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    if not verify_password(login_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password"
        )

    token = create_access_token(data={"sub": user.email, "id": user.id})

    return {
        "token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name
        }
    }
