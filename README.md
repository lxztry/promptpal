# PromptPal - AI Content to Image/Video Tool

AI驱动的创意工具，支持浏览器扩展选区内容转图像/视频提示词。

## 功能特性

- 🎨 **文本→图像提示词**: 输入描述，自动生成优化提示词
- 🖼️ **图像→提示词**: 分析参考图片，提取风格特征
- 🎬 **视频脚本生成**: 输入内容，自动生成分镜脚本
- 🛠️ **多模型支持**: Flux, DALL-E, Stable Diffusion, Runway, Veo 等
- 🔌 **自定义API**: 支持配置自己的API密钥
- 📱 **浏览器扩展**: Chrome/Edge/Firefox 右键快速生成
- 🌐 **中英文界面**: 完整的国际化支持

## 技术栈

- **前端**: Next.js 14, React 18, TypeScript, TailwindCSS
- **数据库**: PostgreSQL, Prisma ORM
- **认证**: NextAuth.js (微信, Google, 邮箱)
- **AI**: OpenAI GPT-4o, Claude, Flux, Runway 等

## 快速开始

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL 数据库

### 安装

```bash
# 克隆项目
git clone https://github.com/your-org/promptpal.git
cd promptpal

# 安装依赖
npm install

# 配置环境变量
cp apps/web/.env.example apps/web/.env.local
# 编辑 .env.local 填写必要的配置

# 初始化数据库
npm run db:push
npm run db:generate

# 启动开发服务器
npm run dev
```

### 环境变量配置

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/promptpal"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth (可选)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
WECHAT_APP_ID=""
WECHAT_APP_SECRET=""

# AI APIs (可选)
OPENAI_API_KEY=""
REPLICATE_API_TOKEN=""
```

## 项目结构

```
promptpal/
├── apps/
│   └── web/              # Next.js 主应用
├── packages/
│   ├── db/               # Prisma 数据库
│   └── config/           # 共享配置
├── extensions/
│   └── chrome/           # Chrome 扩展
└── turbo.json
```

## License

MIT
