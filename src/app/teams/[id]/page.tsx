import { notFound } from 'next/navigation';
import { teams } from '@/lib/data/teams';
import { players } from '@/lib/data/players';
import TeamBadge from '@/components/TeamBadge';
import Link from 'next/link';

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const team = teams.find(t => t.id === id);
  
  if (!team) {
    notFound();
  }

  const teamPlayers = players.filter(p => p.teamId === id);

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans pb-20">
      {/* Banner */}
      <div 
        className="relative overflow-hidden border-b border-white/10"
        style={{ 
          background: `linear-gradient(to bottom right, ${team.accentColor}20, #0a0a0a)`,
        }}
      >
        {/* Accent Bar */}
        <div className="h-2 w-full" style={{ backgroundColor: team.accentColor }} />
        
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          <Link href="/teams" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back to Clubs
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="p-4 bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10">
              <TeamBadge initials={team.badgeInitials} accentColor={team.accentColor} size="lg" />
            </div>
            <div className="flex-1">
              <h1 className="font-anton text-5xl md:text-7xl uppercase tracking-wider mb-2">{team.name}</h1>
              <p className="text-xl text-gray-400 font-medium">{team.city} • Est. {team.founded}</p>
              <p className="text-gray-500 mt-1">{team.stadiumName}</p>
            </div>

          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12">
        <h2 className="font-anton text-3xl uppercase tracking-wider mb-6 flex items-center gap-3">
          <span className="w-2 h-6" style={{ backgroundColor: team.accentColor }}></span>
          First Team Squad
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/50">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-gray-400">
                <th className="p-4">Player</th>
                <th className="p-4 text-center">Pos</th>
                <th className="p-4 text-center">Nat</th>
                <th className="p-4 text-right">Apps</th>
                <th className="p-4 text-right">Goals</th>
                <th className="p-4 text-right">Assists</th>
                <th className="p-4 text-right">Shots</th>
                <th className="p-4 text-right">Key Passes</th>
                <th className="p-4 text-right">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {teamPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-base">{player.name}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                      player.position === 'GK' ? 'bg-yellow-500/20 text-yellow-500' :
                      player.position === 'DF' ? 'bg-blue-500/20 text-blue-400' :
                      player.position === 'MF' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {player.position}
                    </span>
                  </td>
                  <td className="p-4 text-center text-gray-400 font-medium">{player.nationality}</td>
                  <td className="p-4 text-right font-medium">{player.apps}</td>
                  <td className="p-4 text-right font-medium text-white">{player.goals}</td>
                  <td className="p-4 text-right font-medium text-gray-300">{player.assists}</td>
                  <td className="p-4 text-right text-gray-500">{player.shots}</td>
                  <td className="p-4 text-right text-gray-500">{player.keyPasses}</td>
                  <td className="p-4 text-right">
                    <span className="font-anton text-lg" style={{ color: team.accentColor }}>
                      {player.seasonRating.toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
              {teamPlayers.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-gray-500 italic">
                    No players found for this team.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
