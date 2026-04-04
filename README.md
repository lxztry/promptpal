# PromptPal - AI 提示词工具

## 功能特性

- 🎨 **文本→图像提示词**: 输入描述，自动生成优化提示词
- 🖼️ **图像→提示词**: 分析参考图片，提取风格特征
- 🎬 **视频脚本生成**: 输入内容，自动生成分镜脚本
- ⭐ **提示词评分**: AI自动评估提示词质量，给优化建议
- 📦 **批量生成**: 一次生成多组提示词对比
- 🛠️ **多模型支持**: Flux, DALL-E, Stable Diffusion, Runway, Veo 等
- 🔌 **自定义API**: 支持配置自己的API密钥
- 📱 **浏览器扩展**: Chrome/Edge/Firefox 右键快速生成
- 🌐 **中英文界面**: 完整的国际化支持
- 📜 **模板库**: 100+ 预设提示词模板
- ⏰ **版本历史**: 记录每次修改，方便回溯

## 技术栈

- 前端: Next.js 14, React 18, TypeScript, TailwindCSS
- 数据库: PostgreSQL, Prisma ORM
- 认证: NextAuth.js (微信, Google, 邮箱)
- AI: OpenAI GPT-4o, Claude, Flux, Runway 等

## 快速开始

### 安装

```bash
git clone https://github.com/lxztry/promptpal.git
cd promptpal
npm install
```

### 配置

```bash
cp apps/web/.env.example apps/web/.env.local
# 编辑 .env.local 填写必要的配置
```

### 运行

```bash
npm run dev
```

## 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lxztry/promptpal)

## 提示词模板

项目包含丰富的预设模板，分类包括：

- 👤 **人像**: 写真、证件照、肖像等
- 🏞️ **风景**: 自然、城市、建筑等
- 🎭 **动漫**: 二次元、角色设计等
- 📦 **产品**: 商业摄影、设计等
- 🎨 **艺术**: 抽象、风格迁移等

## 提示词评分

系统会自动评估你的提示词质量：

- ✅ 清晰度评分
- ✅ 风格完整性
- ✅ 生成建议
- ✅ 优化方向

## 浏览器扩展

支持 Chrome、Edge、Firefox：

1. 克隆扩展目录 `extensions/chrome`
2. 打开浏览器扩展页面 (`chrome://extensions`)
3. 开启开发者模式
4. 加载已解压的扩展程序
5. 右键选中内容 → "生成提示词"

## 项目结构

```
promptpal/
├── apps/
│   └── web/                 # Next.js 主应用
├── packages/
│   ├── db/                 # Prisma 数据库
│   └── config/             # 共享配置
├── extensions/
│   └── chrome/             # Chrome 扩展
├── templates/               # 提示词模板
│   ├── portrait.json       # 人像模板
│   ├── landscape.json      # 风景模板
│   ├── anime.json          # 动漫模板
│   ├── product.json        # 产品模板
│   └── art.json            # 艺术模板
├── prompts/
│   ├── scorer.ts           # 提示词评分
│   ├── generator.ts        # 提示词生成
│   └── history.ts          # 历史记录
└── turbo.json
```

## License

MIT
