import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { teams } from '@/lib/data/teams';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TeamBadgeProps {
  teamId?: string;
  initials?: string;
  accentColor?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | string;
}

export default function TeamBadge({ teamId, initials, accentColor, className, size = 'md' }: TeamBadgeProps) {
  const team = teamId ? teams.find(t => t.id === teamId) : null;
  const finalInitials = team?.badgeInitials || initials || '?';
  const finalAccentColor = team?.accentColor || accentColor || '#333';
  const logoUrl = team?.logoUrl;

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-[58px] h-[58px] text-3xl md:w-16 md:h-16 md:text-4xl',
    lg: 'w-20 h-20 text-3xl md:w-24 md:h-24 md:text-5xl',
    xl: 'w-32 h-32 text-4xl md:w-48 md:h-48 md:text-6xl',
    '2xl': 'w-48 h-48 text-5xl md:w-64 md:h-64 md:text-7xl',
  }[size] || 'w-[58px] h-[58px] text-3xl md:w-16 md:h-16 md:text-4xl';

  if (logoUrl) {
    return (
      <div
        className={cn(
          "flex items-center justify-center relative",
          sizeClasses,
          className
        )}
      >
        <Image src={logoUrl} alt={finalInitials} fill className="object-contain" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center font-anton font-bold bg-background text-foreground",
        "border-2 rounded-full",
        sizeClasses,
        className
      )}
      style={{ borderColor: finalAccentColor }}
    >
      {finalInitials}
    </div>
  );
}
