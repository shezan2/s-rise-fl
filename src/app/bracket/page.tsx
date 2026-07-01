"use client";

import React from "react";
import { matches } from "@/lib/data/matches";
import { teams } from "@/lib/data/teams";
import MatchRow, { MatchData } from "@/components/MatchRow";
import { Crown } from "lucide-react";
import { motion } from "framer-motion";

function formatMatch(m: any): MatchData {
  const homeTeam = teams.find((t) => t.id === m.homeTeamId);
  const awayTeam = teams.find((t) => t.id === m.awayTeamId);
  
  const isUnconfirmed = m.stage === "S-Rise Final" || m.stage === "3rd Place";
  
  return {
    id: m.id,
    homeTeam: homeTeam && !isUnconfirmed ? { name: homeTeam.name, initials: homeTeam.badgeInitials, accentColor: homeTeam.accentColor } : { name: "TBD", initials: "?", accentColor: "#333" },
    awayTeam: awayTeam && !isUnconfirmed ? { name: awayTeam.name, initials: awayTeam.badgeInitials, accentColor: awayTeam.accentColor } : { name: "TBD", initials: "?", accentColor: "#333" },
    homeScore: isUnconfirmed ? undefined : m.homeScore,
    awayScore: isUnconfirmed ? undefined : m.awayScore,
    time: m.time,
    state: isUnconfirmed ? "upcoming" : m.status,
    stage: m.stage,
  };
}

export default function BracketPage() {
  const semiFinals = matches.filter(m => m.stage?.startsWith("SF-"));
  const thirdPlace = matches.find(m => m.stage === "3rd Place");
  const final = matches.find(m => m.stage === "S-Rise Final");

  return (
    <div className="min-h-screen bg-transparent pt-12 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h1 className="font-anton text-4xl md:text-6xl text-white uppercase tracking-wider flex items-center justify-center gap-2 md:gap-4 mb-4">
            Tournament Bracket
          </h1>
          <p className="text-neutral-400 text-sm md:text-lg">
            S-Rise Invitational 2026 • 4 July • ActiveSG Sport Village
          </p>
        </motion.div>

        {/* Bracket Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative mt-8 md:mt-12">
          
          {/* Connecting Lines for Desktop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="hidden lg:block absolute inset-0 pointer-events-none"
          >
            {/* Top Semi to Final Line */}
            <div className="absolute top-[20%] left-[calc(50%-6rem)] w-[6rem] h-[30%] border-t-[0.5px] border-r-[0.5px] border-white/20 rounded-tr-xl" />
            {/* Bottom Semi to Final Line */}
            <div className="absolute bottom-[20%] left-[calc(50%-6rem)] w-[6rem] h-[30%] border-b-[0.5px] border-r-[0.5px] border-white/20 rounded-br-xl" />
            {/* Connector into Final */}
            <div className="absolute top-[50%] left-[50%] w-[4rem] h-[0.5px] bg-white/20" />
          </motion.div>

          {/* Semifinals Column */}
          <div className="flex flex-col gap-12 md:gap-24 z-10 w-full max-w-md">
            {semiFinals.map((match, idx) => (
              <motion.div 
                key={match.id} 
                className="relative group"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <h3 className="text-[#eab308] font-anton tracking-widest uppercase mb-3 text-lg md:text-xl relative text-center lg:text-left">
                  {match.stage}
                </h3>
                <div className="bg-black/40 backdrop-blur-md border-[0.5px] border-red-600/30 rounded-xl overflow-hidden relative transition-transform duration-300 hover:border-red-500/50">
                  <MatchRow match={formatMatch(match)} posterStyle={true} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Finals Column */}
          <div className="flex flex-col gap-10 md:gap-12 justify-center z-10 w-full max-w-md mt-6 lg:mt-0">
            {final && (
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <Crown className="w-6 h-6 md:w-8 md:h-8 text-[#eab308] fill-[#eab308] mb-1" />
                  <div className="text-[#eab308] font-anton uppercase tracking-widest text-lg md:text-xl whitespace-nowrap">
                    S-Rise Final
                  </div>
                </div>
                <div className="bg-black/60 backdrop-blur-md border-[0.5px] border-red-600/30 rounded-xl overflow-hidden relative transition-transform duration-300 hover:border-red-500/50 z-20">
                  <MatchRow match={formatMatch(final)} posterStyle={true} />
                </div>
              </motion.div>
            )}

            {thirdPlace && (
              <motion.div 
                className="relative group mt-6 lg:mt-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#eab308] font-anton uppercase tracking-widest text-lg md:text-xl whitespace-nowrap">
                  3rd Place
                </div>
                <div className="bg-black/40 backdrop-blur-md border-[0.5px] border-red-600/30 rounded-xl overflow-hidden relative transition-transform duration-300 hover:border-red-500/50">
                  <MatchRow match={formatMatch(thirdPlace)} posterStyle={true} />
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
