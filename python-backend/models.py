from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field, JSON, Column
import uuid

class User(SQLModel, table=True):
    __tablename__ = "User"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    email: str = Field(index=True, unique=True)
    name: str
    phone: Optional[str] = None
    password: str
    user_metadata: Optional[dict] = Field(default=None, sa_column=Column("metadata", JSON))
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
    deletedAt: Optional[datetime] = None
