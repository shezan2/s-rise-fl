"use client";

import React from "react";
import { matches } from "@/lib/data/matches";
import { teams } from "@/lib/data/teams";
import { Crown } from "lucide-react";
import { motion } from "framer-motion";

export default function BracketPage() {
  const sf1 = matches.find(m => m.stage === "SF-1") || matches.find(m => m.stage === "Semifinal 1");
  const sf2 = matches.find(m => m.stage === "SF-2") || matches.find(m => m.stage === "Semifinal 2");
  const thirdPlace = matches.find(m => m.stage === "3rd Place");
  const final = matches.find(m => m.stage === "S-Rise Final") || matches.find(m => m.stage === "Final");

  const formatMatchTitle = (m: any) => {
    if (!m) return "TBD VS TBD";
    if (m.stage === "S-Rise Final" || m.stage === "Final") return "WINNER SF-1 VS WINNER SF-2";
    if (m.stage === "3rd Place") return "LOSER SF-1 VS LOSER SF-2";
    const homeTeam = teams.find((t) => t.id === m.homeTeamId);
    const awayTeam = teams.find((t) => t.id === m.awayTeamId);
    return `${homeTeam?.name || "TBD"} VS ${awayTeam?.name || "TBD"}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-transparent pt-12 pb-24 relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/30 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Final */}
        <motion.div 
          className="flex flex-col items-center justify-center w-full mt-4 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Crown className="w-10 h-10 md:w-12 md:h-12 text-[#eab308] mb-4 fill-[#eab308]" />
          
          <div className="border border-red-600/60 bg-red-950/40 px-12 py-2 mb-6 rounded-sm shadow-inner shadow-red-500/20">
            <span className="font-anton text-[#eab308] text-xl md:text-2xl tracking-widest uppercase">S-Rise Final</span>
          </div>

          <div className="border border-red-600/60 bg-red-950/40 w-full py-10 md:py-14 rounded-sm flex flex-col items-center justify-center px-6 shadow-[0_0_40px_rgba(220,38,38,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent pointer-events-none" />
            <div className="font-anton text-[#eab308] text-2xl md:text-4xl tracking-widest text-center relative z-10">{formatMatchTitle(final)}</div>
            <div className="text-gray-300 text-xs md:text-sm font-sans tracking-widest mt-3 md:mt-4 text-center uppercase relative z-10">4:00PM - 4:40PM</div>
          </div>
        </motion.div>

        {/* Semi Finals & 3rd Place */}
        <motion.div 
          className="grid grid-cols-[auto_1fr] gap-x-4 md:gap-x-8 gap-y-6 md:gap-y-8 items-center w-full mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* SF-1 */}
          <div className="text-[#eab308] font-anton text-xl md:text-3xl tracking-widest text-right">SF-1</div>
          <div className="border border-red-600/60 bg-red-950/40 py-5 md:py-8 px-4 rounded-sm flex flex-col items-center justify-center shadow-inner shadow-red-500/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
            <div className="font-anton text-[#eab308] text-lg md:text-2xl tracking-widest text-center relative z-10">{formatMatchTitle(sf1)}</div>
            <div className="text-gray-300 text-[10px] md:text-xs font-sans tracking-widest mt-1 md:mt-2 text-center uppercase relative z-10">1:35PM - 2:15PM</div>
          </div>
          
          {/* SF-2 */}
          <div className="text-[#eab308] font-anton text-xl md:text-3xl tracking-widest text-right">SF-2</div>
          <div className="border border-red-600/60 bg-red-950/40 py-5 md:py-8 px-4 rounded-sm flex flex-col items-center justify-center shadow-inner shadow-red-500/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
            <div className="font-anton text-[#eab308] text-lg md:text-2xl tracking-widest text-center relative z-10">{formatMatchTitle(sf2)}</div>
            <div className="text-gray-300 text-[10px] md:text-xs font-sans tracking-widest mt-1 md:mt-2 text-center uppercase relative z-10">2:20PM - 3:00PM</div>
          </div>

          {/* 3RD PLACE */}
          <div className="text-[#eab308] font-anton text-xl md:text-3xl tracking-widest text-right max-w-[60px] md:max-w-[100px] leading-tight">3RD<br/>PLACE</div>
          <div className="border border-red-600/60 bg-red-950/40 py-5 md:py-8 px-4 rounded-sm flex flex-col items-center justify-center shadow-inner shadow-red-500/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
            <div className="font-anton text-[#eab308] text-lg md:text-2xl tracking-widest text-center relative z-10">{formatMatchTitle(thirdPlace)}</div>
            <div className="text-gray-300 text-[10px] md:text-xs font-sans tracking-widest mt-1 md:mt-2 text-center uppercase relative z-10">3:10PM - 3:50PM</div>
          </div>
        </motion.div>

        <motion.div 
          className="mt-16 md:mt-24 text-center text-gray-500 text-[10px] md:text-xs tracking-widest uppercase font-sans font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Timings subject to change
        </motion.div>

      </div>
    </div>
  );
}
