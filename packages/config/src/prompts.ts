// ============ 图像风格模板 ============
export const IMAGE_STYLES = {
  // 照片风格
  photorealistic: {
    id: 'photorealistic',
    name: '写实照片',
    nameEn: 'Photorealistic',
    prompt: '{content}, 写实摄影风格, 自然光线, 专业相机, {camera}, 浅景深, 8K分辨率, 真实质感',
    camera: 'Canon EOS R5, 85mm镜头',
    tags: ['照片', '写实', '自然光'],
    examples: ['一只猫', '城市街景', '人物肖像']
  },
  
  portrait: {
    id: 'portrait',
    name: '人像摄影',
    nameEn: 'Portrait',
    prompt: '{content}, 人像摄影风格, 柔和布光, 工作室灯光, 佳能85mm f/1.4, 奶油般虚化背景, 专业修图',
    tags: ['人像', '摄影', '虚化'],
    examples: ['年轻女性', '老人肖像', '儿童照片']
  },
  
  landscape: {
    id: 'landscape',
    name: '风景摄影',
    nameEn: 'Landscape',
    prompt: '{content}, 凤景摄影, 黄金时段光线, 广角镜头, 索尼A7R IV, {lighting}, 细节丰富',
    lighting: '日出/日落暖色调',
    tags: ['风景', '自然', '广角'],
    examples: ['山脉日落', '海边日出', '森林湖泊']
  },

  // 艺术风格
  anime: {
    id: 'anime',
    name: '动漫风格',
    nameEn: 'Anime',
    prompt: '{content}, 精美动漫插画风格, 吉卜力工作室, 宫崎骏风格, 手绘质感, 温暖色调, 柔和光影, 高质量动画',
    tags: ['动漫', '日本', '手绘'],
    examples: ['少女', '奇幻场景', '日常场景']
  },
  
  illustration: {
    id: 'illustration',
    name: '商业插画',
    nameEn: 'Illustration',
    prompt: '{content}, 专业商业插画风格, 矢量艺术, 扁平化设计, 莫兰迪色调, 简洁现代, 高端质感',
    tags: ['插画', '矢量', '扁平'],
    examples: ['科技产品', '商业图标', '人物插画']
  },
  
  watercolor: {
    id: 'watercolor',
    name: '水彩画',
    nameEn: 'Watercolor',
    prompt: '{content}, 水彩画风格, 柔和透明质感, 艺术手绘, 梦幻色调, 细腻笔触, 纸张纹理',
    tags: ['水彩', '艺术', '手绘'],
    examples: ['花卉', '风景', '人物']
  },

  // 3D风格
  '3d-render': {
    id: '3d-render',
    name: '3D渲染',
    nameEn: '3D Render',
    prompt: '{content}, 3D渲染风格, Octane渲染器, C4D, 电影级光线, 精细建模, 次时代画质, 酷炫背景',
    tags: ['3D', '渲染', 'C4D'],
    examples: ['产品展示', '角色设计', '场景建模']
  },
  
  '3d-pixar': {
    id: '3d-pixar',
    name: '皮克斯风格',
    nameEn: 'Pixar Style',
    prompt: '{content}, 皮克斯动画风格, Pixar, Disney, 生动色彩, 角色设计, 电影级渲染, 可爱风格',
    tags: ['皮克斯', '3D动画', '可爱'],
    examples: ['儿童角色', '家庭场景', '冒险故事']
  },

  // 特殊风格
  cyberpunk: {
    id: 'cyberpunk',
    name: '赛博朋克',
    nameEn: 'Cyberpunk',
    prompt: '{content}, 赛博朋克风格, 霓虹灯光, Blade Runner美学, 暗色调, 雨中城市, 未来科技感, 数字故障效果',
    tags: ['赛博朋克', '霓虹', '未来'],
    examples: ['都市夜景', '机械人物', '科技场景']
  },
  
  fantasy: {
    id: 'fantasy',
    name: '奇幻风格',
    nameEn: 'Fantasy',
    prompt: '{content}, 奇幻插画风格, 魔兽世界, 精美细节, 魔法光效, 神秘氛围, 史诗级构图, 艺术感',
    tags: ['奇幻', '魔法', '史诗'],
    examples: ['精灵', '巨龙', '魔法场景']
  },
  
  comic: {
    id: 'comic',
    name: '美漫风格',
    nameEn: 'Comic',
    prompt: '{content}, 美式漫画风格, Marvel DC, 动态分镜, 强烈光影, 网点纹理, 漫画网点, 戏剧性构图',
    tags: ['美漫', '超级英雄', '漫画'],
    examples: ['超级英雄', '战斗场景', '超级反派']
  },

  // 专业领域
  architectural: {
    id: 'architectural',
    name: '建筑可视化',
    nameEn: 'Architectural',
    prompt: '{content}, 建筑可视化, 建筑摄影, 现代主义设计, 极简主义, 玻璃幕墙, 完美构图, 专业渲染',
    tags: ['建筑', '设计', '极简'],
    examples: ['摩天大楼', '室内设计', '城市规划']
  },
  
  product: {
    id: 'product',
    name: '产品摄影',
    nameEn: 'Product',
    prompt: '{content}, 产品摄影, 商业摄影, 白色背景, 完美布光, 产品展示, 高端质感, 亚马逊风格',
    tags: ['产品', '商业', '摄影'],
    examples: ['电子产品', '化妆品', '首饰']
  },
  
  fashion: {
    id: 'fashion',
    name: '时尚摄影',
    nameEn: 'Fashion',
    prompt: '{content}, 时尚摄影, Vogue风格, 高端时尚, 模特姿态, 精致妆容, 舞台灯光, 杂志封面',
    tags: ['时尚', 'Vogue', '杂志'],
    examples: ['服装展示', '美妆', '配饰']
  }
} as const;

// ============ 视频风格模板 ============
export const VIDEO_STYLES = {
  cinematic: {
    id: 'cinematic',
    name: '电影感',
    nameEn: 'Cinematic',
    prompt: '{content}, 电影级镜头, 35mm电影镜头, 宽银幕构图, 景深, 戏剧性光线, 电影调色',
    tags: ['电影', '专业', '戏剧性'],
    examples: ['追逐场景', '情感对话', '史诗战争']
  },
  
  documentary: {
    id: 'documentary',
    name: '纪录片',
    nameEn: 'Documentary',
    prompt: '{content}, 纪录片风格, 真实感, 纪实摄影, 自然光线, 跟拍镜头, 采访场景',
    tags: ['纪录片', '真实', '纪实'],
    examples: ['野生动物', '人文故事', '自然风光']
  },
  
  animation: {
    id: 'animation',
    name: '动画',
    nameEn: 'Animation',
    prompt: '{content}, 动画风格, 流畅运动, 高帧率, 精美画面, {animation_style}',
    animation_style: '2D手绘动画',
    tags: ['动画', '流畅', '生动'],
    examples: ['卡通角色', '动画短片', 'MG动画']
  },
  
  commercial: {
    id: 'commercial',
    name: '商业广告',
    nameEn: 'Commercial',
    prompt: '{content}, 商业广告风格, 高端质感, 快速剪辑节奏, 产品展示, 专业灯光, 吸引眼球的视觉',
    tags: ['广告', '商业', '快节奏'],
    examples: ['产品宣传', '品牌广告', '促销视频']
  },
  
  vlog: {
    id: 'vlog',
    name: 'Vlog风格',
    nameEn: 'Vlog',
    prompt: '{content}, Vlog风格, 自然光线, 手持拍摄, 日常生活感, 真实自然, 社交媒体风格',
    tags: ['Vlog', '生活', '自然'],
    examples: ['旅行记录', '日常分享', '美食探店']
  },
  
  music_video: {
    id: 'music_video',
    name: '音乐MV',
    nameEn: 'Music Video',
    prompt: '{content}, 音乐MV风格, 创意视觉, 节奏感强, 蒙太奇剪辑, 舞台灯光, 艺术表现',
    tags: ['MV', '音乐', '创意'],
    examples: ['歌曲配图', '舞蹈场景', '歌词意境']
  }
} as const;

// ============ 提示词生成系统提示词 ============
export const PROMPT_GENERATION_SYSTEM = {
  zh: `你是专业的AI图像和视频提示词工程师。
请根据用户输入的内容，生成优化的AI生成提示词。

规则：
1. 理解用户意图，提取核心元素
2. 添加适当的艺术风格和质量参数
3. 确保提示词清晰、具体、可执行
4. 中文输入，英文输出（更适合AI图像模型）
5. 保持创意性和艺术感

输出格式：
- 图片提示词：简洁的英文描述，包含主体、风格、光线、构图等元素
- 视频提示词：包含镜头运动、时间、节奏等视频特有元素`,

  en: `You are a professional AI image and video prompt engineer.
Generate optimized prompts for AI image/video generation based on user input.

Rules:
1. Understand user intent and extract core elements
2. Add appropriate artistic style and quality parameters
3. Ensure prompts are clear, specific, and actionable
4. Keep it creative and artistic

Output format:
- Image prompts: Concise English description with subject, style, lighting, composition
- Video prompts: Include camera movement, timing, rhythm, and video-specific elements`
};

export const IMAGE_TO_PROMPT_SYSTEM = {
  zh: `你是一个专业的图像分析助手。
请分析输入的图像，提取以下信息：
1. 图像主体内容
2. 艺术风格和视觉效果
3. 光线和色调
4. 构图和视角
5. 情感和氛围

然后生成一个优化后的AI图像生成提示词，可用于复现类似风格的图像。`,

  en: `You are a professional image analysis assistant.
Analyze the input image and extract:
1. Main subject and content
2. Artistic style and visual effects
3. Lighting and color tone
4. Composition and perspective
5. Emotion and atmosphere

Then generate an optimized AI image generation prompt that can recreate similar style images.`
};

export const VIDEO_SCRIPT_SYSTEM = {
  zh: `你是一个专业的视频分镜脚本助手。
根据用户输入的内容，生成分镜脚本。

输出格式：
1. 场景描述
2. 镜头类型（特写/中景/远景等）
3. 镜头运动（推/拉/摇/移等）
4. 时长建议
5. 画面描述
6. 旁白/对话建议`,

  en: `You are a professional video storyboard assistant.
Generate a storyboard script based on user input.

Output format:
1. Scene description
2. Shot type (close-up/medium/wide)
3. Camera movement (push/pull/tilt/dolly)
4. Duration suggestion
5. Visual description
6. Narration/dialogue suggestions`
};

// ============ 导出所有配置 ============
export const AllStyles = {
  image: IMAGE_STYLES,
  video: VIDEO_STYLES
};

export const AllSystems = {
  prompt: PROMPT_GENERATION_SYSTEM,
  imageToPrompt: IMAGE_TO_PROMPT_SYSTEM,
  videoScript: VIDEO_SCRIPT_SYSTEM
};
