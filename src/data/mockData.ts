import type { CoffeeBean, Equipment, BrewRecord } from '@/types';

// 模拟咖啡豆数据
export const mockBeans: CoffeeBean[] = [
  {
    id: '1',
    name: '耶加雪菲 水洗',
    origin: '埃塞俄比亚',
    roastLevel: 'light',
    flavorTags: ['果酸', '花香', '柑橘'],
    purchaseDate: '2024-01-15',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: '曼特宁 黄金曼特宁',
    origin: '印尼苏门答腊',
    roastLevel: 'dark',
    flavorTags: ['坚果', '巧克力', '焦糖'],
    purchaseDate: '2024-01-20',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: '危地马拉 安提瓜',
    origin: '危地马拉',
    roastLevel: 'medium',
    flavorTags: ['可可', '香料', '坚果'],
    purchaseDate: '2024-02-01',
    createdAt: '2024-02-01',
  },
];

// 模拟设备数据
export const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Hario V60 01',
    types: ['dripper'],
    category: 'core',
    brand: 'Hario',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Comandante C40',
    types: ['grinder'],
    category: 'core',
    brand: 'Comandante',
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    name: 'Fellow Stagg EKG',
    types: ['kettle'],
    category: 'core',
    brand: 'Fellow',
    createdAt: '2024-01-01',
  },
  {
    id: '4',
    name: 'Acaia Pearl',
    types: ['scale'],
    category: 'core',
    brand: 'Acaia',
    createdAt: '2024-01-01',
  },
  {
    id: '5',
    name: 'Hario V60 玻璃分享壶',
    types: ['server'],
    category: 'core',
    brand: 'Hario',
    createdAt: '2024-01-01',
  },
  {
    id: '6',
    name: 'Hario V01 滤纸',
    types: ['filter'],
    category: 'consumable',
    brand: 'Hario',
    createdAt: '2024-01-01',
  },
];

// 模拟冲煮记录数据
export const mockRecords: BrewRecord[] = [
  {
    id: '1',
    beanId: '1',
    beanName: '耶加雪菲 水洗',
    equipmentName: 'Hario V60 01',
    waterTemp: 92,
    grindSize: '中细',
    waterAmount: 240,
    coffeeAmount: 15,
    totalTime: 180,
    rating: 4,
    flavorNotes: ['果酸明亮', '花香明显', '余韵悠长'],
    notes: '水温略高，下次试试90度',
    createdAt: '2024-02-10T08:30:00',
  },
  {
    id: '2',
    beanId: '2',
    beanName: '曼特宁 黄金曼特宁',
    equipmentName: 'Hario V60 01',
    waterTemp: 88,
    grindSize: '中粗',
    waterAmount: 210,
    coffeeAmount: 15,
    totalTime: 165,
    rating: 5,
    flavorNotes: ['醇厚浓郁', '巧克力风味', '平衡感好'],
    notes: '完美！',
    createdAt: '2024-02-12T09:00:00',
  },
  {
    id: '3',
    beanId: '3',
    beanName: '危地马拉 安提瓜',
    equipmentName: 'Hario V60 01',
    waterTemp: 90,
    grindSize: '中',
    waterAmount: 225,
    coffeeAmount: 15,
    totalTime: 170,
    rating: 4,
    flavorNotes: ['可可香明显', '酸度适中', '口感顺滑'],
    createdAt: '2024-02-15T07:45:00',
  },
];

// 社区流模拟数据
export const mockCommunityRecords = [
  {
    id: '101',
    userName: '咖啡爱好者小王',
    beanName: '巴拿马 瑰夏',
    waterTemp: 91,
    rating: 5,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=a%20beautiful%20cup%20of%20pour%20over%20coffee&image_size=square',
    createdAt: '2024-02-18T10:30:00',
  },
  {
    id: '102',
    userName: '手冲达人',
    beanName: '哥伦比亚 薇拉',
    waterTemp: 89,
    rating: 4,
    imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=coffee%20brewing%20equipment&image_size=square',
    createdAt: '2024-02-17T15:20:00',
  },
];