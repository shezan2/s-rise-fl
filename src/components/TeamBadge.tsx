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
    md: 'w-12 h-12 text-2xl',
    lg: 'w-20 h-20 text-3xl md:w-24 md:h-24 md:text-5xl',
  }[size] || 'w-12 h-12 text-2xl';

  if (logoUrl) {
    return (
      <div
        className={cn(
          "rounded-full flex items-center justify-center relative overflow-hidden bg-white/10 border-2",
          sizeClasses,
          className
        )}
        style={{ borderColor: finalAccentColor }}
      >
        <Image src={logoUrl} alt={finalInitials} fill className="object-contain p-2" />
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
