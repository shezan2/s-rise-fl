"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Trophy } from "lucide-react";
import { teams } from "@/lib/data/teams";
import { matches } from "@/lib/data/matches";
import MatchRow, { MatchData } from "@/components/MatchRow";
import TeamBadge from "@/components/TeamBadge";
import { motion } from "framer-motion";

export default function Home() {
  const upcomingMatches = matches
    .filter((m) => m.status === "upcoming" || m.status === "live")
    .slice(0, 2)
    .map((m): MatchData => {
      const homeTeam = teams.find((t) => t.id === m.homeTeamId)!;
      const awayTeam = teams.find((t) => t.id === m.awayTeamId)!;
      return {
        id: m.id,
        homeTeam: { name: homeTeam.name, initials: homeTeam.badgeInitials, accentColor: homeTeam.accentColor },
        awayTeam: { name: awayTeam.name, initials: awayTeam.badgeInitials, accentColor: awayTeam.accentColor },
        time: m.time,
        state: "upcoming",
      };
    });

  const showcaseTeams = teams.slice(0, 4);

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[100dvh] flex flex-col justify-center items-center w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 pointer-events-none" />
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center"
          initial="hidden" animate="show" variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="w-52 h-52 md:w-72 md:h-72 mb-6 relative">
            <img src="/crest-logo.png" alt="S-Rise FL Logo" className="w-full h-full object-contain" />
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="font-anton text-5xl md:text-7xl tracking-tight uppercase mb-4">
            <span className="text-white">S-Rise </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              FL
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="font-sans text-sm md:text-lg text-zinc-400 font-bold uppercase tracking-[0.3em] px-4 mt-2">
            Drama. Passion. Glory.
          </motion.p>
        </motion.div>
      </section>

      <div className="relative w-full">
        {/* Seamless transition gradient */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/90 to-transparent pointer-events-none -mt-1 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-24 relative z-10">
        {/* Upcoming Fixtures */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-12"
        >
          <section className="flex flex-col items-center">
            <h2 className="font-anton text-2xl md:text-3xl text-white uppercase tracking-wider flex items-center gap-3 mb-6">
              <CalendarDays className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
              Next Fixtures
            </h2>
            <div className="flex flex-col gap-4 w-full">
              {upcomingMatches.map((match) => (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  key={match.id} 
                  className="border border-white/10 rounded-xl overflow-hidden w-full"
                >
                  <MatchRow match={match} />
                </motion.div>
              ))}
            </div>
            <Link href="/matches" className="self-end mt-6 text-[9px] md:text-[10px] text-red-500 hover:text-red-400 font-bold uppercase tracking-wider">
              All Matches →
            </Link>
          </section>
        </motion.div>

        {/* Featured Teams Grid */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-anton text-3xl text-white uppercase tracking-wider mb-8 text-center">
            Featured Clubs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseTeams.map((team, idx) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link href="/teams" className="block h-full group relative overflow-hidden bg-neutral-900/50 backdrop-blur-sm border-[0.5px] border-white/10 p-6 rounded-xl transition-all hover:border-white/30 hover:-translate-y-1">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <TeamBadge initials={team.badgeInitials} accentColor={team.accentColor} size="lg" className="mb-4" />
                    <h3 className="font-anton text-2xl mb-1">{team.name}</h3>
                    <p className="text-sm text-neutral-400">{team.stadiumName}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
    </div>
  );
}
