from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlmodel import select, Session
from database import get_session
from models import User
from security import verify_password, create_access_token
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    name: str
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

@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
async def register(register_data: RegisterRequest, session: Session = Depends(get_session)):
    statement = select(User).where(User.email == register_data.email)
    existing_user = session.exec(statement).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists"
        )

    from security import get_password_hash
    hashed_password = get_password_hash(register_data.password)

    new_user = User(
        name=register_data.name,
        email=register_data.email,
        password=hashed_password
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    token = create_access_token(data={"sub": new_user.email, "id": new_user.id})
    return {
        "token": token,
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "name": new_user.name
        }
    }