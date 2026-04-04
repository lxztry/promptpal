# PromptPal 技术规范

## 项目概述

PromptPal 是一个AI驱动的创意工具，帮助用户快速生成高质量的图像/视频提示词。

## 技术架构

### 前端架构
- **框架**: Next.js 14 (App Router)
- **UI库**: React 18
- **语言**: TypeScript
- **样式**: TailwindCSS
- **状态管理**: React hooks + localStorage

### 后端（可选）
- **框架**: Next.js API Routes
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js

### 扩展
- **浏览器扩展**: Chrome/Edge/Firefox (Manifest V3)

## 功能模块

### 1. 提示词生成器
- **输入**: 用户描述
- **处理**: 模板匹配 + AI增强
- **输出**: 优化后的提示词

### 2. 模板库
- **分类**: 人像、风景、动漫、产品、艺术
- **存储**: JSON文件 (`/templates/*.json`)
- **加载**: 按需加载，减少初始体积

### 3. 提示词评分
- **评分维度**: 清晰度、完整性、创意性
- **算法**: 基于规则的评分系统
- **反馈**: 优点、缺点、优化建议

### 4. 批量生成
- **支持**: 一次生成多条
- **对比**: 并排展示对比
- **导出**: JSON/CSV/TXT格式

### 5. 历史记录
- **存储**: localStorage
- **容量**: 最近100条
- **功能**: 搜索、收藏、导出

### 6. 浏览器扩展
- **功能**: 选中文字→右键→生成提示词
- **支持网站**: Midjourney, Pixiv, Discord, Twitter等
- **快捷键**: Ctrl+Shift+P

## 数据结构

### 模板结构
```typescript
interface Template {
  id: string;
  name: string;
  description: string;
  prompt: string;
  negative?: string;
}
```

### 历史记录结构
```typescript
interface HistoryEntry {
  id: string;
  prompt: string;
  negative?: string;
  timestamp: number;
  category?: string;
  score?: number;
}
```

### 评分结果结构
```typescript
interface ScoreResult {
  overall: number;
  clarity: number;
  completeness: number;
  creativity: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
}
```

## API设计

### 提示词生成
```
POST /api/generate
Body: { description, category, options }
Response: { prompt, negative, variations }
```

### 提示词评分
```
POST /api/score
Body: { prompt }
Response: ScoreResult
```

### 模板列表
```
GET /api/templates?category=portrait
Response: { templates: Template[] }
```

## 安全考虑

1. **XSS防护**: React自动转义
2. **CSP**: 限制脚本来源
3. **敏感信息**: 使用环境变量
4. **API限流**: 基于IP/用户

## 性能优化

1. **代码分割**: Next.js自动
2. **模板懒加载**: 按需加载
3. **本地缓存**: localStorage缓存历史
4. **debounce**: 输入防抖

## 浏览器兼容

- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

## 部署

### Vercel (推荐)
```bash
vercel deploy
```

### Docker
```bash
docker build -t promptpal .
docker run -p 3000:3000 promptpal
```

## 许可证

MIT License
