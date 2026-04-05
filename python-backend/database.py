import os
from dotenv import load_dotenv
from sqlmodel import create_engine, Session

load_dotenv(dotenv_path="../.env")

db_host = os.getenv("DB_HOST")
database_url = os.getenv("DATABASE_URL")

if db_host:
    user = os.getenv("DB_USER", "user")
    password = os.getenv("DB_PASSWORD", "password")
    db_name = os.getenv("DB_NAME", "delivery_db")
    DATABASE_URL = f"mysql+pymysql://{user}:{password}@{db_host}:3306/{db_name}"
else:
    DATABASE_URL = database_url.replace("mysql://", "mysql+pymysql://") if database_url else None

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session
