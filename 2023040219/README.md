## Registration System 4 SNC

前言：由于时间有限，这个版本仅用 3 天快速完成。主要实现了前端活动浏览与报名表单（Vue 3 + TS + Element Plus + Pinia + Vite），后端提供活动列表和报名接口（Express + TS + mysql2），并用 Docker/Nginx/MariaDB 打通了一键部署链路。后续有空会继续完善。

### 项目结构（摘要）

```
├── src/                     # 前端：Vue 3 + TS
│   ├── components/layout    
│   ├── router               
│   ├── stores               
│   ├── type                 
│   └── views                
├── public                   
├── server/                  # 后端：Express + TS
│   ├── src/config           
│   ├── src/routes           
│   ├── src/controllers      
│   ├── src/services         
│   └── src/repositories     
├── init.sql                 # MySQL 表结构 & 初始数据
├── docker-compose.yml       # MariaDB + 后端 + 前端
├── Dockerfile               # 前端构建 + Nginx
├── server/Dockerfile        # 后端构建与运行
└── README.Docker.md         # Docker 部署说明
```

### 技术栈
- 前端：Vue 3、TypeScript、Element Plus、Pinia、Vue Router、Axios
- 后端：Node.js 、Express 5（TypeScript）、mysql2
- 数据库：MariaDB
- 构建/部署：Docker、Docker Compose、Nginx

### 功能特点

- 有整体布局和路由：项目启动后提供首页/新闻/活动/关于/登录入口，现在侧重于实现活动部分
- 活动中心导航：`/activity` 下提供“活动列表/报名须知/我要报名/常见问题/我的报名”等入口，现在侧重于实现活动列表和我要报名两部分
- 活动列表：从 `/api/events` 拉取数据，表格展示标题、地点、开始时间、报名截止、状态；支持点开“详情”查看弹窗，显示具体信息。
- 报名按钮校验：非“未开始”状态的活动会提示不可报名，符合条件时跳转到报名表单。
- 活动详情弹窗：格式化展示活动时间、地点、报名截止时间与描述，显示状态徽章。
- 报名表单：
  - 选择活动（仅可选状态为 0/未开始的活动，其余为灰色选项禁止选择）；
  - 表单校验：姓名/学号/学院/手机号必填，手机号正则校验；
  - 提交 `POST /api/events/:id/registrations`，成功提示并重置表单。
- 后端 API：
  - `GET /api/events`：返回活动列表并附带 `statusText` 显示文案；
  - `POST /api/events/:id/registrations`：校验活动存在、状态为可报名、未过截止时间、同一学号不可重复（唯一索引 + 计数），入库后返回报名记录 ID。
- 数据层安全：`init.sql` 建表时设置唯一索引 `idx_event_student`，防止同一活动重复报名；外键联动删除活动会级联删除报名。

### 本地开发

1) 前端
```bash
npm install
npm run dev   # Vite 本地开发，已配置 /api 代理到 3000
```
2) 后端
```bash
cd server
npm install
npm run dev   # 需本地 MySQL，配置见 server/src/.env.example
```

### Docker 部署

见 [Docker部署](README.Docker.md)

### 后续可能优化的地方

- 页面补全：报名须知 / 常见问题 / 我的报名 / 新闻 / 登录 页目前仍是占位内容，可补充真实流程与接口。
- 交互与状态：列表/表单可以添加 Loading、空态、错误提示的统一处理
- 安全与中间件：后端依赖中已有 `helmet`/`cors` 但未启用，可补充全局中间件、请求体验证与速率限制。
- 服务层抽象：`server/src/services/events.service.ts` 目前为空，可将状态文案、时间窗口计算等放入 service，控制器保持瘦身。

### 模型使用

模型类型：Claude Sonnet 4.5、Codex
模型使用：部分样式，部分说明文件，docker部署相关文件