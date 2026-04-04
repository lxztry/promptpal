/**
 * PromptPal - 提示词历史记录
 * 
 * 本地存储提示词版本历史
 */

export interface HistoryEntry {
  id: string;
  prompt: string;
  negative?: string;
  timestamp: number;
  model?: string;
  category?: string;
  tags?: string[];
  score?: number;
}

export interface HistoryGroup {
  date: string;
  entries: HistoryEntry[];
}

const STORAGE_KEY = 'promptpal_history';
const MAX_HISTORY = 100;

/**
 * 获取所有历史记录
 */
export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

/**
 * 保存历史记录
 */
export function saveHistory(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
  const history = getHistory();
  
  const newEntry: HistoryEntry = {
    ...entry,
    id: generateId(),
    timestamp: Date.now()
  };
  
  // 添加到开头
  history.unshift(newEntry);
  
  // 限制最大数量
  if (history.length > MAX_HISTORY) {
    history.pop();
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * 删除单条历史
 */
export function deleteHistory(id: string): void {
  const history = getHistory();
  const filtered = history.filter(entry => entry.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * 清空所有历史
 */
export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * 按日期分组
 */
export function getGroupedHistory(): HistoryGroup[] {
  const history = getHistory();
  const groups: Map<string, HistoryEntry[]> = new Map();
  
  history.forEach(entry => {
    const date = formatDate(entry.timestamp);
    if (!groups.has(date)) {
      groups.set(date, []);
    }
    groups.get(date)!.push(entry);
  });
  
  return Array.from(groups.entries()).map(([date, entries]) => ({
    date,
    entries
  }));
}

/**
 * 搜索历史
 */
export function searchHistory(keyword: string): HistoryEntry[] {
  const history = getHistory();
  const lowerKeyword = keyword.toLowerCase();
  
  return history.filter(entry => 
    entry.prompt.toLowerCase().includes(lowerKeyword) ||
    entry.category?.toLowerCase().includes(lowerKeyword) ||
    entry.tags?.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * 收藏历史
 */
export function toggleFavorite(id: string): void {
  const history = getHistory();
  const entry = history.find(e => e.id === id);
  
  if (entry) {
    // @ts-ignore
    entry.favorite = !entry.favorite;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}

/**
 * 获取收藏
 */
export function getFavorites(): HistoryEntry[] {
  return getHistory().filter(entry => (entry as any).favorite);
}

/**
 * 导出历史
 */
export function exportHistory(): string {
  const history = getHistory();
  return JSON.stringify(history, null, 2);
}

/**
 * 导入历史
 */
export function importHistory(json: string): boolean {
  try {
    const imported = JSON.parse(json);
    if (Array.isArray(imported)) {
      const current = getHistory();
      const merged = [...imported, ...current];
      
      // 去重
      const seen = new Set<string>();
      const unique = merged.filter(entry => {
        if (seen.has(entry.id)) return false;
        seen.add(entry.id);
        return true;
      });
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unique.slice(0, MAX_HISTORY)));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

// 辅助函数
function generateId(): string {
  return `h_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // 今天
  if (diff < 24 * 60 * 60 * 1000 && date.getDate() === now.getDate()) {
    return '今天';
  }
  
  // 昨天
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.getDate() === yesterday.getDate()) {
    return '昨天';
  }
  
  // 本周
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    return '本周';
  }
  
  // 本月
  if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
    return '本月';
  }
  
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}
