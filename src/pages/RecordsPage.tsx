import { useNavigate } from 'react-router-dom';
import { Calendar, Thermometer, Droplets, Plus } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Layout } from '@/components/Layout/Layout';
import { Card } from '@/components/common/Card';
import { StarRating } from '@/components/common/StarRating';
import { useAppStore } from '@/store';
import { formatDate } from '@/utils/recommendation';

export function RecordsPage() {
  const navigate = useNavigate();
  const { records, beans } = useAppStore();

  const sortedRecords = [...records].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-coffee-900">冲煮记录</h1>
            <p className="text-coffee-600 mt-1">回顾你的咖啡历程</p>
          </div>
          <Button onClick={() => navigate('/records/new')}>
            <Plus className="w-5 h-5 mr-2" />
            添加记录
          </Button>
        </div>

        {sortedRecords.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-coffee-600" />
            </div>
            <h3 className="font-bold text-coffee-900 mb-2">还没有记录</h3>
            <p className="text-coffee-600 mb-4">完成一次冲煮后，记录会显示在这里</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedRecords.map((record) => {
              const bean = beans.find((b) => b.id === record.beanId);
              return (
                <Card
                  key={record.id}
                  hover
                  onClick={() => navigate(`/records/${record.id}`)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-8 h-8 text-coffee-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-coffee-900">
                            {record.beanName || bean?.name || '未知豆子'}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-coffee-600 mt-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(record.createdAt)}</span>
                          </div>
                        </div>
                        <StarRating rating={record.rating} readonly size="sm" />
                      </div>

                      <div className="flex items-center gap-4 text-sm text-coffee-700">
                        <div className="flex items-center gap-1">
                          <Thermometer className="w-3 h-3" />
                          <span>{record.waterTemp}℃</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Droplets className="w-3 h-3" />
                          <span>{record.waterAmount}ml</span>
                        </div>
                        <span>{record.grindSize}</span>
                      </div>

                      {record.flavorNotes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {record.flavorNotes.slice(0, 3).map((note) => (
                            <span
                              key={note}
                              className="px-2 py-0.5 text-xs bg-coffee-100 text-coffee-700 rounded"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}