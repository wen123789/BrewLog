import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className, onClick, hover = false }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-2xl p-5 shadow-sm border border-coffee-200',
          hover && 'hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer',
          onClick && 'cursor-pointer',
          className
        )
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}