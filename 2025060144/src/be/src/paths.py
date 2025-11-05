from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
JSON_DIR = BASE_DIR / "db.json"
FORM_SCHEMA_DIR = BASE_DIR / "form_schema.json"

if not JSON_DIR.exists():
    raise FileNotFoundError(f"`{JSON_DIR}` does not exist.")