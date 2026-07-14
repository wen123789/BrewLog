// LocalStorage 工具函数
const STORAGE_KEYS = {
  BEANS: 'brewlog_beans',
  EQUIPMENT: 'brewlog_equipment',
  EQUIPMENT_SETS: 'brewlog_equipment_sets',
  RECORDS: 'brewlog_records',
} as const;

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('保存数据失败:', error);
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('读取数据失败:', error);
    return defaultValue;
  }
}

export function clearStorage(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

export { STORAGE_KEYS };