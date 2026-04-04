/**
 * PromptPal - 提示词生成器
 * 
 * 基于模板和描述生成优化提示词
 */

export interface GenerationOptions {
  model?: 'gpt4' | 'claude' | 'local';
  style?: 'realistic' | 'artistic' | 'creative';
  quality?: 'standard' | 'high' | 'ultra';
}

export interface GenerationResult {
  prompt: string;
  negative?: string;
  variations: string[];
  metadata: {
    model: string;
    generatedAt: number;
    style: string;
  };
}

/**
 * 基础提示词生成
 */
export async function generatePrompt(
  description: string,
  category: string,
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  const { style = 'realistic', quality = 'high' } = options;
  
  // 获取对应类别的模板
  const templates = await getTemplates(category);
  const template = selectTemplate(templates, description);
  
  // 替换占位符
  let prompt = template.prompt
    .replace('{subject}', description)
    .replace('{terrain}', description)
    .replace('{landscape}', description)
    .replace('{character}', description)
    .replace('{product}', description);
  
  // 添加质量参数
  prompt = addQualityParams(prompt, quality);
  
  // 添加风格修饰
  prompt = addStyleModifiers(prompt, style);
  
  // 生成变体
  const variations = generateVariations(prompt, 3);
  
  return {
    prompt,
    negative: template.negative,
    variations,
    metadata: {
      model: options.model || 'gpt4',
      generatedAt: Date.now(),
      style
    }
  };
}

/**
 * 从描述生成多种风格变体
 */
export async function generateVarietyPrompts(
  description: string,
  category: string,
  count: number = 5
): Promise<GenerationResult[]> {
  const results: GenerationResult[] = [];
  const styles = ['realistic', 'artistic', 'creative', 'cinematic', 'dramatic'];
  
  for (let i = 0; i < count && i < styles.length; i++) {
    const result = await generatePrompt(description, category, { style: styles[i] as any });
    results.push(result);
  }
  
  return results;
}

/**
 * 批量生成
 */
export async function batchGenerate(
  items: Array<{ description: string; category: string }>,
  options: GenerationOptions = {}
): Promise<GenerationResult[]> {
  // 并行生成
  const promises = items.map(item => generatePrompt(item.description, item.category, options));
  return Promise.all(promises);
}

/**
 * 增强现有提示词
 */
export function enhancePrompt(prompt: string, enhancements: string[]): string {
  let enhanced = prompt;
  
  const enhancementMap: Record<string, string> = {
    'more_detail': ', extremely detailed, intricate details',
    'cinematic': ', cinematic lighting, dramatic atmosphere, film grain',
    'photorealistic': ', photorealistic, hyperrealistic, 8K resolution',
    'artistic': ', artistic, painterly, expressive brushwork',
    'mood': ', emotional mood, evocative atmosphere',
    'professional': ', professional photography, studio quality'
  };
  
  enhancements.forEach(enhancement => {
    if (enhancementMap[enhancement]) {
      enhanced += enhancementMap[enhancement];
    }
  });
  
  return enhanced;
}

// 辅助函数
async function getTemplates(category: string): Promise<any[]> {
  // 简化实现，实际应从文件系统或API加载
  const templateMap: Record<string, any[]> = {
    portrait: [
      { prompt: 'professional portrait photography, {subject}, soft lighting', negative: 'blurry' },
      { prompt: 'fashion editorial, {subject}, dramatic lighting', negative: 'amateur' }
    ],
    landscape: [
      { prompt: 'breathtaking landscape, {terrain}, golden hour', negative: 'overcast' },
      { prompt: 'serene nature, {landscape}, natural lighting', negative: 'urban' }
    ],
    anime: [
      { prompt: 'anime illustration, {character}, vibrant colors', negative: 'realistic' },
      { prompt: 'anime style, {character}, Studio Ghibli', negative: 'western' }
    ],
    product: [
      { prompt: 'product photography, {product}, clean background', negative: 'cluttered' },
      { prompt: 'commercial photography, {product}, studio lighting', negative: 'amateur' }
    ],
    art: [
      { prompt: 'digital art illustration, {subject}, vibrant colors', negative: 'photographic' },
      { prompt: 'concept art, {subject}, detailed, epic', negative: 'simple' }
    ]
  };
  
  return templateMap[category] || templateMap.art;
}

function selectTemplate(templates: any[], description: string): any {
  // 简单选择第一个，实际可以用更智能的选择
  return templates[0];
}

function addQualityParams(prompt: string, quality: string): string {
  const qualityMap: Record<string, string> = {
    standard: ', high quality',
    high: ', high quality, detailed, 4K',
    ultra: ', extremely detailed, ultra high quality, 8K resolution, masterpiece'
  };
  
  return prompt + qualityMap[quality];
}

function addStyleModifiers(prompt: string, style: string): string {
  const styleMap: Record<string, string> = {
    realistic: ', photorealistic, natural',
    artistic: ', artistic, expressive, creative',
    creative: ', creative, unique, innovative',
    cinematic: ', cinematic, dramatic, film quality',
    dramatic: ', dramatic lighting, high contrast, intense'
  };
  
  return prompt + (styleMap[style] || '');
}

function generateVariations(prompt: string, count: number): string[] {
  const variations: string[] = [];
  
  const modifiers = [
    ', vibrant colors',
    ', soft lighting',
    ', dramatic atmosphere',
    ', golden hour',
    ', professional quality'
  ];
  
  for (let i = 0; i < count; i++) {
    let variation = prompt;
    const modifier = modifiers[i % modifiers.length];
    
    if (i > 0) {
      variation += modifier;
    }
    
    variations.push(variation);
  }
  
  return variations;
}
