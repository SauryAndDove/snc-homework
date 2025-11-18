# Docker 部署指南

## 前置要求

- Docker 20.10+
- Docker Compose 2.0+
- Node.js 20+ (用于本地更新依赖,如已有 package-lock.json 则不需要)

## 快速开始

### 1. 克隆项目

```bash
git clone git@github.com:Thintime123/snc-homework.git
cd snc-homework/2023040219
```

### 2. 更新后端依赖 (首次部署或依赖变更时)

```bash
cd server
npm install
cd ..
```

> **说明**: 这一步会更新 `server/package-lock.json`,确保 Docker 构建时依赖版本一致。

### 5. 构建并启动服务

```bash
docker-compose up -d --build
```

### 6. 访问应用

浏览器访问 http://localhost

## 服务架构

```
┌─────────────┐
│   Nginx     │  (前端) - 端口 80
│  (Vue 3)    │
└──────┬──────┘
       │
       ↓ /api
┌─────────────┐
│   Node.js   │  (后端) - 端口 3000
│  (Express)  │  TypeScript → JavaScript 编译
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   MariaDB   │  (数据库) - 端口 3306
│   10.11     │
└─────────────┘
```