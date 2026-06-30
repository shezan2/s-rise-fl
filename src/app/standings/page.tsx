"use client";

import React, { useState } from "react";
import { teams, Team } from "@/lib/data/teams";
import TeamBadge from "@/components/TeamBadge";
import { Trophy, ArrowUpDown, Info } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type SortKey = keyof Team;
type SortOrder = "asc" | "desc";

export default function StandingsPage() {
  const [sortKey, setSortKey] = useState<SortKey>("position");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc"); // Default to desc for most football stats, except position
    }
  };

  const sortedTeams = [...teams].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  // Generate mock cumulative points data for the chart
  const matchdays = [1, 5, 10, 15, 20, 25, 26];
  const chartData = matchdays.map((md, idx) => {
    const dataPoint: any = { matchday: `MD ${md}` };
    teams.forEach(team => {
      // Very simple mock progression logic to reach their current points
      const progressRatio = (idx + 1) / matchdays.length;
      // Add a tiny bit of random noise for realism, but ensure it ends exactly at their points
      const noise = idx === matchdays.length - 1 ? 0 : Math.floor(Math.random() * 3) - 1;
      let pointsAtMd = Math.round(team.points * progressRatio) + noise;
      if (pointsAtMd < 0) pointsAtMd = 0;
      dataPoint[team.name] = pointsAtMd;
    });
    return dataPoint;
  });

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <ArrowUpDown className="w-3 h-3 opacity-30" />;
    return <ArrowUpDown className={`w-3 h-3 ${sortOrder === 'asc' ? 'text-yellow-500' : 'text-yellow-500 rotate-180'}`} />;
  };

  return (
    <div className="min-h-screen bg-black pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10">
          <h1 className="font-anton text-5xl md:text-6xl text-white uppercase tracking-wider flex items-center gap-4 mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
            League Standings
          </h1>
          <p className="text-neutral-400 text-lg">
            Current rankings for the 2025/26 season.
          </p>
        </div>

        <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden mb-16 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-neutral-950 border-b border-white/10 text-neutral-400 text-xs uppercase tracking-wider select-none">
                  <th className="p-4 font-semibold w-16 text-center cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('position')}>
                    <div className="flex items-center justify-center gap-1"># {renderSortIcon('position')}</div>
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">Club {renderSortIcon('name')}</div>
                  </th>
                  <th className="p-4 font-semibold text-center cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('played')}>
                    <div className="flex items-center justify-center gap-1">P {renderSortIcon('played')}</div>
                  </th>
                  <th className="p-4 font-semibold text-center cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('won')}>
                    <div className="flex items-center justify-center gap-1">W {renderSortIcon('won')}</div>
                  </th>
                  <th className="p-4 font-semibold text-center cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('drawn')}>
                    <div className="flex items-center justify-center gap-1">D {renderSortIcon('drawn')}</div>
                  </th>
                  <th className="p-4 font-semibold text-center cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('lost')}>
                    <div className="flex items-center justify-center gap-1">L {renderSortIcon('lost')}</div>
                  </th>
                  <th className="p-4 font-semibold text-center cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('goalsFor')}>
                    <div className="flex items-center justify-center gap-1">GF {renderSortIcon('goalsFor')}</div>
                  </th>
                  <th className="p-4 font-semibold text-center cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('goalsAgainst')}>
                    <div className="flex items-center justify-center gap-1">GA {renderSortIcon('goalsAgainst')}</div>
                  </th>
                  <th className="p-4 font-semibold text-center cursor-pointer hover:bg-white/5 transition-colors" onClick={() => handleSort('goalDifference')}>
                    <div className="flex items-center justify-center gap-1">GD {renderSortIcon('goalDifference')}</div>
                  </th>
                  <th className="p-4 font-semibold text-center cursor-pointer hover:bg-white/5 transition-colors bg-white/5" onClick={() => handleSort('points')}>
                    <div className="flex items-center justify-center gap-1 text-white">PTS {renderSortIcon('points')}</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {sortedTeams.map((team, idx) => {
                  const isTop4 = sortKey === 'position' && sortOrder === 'asc' && idx === 3;
                  
                  return (
                    <React.Fragment key={team.id}>
                      <tr className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-anton text-xl text-center">
                          <span className={idx < 4 && sortKey === 'position' && sortOrder === 'asc' ? "text-yellow-500" : "text-white"}>
                            {team.position}
                          </span>
                        </td>
                        <td className="p-4 font-bold flex items-center gap-4">
                          <TeamBadge initials={team.badgeInitials} accentColor={team.accentColor} className="w-8 h-8 text-sm" />
                          <span className="text-base">{team.name}</span>
                        </td>
                        <td className="p-4 text-neutral-400 text-center">{team.played}</td>
                        <td className="p-4 text-neutral-300 text-center">{team.won}</td>
                        <td className="p-4 text-neutral-300 text-center">{team.drawn}</td>
                        <td className="p-4 text-neutral-300 text-center">{team.lost}</td>
                        <td className="p-4 text-neutral-400 text-center">{team.goalsFor}</td>
                        <td className="p-4 text-neutral-400 text-center">{team.goalsAgainst}</td>
                        <td className="p-4 font-medium text-center text-neutral-300">
                          {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                        </td>
                        <td className="p-4 font-bold text-center text-lg bg-white/5 text-white">
                          {team.points}
                        </td>
                      </tr>
                      {isTop4 && (
                        <tr>
                          <td colSpan={10} className="p-0 border-b border-white/10 relative h-1 bg-yellow-500/10">
                            <div className="absolute inset-x-0 h-[1px] bg-yellow-500"></div>
                            <div className="flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider text-yellow-500">
                              <Info className="w-4 h-4" />
                              Top 4 — Cup Qualification
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-neutral-900 border border-white/10 rounded-xl p-6 shadow-xl">
          <h2 className="font-anton text-2xl text-white uppercase tracking-wider mb-8 flex items-center gap-3">
            Points Progression
          </h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="matchday" 
                  stroke="#888" 
                  tick={{ fill: '#888', fontSize: 12 }} 
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#888" 
                  tick={{ fill: '#888', fontSize: 12 }} 
                  tickMargin={10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                />
                {teams.map((team) => (
                  <Line
                    key={team.id}
                    type="monotone"
                    dataKey={team.name}
                    stroke={team.accentColor}
                    strokeWidth={2}
                    dot={{ r: 3, fill: team.accentColor, strokeWidth: 0 }}
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
