"use client";

import { useState, useMemo } from "react";
import { players, Player } from "@/lib/data/players";
import { teams } from "@/lib/data/teams";
import Link from "next/link";
import { ArrowDown, ArrowUp, ChevronRight, Trophy } from "lucide-react";

type SortField = "goals" | "assists" | "apps";
type SortOrder = "asc" | "desc";

export default function StatsPage() {
  const [topMode, setTopMode] = useState<"goals" | "assists">("goals");
  const [sortField, setSortField] = useState<SortField>("goals");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const getTeam = (teamId: string) => teams.find(t => t.id === teamId);

  const topPerformers = useMemo(() => {
    return [...players]
      .sort((a, b) => b[topMode] - a[topMode])
      .slice(0, 3);
  }, [topMode]);

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? <ArrowUp className="w-4 h-4 ml-1 inline" /> : <ArrowDown className="w-4 h-4 ml-1 inline" />;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">League Stats</h1>
            <p className="text-zinc-400 mt-2 text-lg">Comprehensive player performance data</p>
          </div>
        </div>

        {/* Top Performers Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold uppercase tracking-tight flex items-center gap-3">
              <Trophy className="text-amber-500 w-8 h-8" />
              Top Performers
            </h2>
            <div className="flex bg-zinc-900 rounded-full p-1 border border-white/10">
              <button 
                onClick={() => setTopMode("goals")}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-colors ${topMode === "goals" ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"}`}
              >
                Top Scorers
              </button>
              <button 
                onClick={() => setTopMode("assists")}
                className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-colors ${topMode === "assists" ? "bg-red-600 text-white" : "text-zinc-400 hover:text-white"}`}
              >
                Top Assisters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* 2nd Place */}
            {topPerformers[1] && (
              <Link href={`/players/${topPerformers[1].id}`} className="group block order-2 md:order-1 transform transition hover:-translate-y-2">
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[280px] flex flex-col justify-end">
                  <div className="absolute top-4 right-4 text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors">2</div>
                  <div className="relative z-10">
                    <span className="text-3xl font-black text-amber-400 block mb-1">{topPerformers[1][topMode]}</span>
                    <span className="text-sm text-zinc-500 uppercase font-bold tracking-wider block mb-4">{topMode}</span>
                    <h3 className="text-2xl font-bold">{topPerformers[1].name}</h3>
                    <p className="text-zinc-400">{getTeam(topPerformers[1].teamId)?.name}</p>
                  </div>
                </div>
              </Link>
            )}

            {/* 1st Place */}
            {topPerformers[0] && (
              <Link href={`/players/${topPerformers[0].id}`} className="group block order-1 md:order-2 transform transition hover:-translate-y-2">
                <div className="bg-gradient-to-t from-red-950 to-zinc-900 border border-red-500/30 rounded-2xl p-8 relative overflow-hidden h-[320px] flex flex-col justify-end ring-1 ring-inset ring-white/10 shadow-2xl shadow-red-900/20">
                  <div className="absolute top-4 right-4 text-8xl font-black text-white/5 group-hover:text-white/10 transition-colors">1</div>
                  <div className="relative z-10">
                    <span className="text-5xl font-black text-amber-400 block mb-2">{topPerformers[0][topMode]}</span>
                    <span className="text-sm text-zinc-400 uppercase font-bold tracking-wider block mb-6">{topMode}</span>
                    <h3 className="text-3xl font-bold">{topPerformers[0].name}</h3>
                    <p className="text-zinc-300">{getTeam(topPerformers[0].teamId)?.name}</p>
                  </div>
                </div>
              </Link>
            )}

            {/* 3rd Place */}
            {topPerformers[2] && (
              <Link href={`/players/${topPerformers[2].id}`} className="group block order-3 transform transition hover:-translate-y-2">
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[260px] flex flex-col justify-end">
                  <div className="absolute top-4 right-4 text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors">3</div>
                  <div className="relative z-10">
                    <span className="text-3xl font-black text-amber-600 block mb-1">{topPerformers[2][topMode]}</span>
                    <span className="text-sm text-zinc-500 uppercase font-bold tracking-wider block mb-4">{topMode}</span>
                    <h3 className="text-xl font-bold">{topPerformers[2].name}</h3>
                    <p className="text-zinc-400">{getTeam(topPerformers[2].teamId)?.name}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>

        {/* Leaderboard Table */}
        <section>
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-6">Player Leaderboard</h2>
          <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40 text-sm uppercase tracking-wider text-zinc-400">
                    <th className="p-4 font-bold">Rank</th>
                    <th className="p-4 font-bold">Player</th>
                    <th className="p-4 font-bold">Team</th>
                    <th className="p-4 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("goals")}>
                      Goals <SortIcon field="goals" />
                    </th>
                    <th className="p-4 font-bold cursor-pointer hover:text-white transition-colors" onClick={() => handleSort("assists")}>
                      Assists <SortIcon field="assists" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sortedPlayers.map((player, index) => {
                    const team = getTeam(player.teamId);
                    return (
                      <tr key={player.id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-4 font-bold text-zinc-500">{index + 1}</td>
                        <td className="p-4">
                          <Link href={`/players/${player.id}`} className="font-bold hover:text-red-400 transition-colors flex items-center gap-2">
                            {player.name}
                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </td>
                        <td className="p-4 text-zinc-300">
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: team?.accentColor || '#ccc' }}
                            />
                            {team?.name}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-white">{player.goals}</td>
                        <td className="p-4 text-zinc-300">{player.assists}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
