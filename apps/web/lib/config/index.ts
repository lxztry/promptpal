// 图片风格
export const IMAGE_STYLES = {
  photorealistic: { id: 'photorealistic', name: '写实照片', nameEn: 'Photorealistic' },
  portrait: { id: 'portrait', name: '人像摄影', nameEn: 'Portrait' },
  landscape: { id: 'landscape', name: '风景摄影', nameEn: 'Landscape' },
  anime: { id: 'anime', name: '动漫风格', nameEn: 'Anime' },
  illustration: { id: 'illustration', name: '商业插画', nameEn: 'Illustration' },
  watercolor: { id: 'watercolor', name: '水彩画', nameEn: 'Watercolor' },
  '3d-render': { id: '3d-render', name: '3D渲染', nameEn: '3D Render' },
  '3d-pixar': { id: '3d-pixar', name: '皮克斯风格', nameEn: 'Pixar Style' },
  cyberpunk: { id: 'cyberpunk', name: '赛博朋克', nameEn: 'Cyberpunk' },
  fantasy: { id: 'fantasy', name: '奇幻风格', nameEn: 'Fantasy' },
  comic: { id: 'comic', name: '美漫风格', nameEn: 'Comic' },
  architectural: { id: 'architectural', name: '建筑可视化', nameEn: 'Architectural' },
  product: { id: 'product', name: '产品摄影', nameEn: 'Product' },
  fashion: { id: 'fashion', name: '时尚摄影', nameEn: 'Fashion' },
} as const;

// 视频风格
export const VIDEO_STYLES = {
  cinematic: { id: 'cinematic', name: '电影感', nameEn: 'Cinematic' },
  documentary: { id: 'documentary', name: '纪录片', nameEn: 'Documentary' },
  animation: { id: 'animation', name: '动画', nameEn: 'Animation' },
  commercial: { id: 'commercial', name: '商业广告', nameEn: 'Commercial' },
  vlog: { id: 'vlog', name: 'Vlog风格', nameEn: 'Vlog' },
  music_video: { id: 'music_video', name: '音乐MV', nameEn: 'Music Video' },
} as const;

// 图片模型配置
export const IMAGE_MODELS = {
  'flux-pro': { id: 'flux-pro', name: 'Flux Pro', provider: 'Flux AI', creditCost: 2 },
  'flux-schnell': { id: 'flux-schnell', name: 'Flux Schnell', provider: 'Flux AI', creditCost: 1 },
  'dall-e-3': { id: 'dall-e-3', name: 'DALL-E 3', provider: 'OpenAI', creditCost: 2 },
  'dall-e-2': { id: 'dall-e-2', name: 'DALL-E 2', provider: 'OpenAI', creditCost: 1 },
  'sdxl': { id: 'sdxl', name: 'Stable Diffusion XL', provider: 'Stability AI', creditCost: 1 },
} as const;

// 视频模型配置
export const VIDEO_MODELS = {
  'runway-gen3': { id: 'runway-gen3', name: 'Runway Gen-3', provider: 'Runway', creditCostPerVideo: 10 },
  'veo': { id: 'veo', name: 'Google Veo', provider: 'Google AI', creditCostPerVideo: 10 },
  'luma': { id: 'luma', name: 'Luma Dream Machine', provider: 'Luma AI', creditCostPerVideo: 3 },
} as const;

// 免费额度
export const FREE_QUOTAS = {
  daily: {
    promptGeneration: 30,
    imageGeneration: 10,
    videoGeneration: 2,
  }
};
