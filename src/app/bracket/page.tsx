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
  const semiFinals = matches.filter(m => m.stage?.startsWith("SF-"));
  const thirdPlace = matches.find(m => m.stage === "3rd Place");
  const final = matches.find(m => m.stage === "S-Rise Final");

  return (
    <div className="min-h-screen bg-transparent pt-12 pb-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-16 text-center">
          <h1 className="font-anton text-5xl md:text-6xl text-white uppercase tracking-wider flex items-center justify-center gap-4 mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
            Tournament Bracket
          </h1>
          <p className="text-neutral-400 text-lg">
            S-Rise Invitational 2026 • 4 July • ActiveSG Sport Village Jurong Town
          </p>
        </div>

        {/* Bracket Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative mt-12">
          
          {/* Connecting Lines for Desktop */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            {/* Top Semi to Final Line */}
            <div className="absolute top-[20%] left-[calc(50%-6rem)] w-[6rem] h-[30%] border-t-2 border-r-2 border-white/20 rounded-tr-xl" />
            {/* Bottom Semi to Final Line */}
            <div className="absolute bottom-[20%] left-[calc(50%-6rem)] w-[6rem] h-[30%] border-b-2 border-r-2 border-white/20 rounded-br-xl" />
            {/* Connector into Final */}
            <div className="absolute top-[50%] left-[50%] w-[4rem] h-[2px] bg-white/20" />
          </div>

          {/* Semifinals Column */}
          <div className="flex flex-col gap-24 z-10 w-full max-w-md">
            {semiFinals.map((match) => (
              <div key={match.id} className="relative group">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600/20 blur-xl rounded-full group-hover:bg-red-600/40 transition-colors" />
                <h3 className="text-red-500 font-anton tracking-wider uppercase mb-3 text-xl relative">
                  {match.stage}
                </h3>
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl relative">
                  <MatchRow match={formatMatch(match)} />
                </div>
              </div>
            ))}
          </div>

          {/* Finals Column */}
          <div className="flex flex-col gap-12 justify-center z-10 w-full max-w-md mt-12 lg:mt-0">
            {final && (
              <div className="relative group">
                <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full group-hover:bg-yellow-500/40 transition-colors" />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-2 rounded-t-xl font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  The Final
                </div>
                <div className="bg-black/80 backdrop-blur-md border-2 border-yellow-500/50 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.15)] relative">
                  <MatchRow match={formatMatch(final)} />
                </div>
              </div>
            )}

            {thirdPlace && (
              <div className="relative group mt-8 lg:mt-16">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-800 text-white px-6 py-1 rounded-t-xl font-bold uppercase tracking-widest text-xs border border-b-0 border-white/10">
                  3rd Place
                </div>
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl relative">
                  <MatchRow match={formatMatch(thirdPlace)} />
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
