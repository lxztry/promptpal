/**
 * PromptPal - 批量生成组件
 */

import { batchGenerate } from './generator';
import { scoreBatchPrompts } from './scorer';
import type { GenerationResult, GenerationOptions } from './generator';
import type { ScoreResult } from './scorer';

export interface BatchItem {
  id: string;
  description: string;
  category: string;
  status: 'pending' | 'generating' | 'done' | 'error';
  result?: GenerationResult;
  score?: ScoreResult;
}

export interface BatchResult {
  items: BatchItem[];
  totalGenerated: number;
  averageScore: number;
  timestamp: number;
}

/**
 * 创建批量生成任务
 */
export async function createBatchJob(
  items: Array<{ description: string; category: string }>,
  options: GenerationOptions = {}
): Promise<BatchResult> {
  const batchItems: BatchItem[] = items.map((item, index) => ({
    id: `batch_${Date.now()}_${index}`,
    description: item.description,
    category: item.category,
    status: 'pending' as const
  }));
  
  // 开始生成
  const generatingItems = batchItems.map(async (item) => {
    item.status = 'generating';
    
    try {
      const result = await batchGenerate([{ description: item.description, category: item.category }], options);
      item.result = result[0];
      item.status = 'done';
      
      // 生成评分
      item.score = await scoreBatchPrompts([item.result.prompt]).then(scores => scores[0]);
    } catch (error) {
      item.status = 'error';
      console.error(`Error generating for ${item.description}:`, error);
    }
    
    return item;
  });
  
  const results = await Promise.all(generatingItems);
  
  // 计算统计
  const doneItems = results.filter(item => item.status === 'done');
  const totalScore = doneItems.reduce((sum, item) => sum + (item.score?.overall || 0), 0);
  
  return {
    items: results,
    totalGenerated: doneItems.length,
    averageScore: doneItems.length > 0 ? Math.round(totalScore / doneItems.length) : 0,
    timestamp: Date.now()
  };
}

/**
 * 导出批量结果
 */
export function exportBatchResults(result: BatchResult, format: 'json' | 'csv' | 'txt'): string {
  switch (format) {
    case 'json':
      return JSON.stringify(result, null, 2);
      
    case 'csv':
      const headers = 'Description,Category,Prompt,Score\n';
      const rows = result.items
        .filter(item => item.status === 'done')
        .map(item => `"${item.description}","${item.category}","${item.result?.prompt}","${item.score?.overall}"`)
        .join('\n');
      return headers + rows;
      
    case 'txt':
      return result.items
        .filter(item => item.status === 'done')
        .map((item, index) => `# ${index + 1}: ${item.description}\nPrompt: ${item.result?.prompt}\nScore: ${item.score?.overall}\n`)
        .join('\n');
      
    default:
      return '';
  }
}

/**
 * 对比视图数据
 */
export function getComparisonView(results: GenerationResult[]): {
  headers: string[];
  rows: Array<{ label: string; values: string[] }>;
} {
  return {
    headers: ['Prompt', 'Negative', 'Variations', 'Score'],
    rows: results.map((result, index) => ({
      label: `Option ${index + 1}`,
      values: [
        result.prompt.substring(0, 50) + (result.prompt.length > 50 ? '...' : ''),
        result.negative || '-',
        result.variations.length.toString(),
        '' // Score will be added separately
      ]
    }))
  };
}
