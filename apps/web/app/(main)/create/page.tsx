'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Sparkles,
  Image,
  Video,
  Loader2,
  Copy,
  Check,
  Wand2,
  Download,
  Upload,
  Type,
  Palette,
} from 'lucide-react';
import { IMAGE_STYLES, VIDEO_STYLES } from '@/lib/config';

type Mode = 'text' | 'image' | 'video';
type OutputType = 'image' | 'video';

export default function CreatePage() {
  const { data: session, status } = useSession();
  const [mode, setMode] = useState<Mode>('text');
  const [outputType, setOutputType] = useState<OutputType>('image');
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [style, setStyle] = useState('photorealistic');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePrompt = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/prompt/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: mode,
          input: mode === 'image' ? imagePreview : input,
          style: outputType === 'video' ? VIDEO_STYLES.cinematic : IMAGE_STYLES[style as keyof typeof IMAGE_STYLES],
        }),
      });
      const data = await response.json();
      setPrompt(data.prompt);
    } catch (error) {
      console.error('生成失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateContent = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: outputType,
          prompt,
          style: outputType === 'video' ? VIDEO_STYLES.cinematic : IMAGE_STYLES[style as keyof typeof IMAGE_STYLES],
        }),
      });
      const data = await response.json();
      if (outputType === 'image') {
        setGeneratedImage(data.url);
      } else {
        // 视频生成
        console.log('视频生成中...', data);
      }
    } catch (error) {
      console.error('生成失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">PromptPal</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/create"
              className="text-sm font-medium text-primary"
            >
              创建
            </Link>
            <Link href="/history" className="text-sm hover:text-primary">
              历史
            </Link>
            <Link href="/settings" className="text-sm hover:text-primary">
              设置
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">创建内容</h1>
              <p className="text-muted-foreground">
                输入内容，AI自动生成优化提示词
              </p>
            </div>

            {/* Mode Tabs */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setMode('text')}
                className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-md text-sm font-medium transition-colors ${
                  mode === 'text'
                    ? 'bg-background shadow-sm'
                    : 'hover:bg-background/50'
                }`}
              >
                <Type className="w-4 h-4" />
                文本
              </button>
              <button
                onClick={() => setMode('image')}
                className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-md text-sm font-medium transition-colors ${
                  mode === 'image'
                    ? 'bg-background shadow-sm'
                    : 'hover:bg-background/50'
                }`}
              >
                <Palette className="w-4 h-4" />
                图片
              </button>
              <button
                onClick={() => setMode('video')}
                className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-md text-sm font-medium transition-colors ${
                  mode === 'video'
                    ? 'bg-background shadow-sm'
                    : 'hover:bg-background/50'
                }`}
              >
                <Video className="w-4 h-4" />
                视频脚本
              </button>
            </div>

            {/* Input Area */}
            <div className="space-y-4">
              {mode === 'text' && (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="描述你想要的内容，例如：一只可爱的橘猫在阳光下打盹..."
                  className="w-full h-40 p-4 rounded-lg border bg-background resize-none"
                />
              )}

              {mode === 'image' && (
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <button
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-background rounded-full border"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">
                        点击或拖拽上传图片
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium cursor-pointer hover:bg-primary/90"
                      >
                        选择图片
                      </label>
                    </>
                  )}
                </div>
              )}

              {mode === 'video' && (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="描述你想要生成的视频场景，例如：一个年轻女孩在咖啡馆里阅读，周围是温暖的灯光..."
                  className="w-full h-40 p-4 rounded-lg border bg-background resize-none"
                />
              )}
            </div>

            {/* Output Type */}
            {mode !== 'video' && (
              <div>
                <label className="block text-sm font-medium mb-2">输出类型</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOutputType('image')}
                    className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-md text-sm font-medium border transition-colors ${
                      outputType === 'image'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-accent'
                    }`}
                  >
                    <Image className="w-4 h-4" />
                    图片
                  </button>
                  <button
                    onClick={() => setOutputType('video')}
                    className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-md text-sm font-medium border transition-colors ${
                      outputType === 'video'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-accent'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    视频
                  </button>
                </div>
              </div>
            )}

            {/* Style Selection */}
            {outputType === 'image' && (
              <div>
                <label className="block text-sm font-medium mb-2">风格</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(IMAGE_STYLES).slice(0, 9).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setStyle(key)}
                      className={`p-2 rounded-md text-xs text-center transition-colors ${
                        style === key
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {value.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Generate Prompt Button */}
            <button
              onClick={generatePrompt}
              disabled={loading || (!input && !imagePreview)}
              className="w-full h-12 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Wand2 className="w-5 h-5" />
              )}
              生成提示词
            </button>

            {/* Generated Prompt */}
            {prompt && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">生成的提示词</label>
                  <button
                    onClick={copyPrompt}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        复制
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 p-4 rounded-lg border bg-muted/50 resize-none font-mono text-sm"
                />
                <button
                  onClick={generateContent}
                  disabled={loading}
                  className="w-full h-11 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : outputType === 'image' ? (
                    <>
                      <Image className="w-5 h-5" />
                      生成图片
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5" />
                      生成视频
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right: Preview */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium">预览</h2>
              <p className="text-sm text-muted-foreground">
                生成的内容将显示在这里
              </p>
            </div>

            <div className="border-2 border-dashed rounded-lg aspect-square flex items-center justify-center bg-muted/30">
              {generatedImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={generatedImage}
                    alt="Generated"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="p-2 rounded-full bg-background border hover:bg-accent">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Image className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>生成内容后预览</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-medium mb-2">💡 提示</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 输入越详细，生成效果越好</li>
                <li>• 选择合适的风格很重要</li>
                <li>• 可以编辑生成的提示词优化效果</li>
                <li>• 使用浏览器扩展可以直接右键生成</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
