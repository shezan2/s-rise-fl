import React from 'react';
import { teams } from '@/lib/data/teams';
import Link from 'next/link';
import TeamBadge from '@/components/TeamBadge';

export default function TeamsPage() {
  const sortedTeams = [...teams];

  return (
    <div className="min-h-screen bg-transparent text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <header className="space-y-4 text-center">
          <h1 className="font-anton text-4xl md:text-6xl uppercase tracking-wider text-white">
            Clubs
          </h1>
          <p className="text-gray-400 text-lg">The 4 founding clubs of the S-RISE FL.</p>
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
                <TeamBadge teamId={team.id} initials={team.badgeInitials} accentColor={team.accentColor} size="xl" />
                <div className="text-center mt-6 relative z-10 flex flex-col items-center flex-1">
                  <h2 className="font-anton text-3xl md:text-4xl mb-1 tracking-wider">{team.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
