import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import TeamBadge from './TeamBadge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type MatchState = 'upcoming' | 'live' | 'completed';

export interface MatchData {
  id: string;
  homeTeam: { name: string; initials: string; accentColor?: string };
  awayTeam: { name: string; initials: string; accentColor?: string };
  homeScore?: number;
  awayScore?: number;
  time: string;
  stage?: string;
  state: MatchState;
}

interface MatchRowProps {
  match: MatchData;
  className?: string;
}

export default function MatchRow({ match, className }: MatchRowProps) {
  return (
    <div className={cn("flex items-center justify-between p-4 border-b border-white/10 bg-black hover:bg-white/5 transition-colors", className)}>
      <div className="flex items-center gap-4 flex-1">
        <TeamBadge initials={match.homeTeam.initials} accentColor={match.homeTeam.accentColor} />
        <span className="font-sans font-bold text-lg hidden sm:block truncate">{match.homeTeam.name}</span>
      </div>
      
      <div className="flex flex-col items-center justify-center min-w-[120px]">
        {match.state === 'live' && (
          <span className="text-primary text-sm font-bold animate-pulse mb-1 tracking-widest">LIVE</span>
        )}
        {(match.state === 'completed' || match.state === 'live') && match.stage && (
          <span className="text-gray-400 font-sans font-medium text-xs mb-1 uppercase tracking-widest">{match.stage}</span>
        )}
        {match.state === 'upcoming' && (
          <span className="text-gray-400 font-sans font-medium text-sm text-center">
            {match.stage && <span className="block text-xs uppercase tracking-widest mb-1">{match.stage}</span>}
            {match.time}
          </span>
        )}
        {(match.state === 'completed' || match.state === 'live') && (
          <div className="font-anton text-3xl flex items-center gap-2">
            <span>{match.homeScore ?? 0}</span>
            <span className="text-gray-500">-</span>
            <span>{match.awayScore ?? 0}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end text-right">
        <span className="font-sans font-bold text-lg hidden sm:block truncate">{match.awayTeam.name}</span>
        <TeamBadge initials={match.awayTeam.initials} accentColor={match.awayTeam.accentColor} />
      </div>
    </div>
  );
}
