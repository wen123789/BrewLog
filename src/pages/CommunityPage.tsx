import { Users, Thermometer, Clock } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { Card } from '@/components/common/Card';
import { StarRating } from '@/components/common/StarRating';
import { mockCommunityRecords } from '@/data/mockData';

export function CommunityPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-forest-100 to-forest-200 rounded-full mb-3">
            <Users className="w-5 h-5 text-forest-600" />
            <span className="font-medium text-forest-700">咖啡爱好者社区</span>
          </div>
          <h1 className="text-2xl font-bold text-coffee-900">冲煮分享</h1>
          <p className="text-coffee-600 mt-1">发现他人的精彩冲煮</p>
        </div>

        <div className="space-y-4">
          {mockCommunityRecords.map((record) => (
            <Card key={record.id} className="overflow-hidden">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <img
                    src={record.imageUrl}
                    alt="冲煮照片"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coffee-200 to-cream-300 flex items-center justify-center">
                          <span className="text-sm">👤</span>
                        </div>
                        <span className="font-medium text-coffee-900">
                          {record.userName}
                        </span>
                      </div>
                      <h3 className="font-bold text-coffee-900 mt-1">{record.beanName}</h3>
                    </div>
                    <StarRating rating={record.rating} readonly size="sm" />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-coffee-600">
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-3 h-3" />
                      <span>{record.waterTemp}℃</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>刚刚</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Card className="text-center py-8 bg-gradient-to-br from-coffee-50 to-cream-100">
            <p className="text-coffee-700 mb-2">
              💡 分享你的冲煮记录，让更多人发现好咖啡
            </p>
            <p className="text-sm text-coffee-500">
              在"冲煮记录"页面完成记录后即可分享
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
}