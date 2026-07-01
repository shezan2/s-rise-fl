import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TeamBadgeProps {
  initials: string;
  accentColor?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | string;
}

export default function TeamBadge({ initials, accentColor, className, size = 'md' }: TeamBadgeProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-20 h-20 text-3xl md:w-24 md:h-24 md:text-5xl',
  }[size] || 'w-12 h-12 text-2xl';

  return (
    <div
      className={cn(
        "flex items-center justify-center font-anton font-bold bg-background text-foreground",
        "border-2",
        sizeClasses,
        className
      )}
      style={{ borderColor: accentColor }}
    >
      {initials}
    </div>
  );
}
