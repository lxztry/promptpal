import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Palette, Video, Download, Chrome } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">PromptPal</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm hover:text-primary">
              功能特点
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary">
              定价
            </Link>
            <Link href="/docs" className="text-sm hover:text-primary">
              文档
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm hover:text-primary"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
            >
              立即开始
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            让创意
            <span className="text-primary">无限延展</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI驱动的创意工具，支持浏览器扩展选区内容转图像/视频提示词。
            选中文本，右键图片，一键生成专业级提示词。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/create"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 gap-2"
            >
              开始创作
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#extension"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent h-12 px-8 gap-2"
            >
              <Chrome className="w-4 h-4" />
              安装浏览器扩展
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            强大功能，极简体验
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="文本→提示词"
              description="输入描述，AI自动生成优化的Midjourney、Stable Diffusion等兼容提示词"
            />
            <FeatureCard
              icon={<Palette className="w-6 h-6" />}
              title="图片→提示词"
              description="上传参考图片，AI分析风格特征，生成可复现的提示词"
            />
            <FeatureCard
              icon={<Video className="w-6 h-6" />}
              title="视频脚本"
              description="输入内容，AI生成专业分镜脚本，支持Runway、Veo等视频模型"
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="多模型支持"
              description="Flux、DALL-E、Stable Diffusion、Runway、Veo、Luma...自由切换"
            />
            <FeatureCard
              icon={<Download className="w-6 h-6" />}
              title="一键生成"
              description="优化后的提示词直接生成图片/视频，无需切换平台"
            />
            <FeatureCard
              icon={<Chrome className="w-6 h-6" />}
              title="浏览器扩展"
              description="Chrome/Edge/Firefox右键菜单，选中内容直接生成提示词"
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            工作流程
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="输入内容"
              description="输入文字描述，或上传参考图片，或安装浏览器扩展右键选择"
            />
            <StepCard
              number={2}
              title="AI处理"
              description="智能分析内容，生成多风格优化的提示词，支持二次编辑修改"
            />
            <StepCard
              number={3}
              title="一键生成"
              description="选择目标模型，直接生成图片或视频，支持多模型对比"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            简单透明的定价
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            基础功能免费使用，高级功能按需付费
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="免费版"
              price="¥0"
              description="适合轻度使用"
              features={[
                '每日10张图片生成',
                '每日2个视频生成',
                '基础提示词优化',
                '浏览器扩展',
                '7天历史记录',
              ]}
              buttonText="免费开始"
              href="/register"
            />
            <PricingCard
              name="月卡"
              price="¥29"
              period="/月"
              description="适合创作者"
              features={[
                '每月200张图片生成',
                '每月20个视频生成',
                '高级提示词优化',
                '浏览器扩展',
                '永久历史记录',
                '优先队列',
              ]}
              buttonText="立即订阅"
              href="/pricing?plan=monthly"
              highlighted
            />
            <PricingCard
              name="年卡"
              price="¥199"
              period="/年"
              description="适合专业用户"
              features={[
                '每月3000张图片生成',
                '每月300个视频生成',
                '高级提示词优化',
                '浏览器扩展',
                '永久历史记录',
                '优先队列',
                'VIP支持',
              ]}
              buttonText="立即订阅"
              href="/pricing?plan=yearly"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold">PromptPal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 PromptPal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  buttonText,
  href,
  highlighted,
}: {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  buttonText: string;
  href: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-lg border ${
        highlighted ? 'border-primary shadow-lg scale-105' : ''
      }`}
    >
      {highlighted && (
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full mb-4">
          推荐
        </span>
      )}
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="mb-6">
        <span className="text-3xl font-bold">{price}</span>
        {period && <span className="text-muted-foreground">{period}</span>}
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="text-sm flex items-center gap-2">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`block w-full text-center rounded-md text-sm font-medium h-10 py-2 ${
          highlighted
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border border-input bg-background hover:bg-accent'
        }`}
      >
        {buttonText}
      </Link>
    </div>
  );
}
