import React from 'react';
import { teams } from '@/lib/data/teams';
import Link from 'next/link';
import TeamBadge from '@/components/TeamBadge';

export default function TeamsPage() {
  // Sort teams by position
  const sortedTeams = [...teams].sort((a, b) => a.position - b.position);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="font-anton text-5xl md:text-7xl uppercase tracking-wider text-white">
            Clubs
          </h1>
          <p className="text-gray-400 text-lg">The 8 founding clubs of the S-RISE FL.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedTeams.map((team) => (
            <Link 
              key={team.id} 
              href={`/teams/${team.id}`}
              className="group relative block bg-black border border-white/10 rounded-2xl p-6 overflow-hidden hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background gradient effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(to bottom right, ${team.accentColor}, transparent)` }}
              />

              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="absolute top-0 right-0 text-3xl font-anton opacity-20 group-hover:opacity-100 transition-opacity duration-300" style={{ color: team.accentColor }}>
                  #{team.position}
                </div>
                
                <TeamBadge initials={team.badgeInitials} accentColor={team.accentColor} size="lg" />
                
                <div>
                  <h2 className="font-anton text-2xl uppercase tracking-wider">{team.name}</h2>
                  <p className="text-gray-400 font-medium text-sm">{team.city}</p>
                </div>

                <div className="w-full pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Points</span>
                  <span className="font-anton text-xl">{team.points}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
