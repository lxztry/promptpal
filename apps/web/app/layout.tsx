import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'PromptPal - AI Content to Image/Video',
  description: 'AI驱动的创意工具，支持浏览器扩展选区内容转图像/视频提示词',
  keywords: ['AI', '图像生成', '视频生成', '提示词', 'Prompt', 'Midjourney', 'Stable Diffusion'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
