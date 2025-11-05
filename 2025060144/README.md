# FormSystem | 表单填写系统

> [!NOTE]
> 此项目为 北京化工大学-学生网络中心-开发部 考核期作业。\
> **Author: [@weinibuliu](https://github.com/weinibuliu) (韦开腾 2025060144)**

> [!TIP]
> 点击查看 [项目开发日志](./blog.md)

## 技术栈

### 前端

- Vue3

### 后端

- Python

## 运行

### 手动运行

#### 运行后端

```shell
cd src/be
pip install -r requirements.txt
python main.py
```

#### 运行前端

```shell
cd src/fe
pnpm install
pnpm dev
# 或者 也可以选择构建后运行
pnpm build
pnpm preview
```

### 使用 Docker

```shell
# 构建镜像
docker build -t fs .
# 运行容器
docker run -d -p 8050:8050 -p 8051:8051 --name fs-container fs
```

> 后端运行在容器的 `8050` 端口，前端运行在容器的 `8051` 端口。如有需要，请自行调整端口映射规则。

## 仓库结构

- `src/fe`\
  存放前端代码 (fe 为 front-end 的缩写)
- `src/be`\
  存放后端代码 (be 为 back-end 的缩写)

## 鸣谢

- [**Vue.js**](https://vuejs.org)\
  渐进式 JavaScript 框架

- [**NuxtUI**](https://ui.nuxt.com/)\
  The Intuitive Vue UI Library.

- [**fastapi**](https://fastapi.tiangolo.com/)\
   FastAPI framework, high performance, easy to learn, fast to code, ready for production
