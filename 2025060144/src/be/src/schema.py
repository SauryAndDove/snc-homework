from typing import Literal, Optional

from pydantic import BaseModel, Field


class Form0001(BaseModel):
    name: str = Field(max_length=50)
    studentID: str = Field(
        min_length=10,
        max_length=10,
    )
    sex: Literal["male", "female"]
    content: str = Field(max_length=500)
    remark: str = Field(default="", max_length=500)


class Form0002(BaseModel):
    name: str = Field(max_length=50)
    studentID: str = Field(
        min_length=10,
        max_length=10,
    )
    sex: Literal["male", "female"]
    class_: str
    formID: Optional[str]


class TimeLineItem(BaseModel):
    date: str
    title: str
    icon: Optional[str]


__all__ = ["Form0001", "Form0002", "TimeLineItem"]
