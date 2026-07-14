import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, onChange, readonly = false, size = 'md' }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (value: number) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = (hoverRating || rating) >= value;
        return (
          <button
            key={value}
            type="button"
            className={`${readonly ? 'cursor-default' : 'cursor-pointer'} transition-transform hover:scale-110`}
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
          >
            <Star
              className={`${sizes[size]} ${
                isFilled
                  ? 'fill-coffee-500 text-coffee-500'
                  : 'fill-transparent text-coffee-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}