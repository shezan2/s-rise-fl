"use client";

import React, { useState } from 'react';
import { matches, Match } from '@/lib/data/matches';
import { teams } from '@/lib/data/teams';
import MatchRow from '@/components/MatchRow';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type TabState = 'all' | 'live' | 'completed' | 'upcoming';

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<TabState>('all');
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  const filteredMatches = matches.filter(m => {
    if (activeTab !== 'all' && m.status !== activeTab) return false;
    if (selectedTeamId && m.homeTeamId !== selectedTeamId && m.awayTeamId !== selectedTeamId) return false;
    return true;
  });

  const handleMatchClick = (id: string) => {
    setExpandedMatchId(prev => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-transparent text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <header className="space-y-4 text-center">
          <h1 className="font-anton text-4xl md:text-6xl uppercase tracking-wider text-white">
            Matches
          </h1>
          <p className="text-gray-400 text-lg">Results and fixtures for the S-RISE FL.</p>
        </header>

        {/* Filters */}
        <div className="space-y-6">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'live', 'completed', 'upcoming'] as TabState[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-colors",
                  activeTab === tab 
                    ? "bg-primary text-black" 
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Team Chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTeamId(null)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                selectedTeamId === null
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-gray-400 border-white/20 hover:border-white/50"
              )}
            >
              All Teams
            </button>
            {teams.map(team => (
              <button
                key={team.id}
                onClick={() => setSelectedTeamId(team.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                  selectedTeamId === team.id
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-400 border-white/20 hover:border-white/50"
                )}
                style={selectedTeamId === team.id ? { backgroundColor: team.accentColor, borderColor: team.accentColor, color: '#fff' } : {}}
              >
                {team.badgeInitials}
              </button>
            ))}
          </div>
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {filteredMatches.length === 0 ? (
            <div className="p-8 text-center text-gray-500 border border-white/10 rounded-xl bg-black/50">
              No matches found for the selected filters.
            </div>
          ) : (
            filteredMatches.map(match => {
              const homeTeam = teams.find(t => t.id === match.homeTeamId)!;
              const awayTeam = teams.find(t => t.id === match.awayTeamId)!;
              const isExpanded = expandedMatchId === match.id;

              return (
                <div key={match.id} className="border border-white/10 rounded-xl overflow-hidden bg-black/50">
                  <button 
                    className="w-full text-left"
                    onClick={() => handleMatchClick(match.id)}
                  >
                    <MatchRow 
                      match={{
                        id: match.id,
                        homeTeam: { name: homeTeam.name, initials: homeTeam.badgeInitials, accentColor: homeTeam.accentColor },
                        awayTeam: { name: awayTeam.name, initials: awayTeam.badgeInitials, accentColor: awayTeam.accentColor },
                        homeScore: match.homeScore,
                        awayScore: match.awayScore,
                        time: match.time,
                        state: match.status
                      }}
                    />
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="p-4 bg-white/5 border-t border-white/10 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs">Match Info</h4>
                          <p><span className="text-gray-500">Date:</span> {match.date}</p>
                          <p><span className="text-gray-500">Venue:</span> {match.venue}</p>
                          <p><span className="text-gray-500">Attendance:</span> {match.attendance.toLocaleString()}</p>
                          <p><span className="text-gray-500">Referee:</span> {match.referee}</p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs">Events</h4>
                          {match.events.length === 0 ? (
                            <p className="text-gray-500 italic">No events recorded.</p>
                          ) : (
                            <ul className="space-y-1">
                              {match.events.sort((a, b) => a.minute - b.minute).map((event, idx) => {
                                const eventTeam = teams.find(t => t.id === event.teamId)!;
                                return (
                                  <li key={idx} className="flex items-center gap-2">
                                    <span className="text-primary font-bold w-6">{event.minute}'</span>
                                    {event.type === 'goal' && <span className="text-green-400">⚽</span>}
                                    {event.type === 'yellow' && <span className="text-yellow-400">🟨</span>}
                                    {event.type === 'red' && <span className="text-red-500">🟥</span>}
                                    <span className="font-medium">{event.player}</span>
                                    <span className="text-gray-500 text-xs">({eventTeam.badgeInitials})</span>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
