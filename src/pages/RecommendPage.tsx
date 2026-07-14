import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Thermometer, Droplets, Settings } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useAppStore } from '@/store';
import { generateRecommendation } from '@/utils/recommendation';

const roastLevelLabels = {
  light: '浅烘',
  medium: '中烘',
  dark: '深烘',
};

export function RecommendPage() {
  const navigate = useNavigate();
  const { beans, equipment, selectedBean, setSelectedBean, setRecommendation } = useAppStore();
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = () => {
    if (!selectedBean) return;

    const recommendation = generateRecommendation(selectedBean);
    setRecommendation(recommendation);
    setShowResult(true);
  };

  const handleStartBrewing = () => {
    navigate('/timer');
  };

  if (beans.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Card className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-coffee-600" />
            </div>
            <h3 className="font-bold text-coffee-900 mb-2">还没有咖啡豆</h3>
            <p className="text-coffee-600 mb-4">请先添加咖啡豆，AI才能为你推荐参数</p>
            <Button onClick={() => navigate('/beans')}>添加豆袋</Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cream-100 to-coffee-200 rounded-full mb-3">
            <Sparkles className="w-5 h-5 text-coffee-600" />
            <span className="font-medium text-coffee-700">AI 智能推荐</span>
          </div>
          <h1 className="text-2xl font-bold text-coffee-900">冲煮参数推荐</h1>
          <p className="text-coffee-600 mt-1">选择你的咖啡豆，AI为你生成最佳参数</p>
        </div>

        {!showResult ? (
          <>
            {/* Bean Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-coffee-900 mb-3">选择咖啡豆</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {beans.map((bean) => (
                  <Card
                    key={bean.id}
                    hover
                    onClick={() => setSelectedBean(bean)}
                    className={`${
                      selectedBean?.id === bean.id
                        ? 'ring-2 ring-coffee-600 bg-coffee-50'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-coffee-100 to-cream-200 flex items-center justify-center">
                        <Droplets className="w-6 h-6 text-coffee-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-coffee-900">{bean.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-coffee-600">
                          <span>{bean.origin}</span>
                          <span>•</span>
                          <span>{roastLevelLabels[bean.roastLevel]}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={!selectedBean}
              size="lg"
              className="w-full"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              生成推荐参数
            </Button>
          </>
        ) : (
          <>
            {/* Recommendation Result */}
            <Card className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-coffee-600" />
                <h2 className="text-lg font-bold text-coffee-900">推荐参数</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-coffee-100 to-cream-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="w-4 h-4 text-coffee-600" />
                    <span className="text-sm text-coffee-600">水温</span>
                  </div>
                  <p className="text-3xl font-bold text-coffee-900">
                    {useAppStore.getState().recommendation?.waterTemp}
                    <span className="text-lg ml-1">℃</span>
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-forest-50 to-forest-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Settings className="w-4 h-4 text-forest-600" />
                    <span className="text-sm text-coffee-600">研磨度</span>
                  </div>
                  <p className="text-3xl font-bold text-coffee-900">
                    {useAppStore.getState().recommendation?.grindSize}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-cream-100 to-coffee-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="w-4 h-4 text-coffee-600" />
                    <span className="text-sm text-coffee-600">粉量</span>
                  </div>
                  <p className="text-3xl font-bold text-coffee-900">
                    {useAppStore.getState().recommendation?.coffeeAmount}
                    <span className="text-lg ml-1">g</span>
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-forest-50 to-cream-100 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="w-4 h-4 text-forest-600" />
                    <span className="text-sm text-coffee-600">总水量</span>
                  </div>
                  <p className="text-3xl font-bold text-coffee-900">
                    {useAppStore.getState().recommendation?.waterAmount}
                    <span className="text-lg ml-1">ml</span>
                  </p>
                </div>
              </div>

              {/* Stages */}
              <div>
                <h3 className="font-bold text-coffee-900 mb-3">注水阶段</h3>
                <div className="space-y-2">
                  {useAppStore.getState().recommendation?.stages.map((stage, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-coffee-50 rounded-lg"
                    >
                      <div>
                        <span className="font-medium text-coffee-900">{stage.name}</span>
                        <p className="text-sm text-coffee-600">
                          注水 {stage.waterAmount}ml
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-coffee-200 text-coffee-800 rounded-full text-sm font-medium">
                        {stage.duration}s
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowResult(false)} className="flex-1">
                重新选择
              </Button>
              <Button onClick={handleStartBrewing} size="lg" className="flex-1">
                开始冲煮
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}