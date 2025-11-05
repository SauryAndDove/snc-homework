from datetime import datetime
import shutil

from fastapi import Depends, FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .files import parse_json, dump_json
from .paths import BASE_DIR
from .schema import *

app = FastAPI()
app.add_middleware(  # 允许跨域访问 仅供开发调试使用
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有域名
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有 HTTP 方法
    allow_headers=["*"],  # 允许所有请求头
)


def check_user_id(user_id: str = Query(default=None)):
    user_ids = parse_json().keys()
    if str(user_id) not in user_ids:
        raise HTTPException(status_code=403, detail="Forbidden: Invalid user ID")


@app.get("/", status_code=200)
def test_connect():
    """检测服务器连通性"""
    pass


@app.get("/api/reset", status_code=200)
def reset_database():
    """重置数据库为初始状态"""

    initial_db_path = BASE_DIR / "backup" / "db.json"
    db_path = BASE_DIR / "db.json"

    if not initial_db_path.exists():
        raise HTTPException(status_code=500, detail="Initial database file not found.")

    shutil.copy(initial_db_path, db_path)
    return {"detail": "Database has been reset to initial state."}


@app.get("/api/forms", status_code=200, dependencies=[Depends(check_user_id)])
def get_forms(user_id: str):
    """获取全部表单的信息"""
    data = parse_json()
    return data.get(str(user_id), [])


@app.get("/api/form/{form_id}", status_code=200, dependencies=[Depends(check_user_id)])
def get_form(user_id: str, form_id: str):
    """获取指定表单的信息"""
    data = parse_json().get(str(user_id), [])
    for d in data:
        if d["formId"] == form_id:
            unsubmitted = not d["formData"]
            data: dict = d["formData"]
            data.update({"formID": form_id})
            return {"unSubmitted": unsubmitted, "data": data}
    return {}


@app.get(
    "/api/form/{form_id}/timeline",
    status_code=200,
    dependencies=[Depends(check_user_id)],
)
def get_timeline(user_id: str, form_id: str) -> tuple[int, list[TimeLineItem]] | None:
    """获取指定表单的时间线信息"""
    data = parse_json().get(user_id, [])
    for d in data:
        if d["formId"] == form_id:
            timeline_data = d.get("timeline", [])
            if not timeline_data:
                return None
            # 列表第一位是时间线状态 跳过
            timeline_items = [TimeLineItem(**item) for item in timeline_data[1:]]

            return timeline_data[0], timeline_items


@app.post(
    "/api/form/{form_id}/update", status_code=201, dependencies=[Depends(check_user_id)]
)
def update_form(user_id: str, form_id: str, form_data: Form0001 | Form0002):
    """更新指定表单的信息"""
    all_data = parse_json()
    for d in all_data[user_id]:
        if d["formId"] == form_id:
            d["formData"] = form_data.model_dump()

            # 更新时间线-提交时间
            d["timeline"][1].update(
                {"date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
            )
            dump_json(all_data)
