// 咖啡豆类型
export interface CoffeeBean {
  id: string;
  name: string;
  origin: string;
  roastLevel: 'light' | 'medium' | 'dark';
  flavorTags: string[];
  imageUrl?: string;
  purchaseDate: string;
  createdAt: string;
}

// 设备类型标签
export type EquipmentType = 'grinder' | 'kettle' | 'dripper' | 'scale' | 'server' | 'filter' | 'accessory' | 'other';

// 设备接口
export interface Equipment {
  id: string;
  name: string;
  types: EquipmentType[]; // 支持多类型标签
  category: 'core' | 'consumable' | 'accessory'; // 核心设备 | 耗材 | 配件
  brand?: string;
  imageUrl?: string;
  createdAt: string;
}

// 设备套装
export interface EquipmentSet {
  id: string;
  name: string;
  equipmentIds: string[]; // 包含的设备ID列表
  createdAt: string;
}

// 冲煮阶段
export interface BrewStage {
  name: string;
  duration: number;
  waterAmount: number;
}

// 冲煮记录
export interface BrewRecord {
  id: string;
  beanId: string;
  beanName: string;
  equipmentName: string;
  waterTemp: number;
  grindSize: string;
  waterAmount: number;
  coffeeAmount: number;
  totalTime: number;
  rating: number;
  flavorNotes: string[];
  notes?: string;
  imageUrl?: string;
  createdAt: string;
}

// AI推荐参数
export interface BrewRecommendation {
  waterTemp: number;
  grindSize: string;
  coffeeAmount: number;
  waterAmount: number;
  stages: BrewStage[];
}

// 风味档案
export interface FlavorProfile {
  acidity: number;
  sweetness: number;
  body: number;
  bitterness: number;
  aroma: number;
  aftertaste: number;
}

// 计时器状态
export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  currentStage: number;
  remainingTime: number;
  stages: BrewStage[];
}