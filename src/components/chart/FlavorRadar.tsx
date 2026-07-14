import { useState, useRef, useEffect } from 'react';
import type { FlavorProfile } from '@/types';

interface FlavorRadarProps {
  data: FlavorProfile;
  size?: number;
}

export function FlavorRadar({ data, size = 300 }: FlavorRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    const dimensions = [
      { label: '酸度', value: data.acidity },
      { label: '甜度', value: data.sweetness },
      { label: '醇度', value: data.body },
      { label: '苦度', value: data.bitterness },
      { label: '香气', value: data.aroma },
      { label: '余韵', value: data.aftertaste },
    ];

    const angleStep = (2 * Math.PI) / dimensions.length;
    const startAngle = -Math.PI / 2;

    // Draw background circles
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      for (let j = 0; j <= dimensions.length; j++) {
        const angle = startAngle + j * angleStep;
        const r = (radius / 5) * i;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (j === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = '#fed7aa';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw axes
    for (let i = 0; i < dimensions.length; i++) {
      const angle = startAngle + i * angleStep;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      );
      ctx.strokeStyle = '#fed7aa';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw data area
    ctx.beginPath();
    dimensions.forEach((dim, i) => {
      const angle = startAngle + i * angleStep;
      const value = Math.max(0, Math.min(5, dim.value));
      const r = (radius / 5) * value;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();

    // Fill
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(217, 119, 6, 0.4)');
    gradient.addColorStop(1, 'rgba(217, 119, 6, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Stroke
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw labels
    ctx.font = 'bold 14px system-ui';
    ctx.fillStyle = '#92400e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    dimensions.forEach((dim, i) => {
      const angle = startAngle + i * angleStep;
      const labelRadius = radius + 25;
      const x = centerX + labelRadius * Math.cos(angle);
      const y = centerY + labelRadius * Math.sin(angle);

      ctx.fillText(dim.label, x, y);
    });
  }, [data, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="mx-auto"
    />
  );
}