import type { CoffeeBean, BrewRecommendation, BrewStage } from '@/types';

// 根据烘焙度生成推荐参数
export function generateRecommendation(bean: CoffeeBean): BrewRecommendation {
  const roastRules = {
    light: {
      temp: 92,
      ratio: 16,
      grindSize: '中细',
    },
    medium: {
      temp: 90,
      ratio: 15,
      grindSize: '中',
    },
    dark: {
      temp: 88,
      ratio: 14,
      grindSize: '中粗',
    },
  };

  const rule = roastRules[bean.roastLevel];
  const coffeeAmount = 15;

  // 生成注水阶段
  const stages: BrewStage[] = [
    { name: '闷蒸', duration: 30, waterAmount: coffeeAmount * 2 },
    { name: '第一次注水', duration: 45, waterAmount: coffeeAmount * 6 },
    { name: '第二次注水', duration: 45, waterAmount: coffeeAmount * 5 },
    { name: '第三次注水', duration: 30, waterAmount: coffeeAmount * 3 },
  ];

  return {
    waterTemp: rule.temp,
    grindSize: rule.grindSize,
    coffeeAmount,
    waterAmount: coffeeAmount * rule.ratio,
    stages,
  };
}

// 格式化时间显示 (秒 -> mm:ss)
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 生成唯一ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 格式化日期
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}