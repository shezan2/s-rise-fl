import { notFound } from "next/navigation";
import { players } from "@/lib/data/players";
import { teams } from "@/lib/data/teams";
import { matches } from "@/lib/data/matches";
import Link from "next/link";
import { ArrowLeft, Flag, Shield, Activity, Target, Zap, Goal } from "lucide-react";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = players.find((p) => p.id === id);

  if (!player) {
    notFound();
  }

  const team = teams.find((t) => t.id === player.teamId);

  // Find all goals scored by this player
  const goalEvents = matches.flatMap((match) => {
    return match.events
      .filter((e) => e.player === player.name && e.type === "goal")
      .map((e) => ({
        ...e,
        match,
      }));
  }).sort((a, b) => new Date(b.match.date).getTime() - new Date(a.match.date).getTime());

  // Calculate max values for performance bars (based on league max)
  const maxGoals = Math.max(...players.map(p => p.goals));
  const maxAssists = Math.max(...players.map(p => p.assists));

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Back Link */}
        <Link href="/stats" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Stats
        </Link>

        {/* Header Profile */}
        <div className="relative bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
          {/* Removed background accent blob for cleaner aesthetic */}

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-400">
                <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> {player.position}</span>
                {team && (
                  <span className="flex items-center gap-1.5" style={{ color: team.accentColor }}>
                    <Shield className="w-4 h-4" /> {team.name}
                  </span>
                )}
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">{player.name}</h1>
              <p className="text-zinc-400 text-lg">{player.apps} Appearances this season</p>
            </div>

            <div className="flex-shrink-0 text-center">
              <div className="text-6xl md:text-8xl font-black text-white tabular-nums tracking-tighter">
                {player.goals}
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-zinc-500 mt-2">Season Goals</div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard 
            title="Goals" 
            value={player.goals} 
            max={maxGoals} 
            icon={<Goal className="w-5 h-5" />} 
            color="bg-red-500" 
          />
          <StatCard 
            title="Assists" 
            value={player.assists} 
            max={maxAssists} 
            icon={<Target className="w-5 h-5" />} 
            color="bg-blue-500" 
          />
        </div>

        {/* Goal Log */}
        <section className="bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">Goal Log</h2>
          
          {goalEvents.length === 0 ? (
            <div className="text-center py-12 bg-black/30 rounded-2xl border border-white/5">
              <Goal className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 text-lg">No goals recorded yet this season.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {goalEvents.map((event, idx) => {
                const opponentId = event.match.homeTeamId === player.teamId ? event.match.awayTeamId : event.match.homeTeamId;
                const opponent = teams.find(t => t.id === opponentId);
                const isHome = event.match.homeTeamId === player.teamId;

                return (
                  <div key={`${event.match.id}-${idx}`} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-black/40 rounded-2xl border border-white/5 hover:border-white/10 transition-colors gap-4">
                    <div className="flex items-center gap-6">
                      <div className="text-3xl font-black text-zinc-700 w-16">
                        {event.minute}'
                      </div>
                      <div>
                        <div className="text-xl font-bold">vs {opponent?.name || 'Unknown'}</div>
                        <div className="text-sm text-zinc-400 mt-1 uppercase tracking-widest font-bold">
                          {isHome ? 'Home' : 'Away'} • {event.match.stage || 'Match'}
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      {event.assistedBy ? (
                        <div className="text-zinc-300">
                          <span className="text-zinc-500 text-sm">Assisted by</span> <br className="hidden sm:block" />
                          <span className="font-bold">{event.assistedBy}</span>
                        </div>
                      ) : (
                        <div className="text-zinc-500 text-sm italic font-bold">Unassisted</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

function StatCard({ title, value, max, icon, color }: { title: string, value: number, max: number, icon: React.ReactNode, color: string }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  
  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
      <div className="flex justify-between items-start mb-6">
        <div className="text-zinc-500 bg-black/50 p-3 rounded-xl group-hover:text-white transition-colors">
          {icon}
        </div>
        <div className="text-4xl font-black tracking-tighter">{value}</div>
      </div>
      <div className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">{title}</div>
      
      {/* Horizontal Performance Bar */}
      <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
