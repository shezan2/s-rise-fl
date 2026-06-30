"use client";

import React from "react";
import { matches } from "@/lib/data/matches";
import { teams } from "@/lib/data/teams";
import MatchRow, { MatchData } from "@/components/MatchRow";
import { Trophy } from "lucide-react";

function formatMatch(m: any): MatchData {
  const homeTeam = teams.find((t) => t.id === m.homeTeamId);
  const awayTeam = teams.find((t) => t.id === m.awayTeamId);
  
  return {
    id: m.id,
    homeTeam: homeTeam ? { name: homeTeam.name, initials: homeTeam.badgeInitials, accentColor: homeTeam.accentColor } : { name: "TBD", initials: "?", accentColor: "#666" },
    awayTeam: awayTeam ? { name: awayTeam.name, initials: awayTeam.badgeInitials, accentColor: awayTeam.accentColor } : { name: "TBD", initials: "?", accentColor: "#666" },
    homeScore: m.homeScore,
    awayScore: m.awayScore,
    time: m.time,
    state: m.status,
    stage: m.stage,
  };
}

export default function BracketPage() {
  const semiFinals = matches.filter(m => m.stage?.startsWith("Semifinal"));
  const final = matches.find(m => m.stage === "Final");

  return (
    <div className="min-h-screen bg-black pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 text-center">
          <h1 className="font-anton text-5xl md:text-6xl text-white uppercase tracking-wider flex items-center justify-center gap-4 mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
            Tournament Bracket
          </h1>
          <p className="text-neutral-400 text-lg">
            The road to glory. Single-day knockout event.
          </p>
        </div>

        {/* Bracket Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 relative mt-12">
          
          {/* Connecting Lines for Desktop */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {/* Top Semi to Final Line */}
            <div className="absolute top-[20%] left-[calc(50%-6rem)] w-[6rem] h-[30%] border-t-2 border-r-2 border-white/20 rounded-tr-xl" />
            {/* Bottom Semi to Final Line */}
            <div className="absolute bottom-[20%] left-[calc(50%-6rem)] w-[6rem] h-[30%] border-b-2 border-r-2 border-white/20 rounded-br-xl" />
            {/* Connector into Final */}
            <div className="absolute top-[50%] left-[50%] w-[4rem] h-[2px] bg-white/20" />
          </div>

          {/* Semifinals Column */}
          <div className="flex flex-col gap-24 z-10 w-full max-w-md">
            {semiFinals.map((match, idx) => (
              <div key={match.id} className="relative">
                <h3 className="text-yellow-500 font-anton tracking-wider uppercase mb-3 text-xl">
                  {match.stage || `Semifinal ${idx + 1}`}
                </h3>
                <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
                  <MatchRow match={formatMatch(match)} />
                </div>
              </div>
            ))}
          </div>

          {/* Final Column */}
          <div className="flex flex-col justify-center z-10 w-full max-w-md mt-12 md:mt-0">
            {final && (
              <div className="relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-2 rounded-t-xl font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  The Final
                </div>
                <div className="bg-neutral-900 border-2 border-yellow-500/50 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.15)] relative">
                  <MatchRow match={formatMatch(final)} />
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
