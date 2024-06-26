'use client';

import { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface WordBadgeProps extends HTMLAttributes<HTMLElement> {
  word: string;
}

export default function WordBadge({
  word,
  className,
  onClick,
}: WordBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex h-max w-max gap-1 whitespace-nowrap rounded bg-[#DEEBFF] px-[10px] text-center text-[11px] font-semibold leading-[22px]',
        className,
      )}
    >
      {word}
      <button className={'italic'} onClick={onClick}>
        X
      </button>
    </div>
  );
}
