import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, SkipForward, RotateCcw } from 'lucide-react';
import { Layout } from '@/components/Layout/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useAppStore } from '@/store';
import { formatTime } from '@/utils/recommendation';
import type { BrewStage } from '@/types';

export function TimerPage() {
  const navigate = useNavigate();
  const { recommendation, beans, selectedBean } = useAppStore();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const stages: BrewStage[] = recommendation?.stages || [
    { name: '闷蒸', duration: 30, waterAmount: 30 },
    { name: '第一次注水', duration: 45, waterAmount: 90 },
    { name: '第二次注水', duration: 45, waterAmount: 75 },
    { name: '第三次注水', duration: 30, waterAmount: 45 },
  ];

  useEffect(() => {
    if (stages.length > 0 && remainingTime === 0) {
      setRemainingTime(stages[0].duration);
    }
  }, [stages]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTotalElapsed((prev) => prev + 1);
        setRemainingTime((prev) => {
          if (prev <= 1) {
            // 震动提醒
            if ('vibrate' in navigator) {
              navigator.vibrate(200);
            }
            
            const nextStage = currentStage + 1;
            if (nextStage < stages.length) {
              setCurrentStage(nextStage);
              return stages[nextStage].duration;
            } else {
              setIsRunning(false);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, currentStage, stages]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    startTimeRef.current = Date.now();
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleSkip = () => {
    const nextStage = currentStage + 1;
    if (nextStage < stages.length) {
      setCurrentStage(nextStage);
      setRemainingTime(stages[nextStage].duration);
      if ('vibrate' in navigator) {
        navigator.vibrate(100);
      }
    } else {
      setIsRunning(false);
      setRemainingTime(0);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStage(0);
    setTotalElapsed(0);
    if (stages.length > 0) {
      setRemainingTime(stages[0].duration);
    }
  };

  const handleFinish = () => {
    navigate('/records/new');
  };

  const currentStageData = stages[currentStage];
  const progress = currentStageData
    ? ((currentStageData.duration - remainingTime) / currentStageData.duration) * 100
    : 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-coffee-900">冲煮计时器</h1>
          <p className="text-coffee-600 mt-1">跟随节奏，稳定冲煮</p>
        </div>

        {!recommendation && (
          <Card className="text-center py-8 mb-6">
            <p className="text-coffee-600 mb-4">
              未检测到推荐参数，使用默认阶段计时
            </p>
          </Card>
        )}

        {/* Timer Circle */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#efe6d5"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#8b6243"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${progress * 2.827} 282.7`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-coffee-900">
              {formatTime(remainingTime)}
            </span>
            {isRunning && (
              <span className="text-sm text-coffee-600 mt-1">
                总计时 {formatTime(totalElapsed)}
              </span>
            )}
          </div>
        </div>

        {/* Current Stage */}
        {currentStageData && (
          <Card className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-coffee-100 to-cream-200 rounded-full mb-3">
              <span className="text-sm font-medium text-coffee-700">
                阶段 {currentStage + 1} / {stages.length}
              </span>
            </div>
            <h2 className="text-xl font-bold text-coffee-900 mb-2">{currentStageData.name}</h2>
            <p className="text-coffee-600">注水量：{currentStageData.waterAmount}ml</p>
          </Card>
        )}

        {/* Stage Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {stages.map((stage, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index < currentStage
                  ? 'bg-coffee-600'
                  : index === currentStage
                  ? 'bg-coffee-400 scale-125'
                  : 'bg-coffee-200'
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {!isRunning ? (
            <Button onClick={handleStart} size="lg">
              <Play className="w-6 h-6 mr-2" />
              开始计时
            </Button>
          ) : (
            <>
              {!isPaused ? (
                <Button onClick={handlePause} variant="secondary" size="lg">
                  <Pause className="w-5 h-5 mr-2" />
                  暂停
                </Button>
              ) : (
                <Button onClick={handleResume} size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  继续
                </Button>
              )}
              <Button onClick={handleSkip} variant="ghost" size="lg">
                <SkipForward className="w-5 h-5 mr-2" />
                跳过
              </Button>
              <Button onClick={handleReset} variant="ghost" size="lg">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>

        {/* Finish Button */}
        {isRunning && currentStage === stages.length - 1 && remainingTime === 0 && (
          <div className="mt-6">
            <Button onClick={handleFinish} size="lg" className="w-full">
              完成冲煮，记录结果
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}