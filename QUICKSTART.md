# PromptPal - Quick Start Guide

> AI Content to Image/Video Tool - 浏览器扩展 + Web应用

## 🚀 快速开始 (SQLite - 开箱即用)

```bash
# 1. 进入目录
cd promptpal

# 2. 安装依赖
npm install

# 3. 初始化数据库 (自动创建 SQLite 文件)
npm run db:generate
npm run db:push

# 4. 启动开发服务器
npm run dev
```

访问 http://localhost:3000

**无需安装数据库！SQLite 会自动创建本地文件。**

---

## 项目结构

```
promptpal/
├── apps/
│   └── web/              # Next.js 14 应用
│       ├── app/          # 页面和 API
│       └── components/   # React 组件
├── packages/
│   ├── db/              # Prisma 数据库 (SQLite)
│   └── config/          # 模型和提示词配置
└── extensions/
    └── chrome/          # Chrome 扩展
```

## 功能预览

- **落地页**: http://localhost:3000
- **登录页**: http://localhost:3000/login
- **创建页面**: http://localhost:3000/create

## Chrome 扩展安装

1. 打开 Chrome → `chrome://extensions/`
2. 开启 **开发者模式**
3. 点击 **加载已解压的扩展程序**
4. 选择 `extensions/chrome` 文件夹

## 配置说明

环境变量在 `.env.local` 中，默认使用 SQLite。

如需 PostgreSQL，修改：
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
```

## 支持的 AI 模型

**图片**: Flux, DALL-E 3, Stable Diffusion, Ideogram
**视频**: Runway, Veo, Luma
**LLM**: GPT-4o, Claude 3.5, Gemini 1.5

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Prisma ORM
- SQLite / PostgreSQL
- NextAuth.js
