'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = [0],
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      className,
      disabled = false,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const value = controlledValue ?? internalValue;
    const trackRef = React.useRef<HTMLDivElement>(null);
    const isDragging = React.useRef(false);

    const percentage = ((value[0] - min) / (max - min)) * 100;

    const updateValue = React.useCallback(
      (clientX: number) => {
        if (disabled || !trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = min + ratio * (max - min);
        const steppedValue = Math.round(rawValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, steppedValue));
        const newValue = [clampedValue];
        setInternalValue(newValue);
        onValueChange?.(newValue);
      },
      [disabled, min, max, step, onValueChange]
    );

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        updateValue(e.clientX);
      },
      [disabled, updateValue]
    );

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent) => {
        if (!isDragging.current) return;
        updateValue(e.clientX);
      },
      [updateValue]
    );

    const handlePointerUp = React.useCallback(() => {
      isDragging.current = false;
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex w-full touch-none select-none items-center py-2',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          ref={trackRef}
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
        >
          <div
            className="absolute h-full bg-primary rounded-full transition-none"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-grab active:cursor-grabbing"
          style={{ left: `calc(${percentage}% - 10px)` }}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value[0]}
          tabIndex={disabled ? -1 : 0}
        />
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };
