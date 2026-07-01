"use client";

import React from "react";
import { matches } from "@/lib/data/matches";
import { teams } from "@/lib/data/teams";
import MatchRow, { MatchData } from "@/components/MatchRow";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

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
            <Trophy className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />
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
                <h3 className="text-zinc-500 font-anton tracking-widest uppercase mb-3 text-lg md:text-xl relative">
                  {match.stage}
                </h3>
                <div className="bg-black/40 backdrop-blur-md border-[0.5px] border-white/10 rounded-xl overflow-hidden relative transition-transform duration-300 hover:border-white/30">
                  <MatchRow match={formatMatch(match)} />
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
                <div className="absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-t-xl font-bold uppercase tracking-widest text-xs md:text-sm">
                  The Final
                </div>
                <div className="bg-black/60 backdrop-blur-md border-[0.5px] border-white/20 rounded-xl overflow-hidden relative transition-transform duration-300 hover:border-white/40 z-20">
                  <MatchRow match={formatMatch(final)} />
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
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-800 text-white px-6 py-1 rounded-t-xl font-bold uppercase tracking-widest text-[10px] md:text-xs border-[0.5px] border-b-0 border-white/10">
                  3rd Place
                </div>
                <div className="bg-black/40 backdrop-blur-md border-[0.5px] border-white/10 rounded-xl overflow-hidden relative transition-transform duration-300 hover:border-white/30">
                  <MatchRow match={formatMatch(thirdPlace)} />
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
