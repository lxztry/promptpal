import { z } from 'zod';

// ============ 图片生成模型 ============
export const ImageModelType = z.enum([
  'flux-pro',
  'flux-dev',
  'flux-schnell',
  'dall-e-3',
  'dall-e-2',
  'sdxl',
  'ideogram',
  'midjourney',
  'custom'
]);

export type ImageModelType = z.infer<typeof ImageModelType>;

export interface ImageModelConfig {
  id: ImageModelType;
  name: string;
  provider: string;
  apiEndpoint?: string;
  apiKeyField?: string; // 环境变量字段名
  creditCost: number; // 每次消耗积分
  maxResolution?: { width: number; height: number };
  supportsStyleRef?: boolean;
  supportsImagePrompt?: boolean;
  description?: string;
}

export const IMAGE_MODELS: Record<ImageModelType, ImageModelConfig> = {
  'flux-pro': {
    id: 'flux-pro',
    name: 'Flux Pro',
    provider: 'Flux AI',
    apiEndpoint: 'https://api.runwayml.com/v1/image/generations',
    apiKeyField: 'RUNWAY_API_KEY',
    creditCost: 2,
    maxResolution: { width: 2048, height: 2048 },
    supportsStyleRef: true,
    supportsImagePrompt: true,
    description: '高质量图像生成，适合专业创作'
  },
  'flux-dev': {
    id: 'flux-dev',
    name: 'Flux Dev',
    provider: 'Flux AI',
    creditCost: 1,
    maxResolution: { width: 1024, height: 1024 },
    supportsStyleRef: true,
    supportsImagePrompt: true,
    description: '开发者版本，快速迭代'
  },
  'flux-schnell': {
    id: 'flux-schnell',
    name: 'Flux Schnell',
    provider: 'Flux AI',
    creditCost: 1,
    maxResolution: { width: 1024, height: 1024 },
    supportsStyleRef: false,
    supportsImagePrompt: true,
    description: '极速生成，适合预览'
  },
  'dall-e-3': {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    apiEndpoint: 'https://api.openai.com/v1/images/generations',
    apiKeyField: 'OPENAI_API_KEY',
    creditCost: 2,
    maxResolution: { width: 1792, height: 1792 },
    supportsStyleRef: false,
    supportsImagePrompt: true,
    description: 'OpenAI 最新图像模型'
  },
  'dall-e-2': {
    id: 'dall-e-2',
    name: 'DALL-E 2',
    provider: 'OpenAI',
    creditCost: 1,
    maxResolution: { width: 1024, height: 1024 },
    supportsStyleRef: false,
    supportsImagePrompt: true,
    description: '经典图像生成模型'
  },
  'sdxl': {
    id: 'sdxl',
    name: 'Stable Diffusion XL',
    provider: 'Stability AI',
    apiEndpoint: 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0',
    apiKeyField: 'STABILITY_API_KEY',
    creditCost: 1,
    maxResolution: { width: 1024, height: 1024 },
    supportsStyleRef: true,
    supportsImagePrompt: true,
    description: '开源高质量模型'
  },
  'ideogram': {
    id: 'ideogram',
    name: 'Ideogram',
    provider: 'Ideogram',
    creditCost: 1,
    supportsStyleRef: false,
    supportsImagePrompt: true,
    description: '擅长文字渲染'
  },
  'midjourney': {
    id: 'midjourney',
    name: 'Midjourney',
    provider: 'Midjourney',
    creditCost: 2,
    supportsStyleRef: true,
    supportsImagePrompt: true,
    description: '艺术风格丰富'
  },
  'custom': {
    id: 'custom',
    name: '自定义 API',
    provider: '自定义',
    creditCost: 1,
    supportsStyleRef: true,
    supportsImagePrompt: true,
    description: '使用自己的 API Key'
  }
};

// ============ 视频生成模型 ============
export const VideoModelType = z.enum([
  'runway-gen3',
  'runway-gen2',
  'veo',
  'luma-dream-machine',
  'pika',
  'custom'
]);

export type VideoModelType = z.infer<typeof VideoModelType>;

export interface VideoModelConfig {
  id: VideoModelType;
  name: string;
  provider: string;
  apiEndpoint?: string;
  apiKeyField?: string;
  creditCostPerSecond: number; // 每秒消耗积分
  creditCostPerVideo: number; // 每次消耗积分
  maxDuration?: number; // 最大时长(秒)
  supportsImageToVideo?: boolean;
  supportsTextToVideo?: boolean;
  description?: string;
}

export const VIDEO_MODELS: Record<VideoModelType, VideoModelConfig> = {
  'runway-gen3': {
    id: 'runway-gen3',
    name: 'Runway Gen-3',
    provider: 'Runway',
    apiEndpoint: 'https://api.runwayml.com/v1/image_to_video',
    apiKeyField: 'RUNWAY_API_KEY',
    creditCostPerSecond: 1,
    creditCostPerVideo: 10,
    maxDuration: 10,
    supportsImageToVideo: true,
    supportsTextToVideo: true,
    description: '专业级视频生成'
  },
  'runway-gen2': {
    id: 'runway-gen2',
    name: 'Runway Gen-2',
    provider: 'Runway',
    creditCostPerSecond: 0.5,
    creditCostPerVideo: 5,
    maxDuration: 4,
    supportsImageToVideo: true,
    supportsTextToVideo: true,
    description: '成熟的视频模型'
  },
  'veo': {
    id: 'veo',
    name: 'Google Veo',
    provider: 'Google AI',
    apiKeyField: 'GOOGLE_AI_API_KEY',
    creditCostPerSecond: 1,
    creditCostPerVideo: 10,
    maxDuration: 8,
    supportsImageToVideo: true,
    supportsTextToVideo: true,
    description: 'Google 最新视频模型'
  },
  'luma-dream-machine': {
    id: 'luma-dream-machine',
    name: 'Luma Dream Machine',
    provider: 'Luma AI',
    apiEndpoint: 'https://api.lumalabs.ai/dream-machine/v1',
    apiKeyField: 'LUMA_API_KEY',
    creditCostPerSecond: 0.3,
    creditCostPerVideo: 3,
    maxDuration: 10,
    supportsImageToVideo: true,
    supportsTextToVideo: true,
    description: '高性价比视频生成'
  },
  'pika': {
    id: 'pika',
    name: 'Pika',
    provider: 'Pika Labs',
    creditCostPerSecond: 0.5,
    creditCostPerVideo: 5,
    maxDuration: 3,
    supportsImageToVideo: true,
    supportsTextToVideo: false,
    description: '快速图像转视频'
  },
  'custom': {
    id: 'custom',
    name: '自定义 API',
    provider: '自定义',
    creditCostPerSecond: 0.5,
    creditCostPerVideo: 5,
    supportsImageToVideo: true,
    supportsTextToVideo: true,
    description: '使用自己的 API Key'
  }
};

// ============ LLM 模型 ============
export const LLMModelType = z.enum([
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-4-turbo',
  'claude-3-5-sonnet',
  'claude-3-opus',
  'gemini-1-5-pro',
  'gemini-1-5-flash',
  'custom-llm'
]);

export type LLMModelType = z.infer<typeof LLMModelType>;

export interface LLMModelConfig {
  id: LLMModelType;
  name: string;
  provider: string;
  apiEndpoint?: string;
  apiKeyField?: string;
  inputCostPer1K: number; // 每1000 token消耗
  outputCostPer1K: number;
  supportsVision?: boolean; // 支持图片输入
  description?: string;
}

export const LLM_MODELS: Record<LLMModelType, LLMModelConfig> = {
  'gpt-4o': {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    apiKeyField: 'OPENAI_API_KEY',
    inputCostPer1K: 0.005,
    outputCostPer1K: 0.015,
    supportsVision: true,
    description: 'OpenAI 全能模型'
  },
  'gpt-4o-mini': {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    inputCostPer1K: 0.00015,
    outputCostPer1K: 0.0006,
    supportsVision: true,
    description: '轻量快速'
  },
  'gpt-4-turbo': {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    inputCostPer1K: 0.01,
    outputCostPer1K: 0.03,
    supportsVision: true,
    description: '高性能 GPT-4'
  },
  'claude-3-5-sonnet': {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    apiEndpoint: 'https://api.anthropic.com/v1/messages',
    apiKeyField: 'ANTHROPIC_API_KEY',
    inputCostPer1K: 0.003,
    outputCostPer1K: 0.015,
    supportsVision: true,
    description: 'Anthropic 高性能模型'
  },
  'claude-3-opus': {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    inputCostPer1K: 0.015,
    outputCostPer1K: 0.075,
    supportsVision: true,
    description: '最强大的 Claude'
  },
  'gemini-1-5-pro': {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
    apiKeyField: 'GOOGLE_AI_API_KEY',
    inputCostPer1K: 0.00125,
    outputCostPer1K: 0.005,
    supportsVision: true,
    description: 'Google 多模态模型'
  },
  'gemini-1-5-flash': {
    id: 'gemini-1-5-flash',
    name: 'Gemini 1.5 Flash',
    provider: 'Google',
    inputCostPer1K: 0,
    outputCostPer1K: 0,
    supportsVision: true,
    description: 'Google 免费模型'
  },
  'custom-llm': {
    id: 'custom-llm',
    name: '自定义 LLM',
    provider: '自定义',
    inputCostPer1K: 0,
    outputCostPer1K: 0,
    supportsVision: true,
    description: '使用自己的 API'
  }
};

// ============ 导出所有类型 ============
export const AllModelTypes = {
  image: ImageModelType,
  video: VideoModelType,
  llm: LLMModelType
};

export const AllModels = {
  image: IMAGE_MODELS,
  video: VIDEO_MODELS,
  llm: LLM_MODELS
};
