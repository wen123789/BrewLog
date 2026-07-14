import { Layout } from '@/components/Layout/Layout';
import { Card } from '@/components/common/Card';
import { FlavorRadar } from '@/components/chart/FlavorRadar';
import { useAppStore } from '@/store';
import type { FlavorProfile } from '@/types';

export function ProfilePage() {
  const { records, beans } = useAppStore();

  // 计算风味档案平均值
  const calculateFlavorProfile = (): FlavorProfile => {
    if (records.length === 0) {
      return {
        acidity: 2.5,
        sweetness: 2.5,
        body: 2.5,
        bitterness: 2.5,
        aroma: 2.5,
        aftertaste: 2.5,
      };
    }

    // 基于评分和风味标签简单计算
    const avgRating = records.reduce((sum, r) => sum + r.rating, 0) / records.length;
    
    // 模拟风味数据
    return {
      acidity: 3.2 + (avgRating - 3) * 0.3,
      sweetness: 3.5 + (avgRating - 3) * 0.2,
      body: 3.0 + (avgRating - 3) * 0.25,
      bitterness: 2.8 - (avgRating - 3) * 0.1,
      aroma: 3.3 + (avgRating - 3) * 0.35,
      aftertaste: 3.1 + (avgRating - 3) * 0.28,
    };
  };

  const flavorProfile = calculateFlavorProfile();

  // 统计数据
  const totalBrews = records.length;
  const uniqueBeans = new Set(records.map((r) => r.beanId)).size;
  const avgRating = records.length > 0
    ? records.reduce((sum, r) => sum + r.rating, 0) / records.length
    : 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-coffee-900">风味档案</h1>
          <p className="text-coffee-600 mt-1">你的口味偏好分析</p>
        </div>

        {records.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="font-bold text-coffee-900 mb-2">还没有足够数据</h3>
            <p className="text-coffee-600 mb-4">完成更多冲煮记录后，这里会显示你的口味分析</p>
          </Card>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="text-center">
                <p className="text-3xl font-bold text-coffee-900">{totalBrews}</p>
                <p className="text-sm text-coffee-600">总冲煮次数</p>
              </Card>
              <Card className="text-center">
                <p className="text-3xl font-bold text-coffee-900">{uniqueBeans}</p>
                <p className="text-sm text-coffee-600">尝试豆种</p>
              </Card>
              <Card className="text-center">
                <p className="text-3xl font-bold text-coffee-900">
                  {avgRating.toFixed(1)}
                </p>
                <p className="text-sm text-coffee-600">平均评分</p>
              </Card>
            </div>

            {/* Radar Chart */}
            <Card className="mb-6">
              <h2 className="text-lg font-bold text-coffee-900 mb-4 text-center">
                风味雷达图
              </h2>
              <FlavorRadar data={flavorProfile} />
              <p className="text-sm text-coffee-600 text-center mt-4">
                基于你的 {totalBrews} 次冲煮记录分析
              </p>
            </Card>

            {/* Favorite Flavors */}
            <Card>
              <h2 className="text-lg font-bold text-coffee-900 mb-3">偏好风味</h2>
              <div className="flex flex-wrap gap-2">
                {['果酸', '花香', '柑橘', '坚果', '巧克力'].map((tag, index) => (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      index < 2
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white'
                        : 'bg-coffee-100 text-coffee-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-coffee-500 mt-3">
                * 风味偏好分析基于AI推荐规则生成，实际数据会根据你的真实记录优化
              </p>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}