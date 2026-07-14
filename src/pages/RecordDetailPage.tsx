import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Thermometer, Droplets, Scale, Clock, Wrench, Tag, FileText, Trash2 } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { StarRating } from '@/components/common/StarRating';
import { Modal } from '@/components/common/Modal';
import { useAppStore } from '@/store';
import { formatDate } from '@/utils/recommendation';

export function RecordDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { records, beans, removeRecord } = useAppStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const record = records.find((r) => r.id === id);

  if (!record) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Card className="text-center py-12">
            <h3 className="font-bold text-coffee-900 mb-2">记录不存在</h3>
            <p className="text-coffee-600 mb-4">该冲煮记录可能已被删除</p>
            <Button onClick={() => navigate('/records')}>返回列表</Button>
          </Card>
        </div>
      </Layout>
    );
  }

  const bean = beans.find((b) => b.id === record.beanId);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Button variant="ghost" onClick={() => navigate('/records')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回列表
        </Button>

        {/* Header */}
        <Card className="mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-coffee-900">
                {record.beanName || bean?.name || '未知豆子'}
              </h1>
              <p className="text-coffee-600 mt-1">{formatDate(record.createdAt)}</p>
            </div>
            <StarRating rating={record.rating} readonly size="lg" />
          </div>

          {record.equipmentName && (
            <div className="flex items-center gap-2 text-coffee-700">
              <Wrench className="w-4 h-4" />
              <span>{record.equipmentName}</span>
            </div>
          )}
        </Card>

        {/* Parameters */}
        <Card className="mb-4">
          <h2 className="text-lg font-bold text-coffee-900 mb-4">冲煮参数</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-coffee-50 to-cream-100 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="w-4 h-4 text-coffee-600" />
                <span className="text-sm text-coffee-600">水温</span>
              </div>
              <p className="text-2xl font-bold text-coffee-900">
                {record.waterTemp}
                <span className="text-sm ml-1">℃</span>
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-coffee-50 to-cream-100 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Scale className="w-4 h-4 text-coffee-600" />
                <span className="text-sm text-coffee-600">粉量</span>
              </div>
              <p className="text-2xl font-bold text-coffee-900">
                {record.coffeeAmount}
                <span className="text-sm ml-1">g</span>
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-coffee-50 to-cream-100 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-coffee-600" />
                <span className="text-sm text-coffee-600">水量</span>
              </div>
              <p className="text-2xl font-bold text-coffee-900">
                {record.waterAmount}
                <span className="text-sm ml-1">ml</span>
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-coffee-50 to-cream-100 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-coffee-600" />
                <span className="text-sm text-coffee-600">总时长</span>
              </div>
              <p className="text-2xl font-bold text-coffee-900">
                {record.totalTime}
                <span className="text-sm ml-1">秒</span>
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-coffee-50 rounded-lg">
            <span className="text-sm text-coffee-600">研磨度</span>
            <p className="font-medium text-coffee-900">{record.grindSize}</p>
          </div>
        </Card>

        {/* Flavor Notes */}
        {record.flavorNotes.length > 0 && (
          <Card className="mb-4">
            <h2 className="text-lg font-bold text-coffee-900 mb-3">
              <Tag className="w-5 h-5 inline mr-2" />
              风味标签
            </h2>
            <div className="flex flex-wrap gap-2">
              {record.flavorNotes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1.5 bg-coffee-100 text-coffee-700 rounded-lg text-sm font-medium"
                >
                  {note}
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Notes */}
        {record.notes && (
          <Card className="mb-4">
            <h2 className="text-lg font-bold text-coffee-900 mb-3">
              <FileText className="w-5 h-5 inline mr-2" />
              备注
            </h2>
            <p className="text-coffee-700 whitespace-pre-wrap">{record.notes}</p>
          </Card>
        )}

        {/* Bean Info */}
        {bean && (
          <Card>
            <h2 className="text-lg font-bold text-coffee-900 mb-3">豆袋信息</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-coffee-600">名称</span>
                <span className="font-medium text-coffee-900">{bean.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-coffee-600">产地</span>
                <span className="font-medium text-coffee-900">{bean.origin || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-coffee-600">烘焙度</span>
                <span className="font-medium text-coffee-900">
                  {{ light: '浅烘', medium: '中烘', dark: '深烘' }[bean.roastLevel]}
                </span>
              </div>
              {bean.flavorTags.length > 0 && (
                <div className="flex justify-between items-start">
                  <span className="text-coffee-600">风味</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {bean.flavorTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-coffee-100 text-coffee-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        <Card className="bg-red-50 border-red-200 mt-4">
          <Button
            variant="danger"
            className="w-full"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="w-5 h-5 mr-2" />
            删除记录
          </Button>
        </Card>

        <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="确认删除">
          <div className="space-y-4">
            <p className="text-coffee-700">确定要删除这条冲煮记录吗？此操作无法撤销。</p>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>
                取消
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                onClick={() => {
                  removeRecord(id!);
                  navigate('/records');
                }}
              >
                确认删除
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}