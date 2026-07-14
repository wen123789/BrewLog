import { useState } from 'react';
import { Plus, MapPin, Trash2, Camera } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { useAppStore } from '@/store';
import type { CoffeeBean } from '@/types';

const roastLevelLabels = {
  light: '浅烘',
  medium: '中烘',
  dark: '深烘',
};

const flavorOptions = ['果酸', '花香', '柑橘', '坚果', '巧克力', '焦糖', '可可', '香料', '莓果', '草本'];

export function BeansPage() {
  const { beans, addBean, removeBean } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    origin: '',
    roastLevel: 'medium' as CoffeeBean['roastLevel'],
    flavorTags: [] as string[],
    purchaseDate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addBean({
      name: formData.name,
      origin: formData.origin,
      roastLevel: formData.roastLevel,
      flavorTags: formData.flavorTags,
      purchaseDate: formData.purchaseDate,
    });

    setFormData({
      name: '',
      origin: '',
      roastLevel: 'medium',
      flavorTags: [],
      purchaseDate: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(false);
  };

  const toggleFlavorTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      flavorTags: prev.flavorTags.includes(tag)
        ? prev.flavorTags.filter((t) => t !== tag)
        : [...prev.flavorTags, tag],
    }));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-coffee-900">豆袋档案</h1>
            <p className="text-coffee-600 mt-1">管理你的咖啡豆信息</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5 mr-2" />
            添加豆袋
          </Button>
        </div>

        {beans.length === 0 ? (
          <Card className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center">
              <Camera className="w-10 h-10 text-coffee-600" />
            </div>
            <h3 className="font-bold text-coffee-900 mb-2">还没有咖啡豆</h3>
            <p className="text-coffee-600 mb-4">添加你的第一袋咖啡豆，开始记录</p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              添加豆袋
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beans.map((bean) => (
              <Card key={bean.id} className="relative group">
                <button
                  onClick={() => removeBean(bean.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-coffee-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-coffee-900 truncate">{bean.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-coffee-600">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{bean.origin}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 text-xs font-medium bg-coffee-100 text-coffee-700 rounded-lg">
                    {roastLevelLabels[bean.roastLevel]}
                  </span>
                </div>

                {bean.flavorTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {bean.flavorTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-gradient-to-r from-coffee-50 to-cream-100 text-coffee-700 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="添加咖啡豆">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-1">
                豆袋名称 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="例如：耶加雪菲 水洗"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-1">产地</label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                placeholder="例如：埃塞俄比亚"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">烘焙度</label>
              <div className="flex gap-2">
                {(['light', 'medium', 'dark'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, roastLevel: level })}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      formData.roastLevel === level
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    {roastLevelLabels[level]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-2">风味标签</label>
              <div className="flex flex-wrap gap-2">
                {flavorOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleFlavorTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      formData.flavorTags.includes(tag)
                        ? 'bg-gradient-to-r from-coffee-600 to-coffee-700 text-white shadow-lg'
                        : 'bg-coffee-50 text-coffee-700 hover:bg-coffee-100'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-900 mb-1">购买日期</label>
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                className="w-full px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
              >
                取消
              </Button>
              <Button type="submit" className="flex-1">
                保存
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
}