# 前端
FROM node:22 AS frontend-builder

WORKDIR /frontend

# 安装 pnpm
RUN npm install -g pnpm

# 构建前端
COPY src/fe/ ./
RUN pnpm install
RUN pnpm build

# 后端
FROM python:3.13

WORKDIR /app

# 安装 Nodejs 与 pnpm [AI Used]
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 安装后端依赖
COPY src/be/ ./backend
RUN pip install -r ./backend/requirements.txt

COPY --from=frontend-builder /frontend/ ./frontend

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]