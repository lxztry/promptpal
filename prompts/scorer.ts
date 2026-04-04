/**
 * PromptPal - 提示词评分系统
 * 
 * 基于AI自动评估提示词质量，给出优化建议
 */

export interface ScoreResult {
  overall: number;           // 总分 0-100
  clarity: number;           // 清晰度
  completeness: number;       // 完整性
  creativity: number;        // 创意性
  tags: string[];           // 标签
  suggestions: string[];     // 优化建议
  strengths: string[];       // 优点
  weaknesses: string[];       // 缺点
}

/**
 * 评估提示词质量
 */
export async function scorePrompt(prompt: string): Promise<ScoreResult> {
  const scores = calculateScores(prompt);
  const analysis = analyzePrompt(prompt);
  
  return {
    ...scores,
    ...analysis
  };
}

/**
 * 计算各项分数
 */
function calculateScores(prompt: string): { overall: number; clarity: number; completeness: number; creativity: number } {
  let clarity = 70;
  let completeness = 60;
  let creativity = 70;
  
  // 清晰度评估
  if (prompt.length > 20) clarity += 10;
  if (prompt.length > 50) clarity += 10;
  if (prompt.includes(',')) clarity += 5;
  if (prompt.includes(':')) clarity += 5;
  
  // 完整性评估
  const hasSubject = prompt.includes('subject') || prompt.includes('character') || prompt.includes('landscape');
  const hasStyle = prompt.includes('style') || prompt.includes('type');
  const hasQuality = prompt.includes('quality') || prompt.includes('detail') || prompt.includes('resolution');
  
  if (hasSubject) completeness += 15;
  if (hasStyle) completeness += 15;
  if (hasQuality) completeness += 10;
  
  // 创意性评估
  const creativeWords = ['dramatic', 'breathtaking', 'ethereal', 'mystical', 'epic', 'cinematic'];
  const creativeCount = creativeWords.filter(word => prompt.toLowerCase().includes(word)).length;
  creativity += creativeCount * 5;
  
  // 确保分数在合理范围内
  clarity = Math.min(100, Math.max(0, clarity));
  completeness = Math.min(100, Math.max(0, completeness));
  creativity = Math.min(100, Math.max(0, creativity));
  
  // 总分加权平均
  const overall = Math.round(clarity * 0.4 + completeness * 0.35 + creativity * 0.25);
  
  return { overall, clarity, completeness, creativity };
}

/**
 * 分析提示词优缺点
 */
function analyzePrompt(prompt: string): { tags: string[]; suggestions: string[]; strengths: string[]; weaknesses: string[] } {
  const tags: string[] = [];
  const suggestions: string[] = [];
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  
  // 检测标签
  if (prompt.includes('portrait') || prompt.includes('portrait')) tags.push('portrait');
  if (prompt.includes('landscape') || prompt.includes('nature')) tags.push('landscape');
  if (prompt.includes('anime') || prompt.includes('illustration')) tags.push('anime');
  if (prompt.includes('product') || prompt.includes('commercial')) tags.push('product');
  if (prompt.includes('art') || prompt.includes('painting')) tags.push('art');
  
  // 检测画质相关
  if (prompt.includes('4K') || prompt.includes('8K') || prompt.includes('high quality')) {
    strengths.push('包含画质参数');
  } else {
    suggestions.push('建议添加画质参数如 4K, high quality');
  }
  
  // 检测风格相关
  if (prompt.includes('style')) {
    strengths.push('指定了风格');
  } else {
    suggestions.push('建议明确指定风格');
  }
  
  // 检测光照相关
  if (prompt.includes('lighting') || prompt.includes('light')) {
    strengths.push('包含光照描述');
  } else {
    suggestions.push('建议添加光照效果描述');
  }
  
  // 检测负面提示词
  if (prompt.includes('negative')) {
    strengths.push('包含负面提示词');
  } else {
    suggestions.push('建议添加负面提示词排除不需要的元素');
  }
  
  // 弱点检测
  if (prompt.length < 30) {
    weaknesses.push('提示词过于简短');
  }
  
  if (!prompt.includes(',')) {
    weaknesses.push('缺少逗号分隔的细节描述');
  }
  
  return { tags, suggestions, strengths, weaknesses };
}

/**
 * 生成优化建议
 */
export function generateSuggestions(prompt: string): string[] {
  const suggestions: string[] = [];
  
  // 基础建议
  if (prompt.length < 50) {
    suggestions.push('增加更多细节描述，让AI更清楚你的需求');
  }
  
  // 风格建议
  if (!prompt.toLowerCase().includes('style')) {
    suggestions.push('添加具体的艺术风格描述，如: anime style, realistic photography等');
  }
  
  // 光照建议
  if (!prompt.toLowerCase().includes('lighting') && !prompt.toLowerCase().includes('light')) {
    suggestions.push('添加光照描述，如: soft lighting, dramatic lighting, golden hour等');
  }
  
  // 画质建议
  if (!prompt.toLowerCase().includes('quality') && !prompt.toLowerCase().includes('4k') && !prompt.toLowerCase().includes('8k')) {
    suggestions.push('添加画质参数，如: high quality, 4K, detailed等');
  }
  
  // 负面提示词建议
  if (!prompt.toLowerCase().includes('negative')) {
    suggestions.push('添加负面提示词来排除不需要的元素，如: negative: blurry, low quality');
  }
  
  return suggestions;
}

/**
 * 批量评分
 */
export async function scoreBatchPrompts(prompts: string[]): Promise<ScoreResult[]> {
  return Promise.all(prompts.map(prompt => scorePrompt(prompt)));
}
