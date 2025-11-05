#!/bin/bash
set -e

# 启动后端
cd /app/backend
python main.py &

# 启动前端
cd /app/frontend
pnpm preview

# 等待所有进程
wait
EOF