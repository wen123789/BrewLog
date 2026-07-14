import { Link } from 'react-router-dom';
import { Package, Wrench, Sparkles, Timer, BarChart3, Users, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { Card } from '@/components/common/Card';
import { StarRating } from '@/components/common/StarRating';
import { useAppStore } from '@/store';
import { formatDate } from '@/utils/recommendation';

const featureCards = [
  {
    to: '/beans',
    icon: Package,
    title: '豆袋档案',
    description: '管理咖啡豆信息',
    gradient: 'from-coffee-500 to-coffee-600',
  },
  {
    to: '/equipment',
    icon: Wrench,
    title: '设备档案',
    description: '管理冲煮器具',
    gradient: 'from-forest-500 to-forest-600',
  },
  {
    to: '/recommend',
    icon: Sparkles,
    title: 'AI 推荐',
    description: '智能参数推荐',
    gradient: 'from-coffee-400 to-cream-400',
  },
  {
    to: '/timer',
    icon: Timer,
    title: '冲煮计时',
    description: '分段计时提醒',
    gradient: 'from-coffee-600 to-coffee-700',
  },
  {
    to: '/records',
    icon: BarChart3,
    title: '冲煮记录',
    description: '查看历史记录',
    gradient: 'from-coffee-500 to-cream-500',
  },
  {
    to: '/profile',
    icon: BarChart3,
    title: '风味档案',
    description: '口味偏好分析',
    gradient: 'from-forest-400 to-forest-500',
  },
];

export function HomePage() {
  const { beans, records } = useAppStore();
  const recentRecords = records.slice(-3).reverse();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center py-8 mb-6">
          <h1 className="text-3xl font-bold text-coffee-900 mb-3">
            冲煮笔记
          </h1>
          <p className="text-lg text-coffee-700">
            把每一杯咖啡从玄学变成可记录、可复现的数据
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.to} to={card.to}>
                <Card hover className="h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-coffee-900 mb-1">{card.title}</h3>
                  <p className="text-sm text-coffee-600">{card.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Records */}
        {recentRecords.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-coffee-900">最近冲煮</h2>
                  <Link
                    to="/records"
                    className="flex items-center gap-1 text-coffee-600 hover:text-coffee-700 text-sm font-medium"
              >
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentRecords.map((record) => {
                const bean = beans.find((b) => b.id === record.beanId);
                return (
                  <Card key={record.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center flex-shrink-0">
                      <Package className="w-8 h-8 text-coffee-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-coffee-900 truncate">
                        {bean?.name || '未知豆子'}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-coffee-600">
                        <span>{record.waterTemp}℃</span>
                        <span>•</span>
                        <span>{record.waterAmount}ml</span>
                        <span>•</span>
                        <span>{formatDate(record.createdAt)}</span>
                      </div>
                    </div>
                    <StarRating rating={record.rating} readonly size="sm" />
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {records.length === 0 && (
          <Card className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center">
              <Timer className="w-10 h-10 text-coffee-600" />
            </div>
            <h3 className="font-bold text-coffee-900 mb-2">开始你的第一杯冲煮</h3>
            <p className="text-coffee-600 mb-4">添加咖啡豆，让AI为你推荐最佳参数</p>
            <Link
              to="/beans"
              className="inline-block px-6 py-3 bg-gradient-to-r from-coffee-600 to-coffee-700 text-white rounded-lg font-medium hover:from-coffee-700 hover:to-coffee-800 transition-all shadow-lg"
            >
              添加豆袋
            </Link>
          </Card>
        )}
      </div>
    </Layout>
  );
}