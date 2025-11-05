import json

from .paths import JSON_DIR


def parse_json() -> dict:
    with open(JSON_DIR, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data


def dump_json(data: dict) -> None:
    with open(JSON_DIR, "w", encoding="utf-8") as f:
        # 演示阶段中使用 indent 便于人类阅读与修改
        json.dump(data, f, ensure_ascii=False, indent=2)


def get_user_id() -> list[str]:
    data = parse_json()
    return list(data.keys())
