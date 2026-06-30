import Link from "next/link";
import { Crown, ArrowRight, Trophy, CalendarDays, Newspaper } from "lucide-react";
import { teams } from "@/lib/data/teams";
import { matches } from "@/lib/data/matches";
import { articles } from "@/lib/data/articles";
import MatchRow, { MatchData } from "@/components/MatchRow";
import TeamBadge from "@/components/TeamBadge";

export default function Home() {
  const upcomingMatches = matches
    .filter((m) => m.status === "upcoming" || m.status === "live")
    .slice(0, 3)
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

  const latestNews = articles.slice(0, 3);
  const showcaseTeams = teams.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <div className="w-32 h-32 mb-8 bg-gradient-to-br from-yellow-400 to-yellow-600 p-[2px] rounded-2xl transform rotate-3 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
            <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
              <Crown className="w-16 h-16 text-yellow-500" />
            </div>
          </div>
          <h1 className="font-anton text-6xl md:text-8xl tracking-tight uppercase mb-6">
            <span className="text-white">S-Rise </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              FL
            </span>
          </h1>
          <p className="max-w-2xl text-xl text-neutral-400 mb-10 font-medium">
            The pinnacle of domestic football. Experience the drama, passion, and unparalleled glory of the S-Rise Football League.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/matches"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black uppercase tracking-wider bg-yellow-500 hover:bg-yellow-400 transition-colors rounded-none"
            >
              Explore Fixtures
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/bracket"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white uppercase tracking-wider border-2 border-white/20 hover:border-white hover:bg-white/5 transition-colors rounded-none"
            >
              View Bracket
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-24">
        {/* Tournament Info & Upcoming Fixtures */}
        <div className="flex flex-col gap-12">

          {/* Upcoming Matches */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-anton text-3xl text-white uppercase tracking-wider flex items-center gap-3">
                <CalendarDays className="w-8 h-8 text-red-500" />
                Next Fixtures
              </h2>
              <Link href="/matches" className="text-sm text-red-500 hover:text-red-400 font-bold uppercase tracking-wider">
                All Matches →
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="border border-white/10 rounded-xl overflow-hidden">
                  <MatchRow match={match} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Featured Teams Grid */}
        <section>
          <h2 className="font-anton text-3xl text-white uppercase tracking-wider mb-8 text-center">
            Featured Clubs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseTeams.map((team) => (
              <Link href="/teams" key={team.id} className="group relative overflow-hidden bg-neutral-900 border border-white/10 p-6 rounded-xl transition-all hover:border-white/30 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-500" style={{ backgroundColor: team.accentColor, filter: 'blur(40px)' }} />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <TeamBadge initials={team.badgeInitials} accentColor={team.accentColor} className="w-20 h-20 text-3xl mb-4 shadow-xl" />
                  <h3 className="font-anton text-2xl mb-1">{team.name}</h3>
                  <p className="text-sm text-neutral-400">{team.stadiumName}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest News */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-anton text-3xl text-white uppercase tracking-wider flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-blue-500" />
              Latest News
            </h2>
            <Link href="/news" className="text-sm text-blue-500 hover:text-blue-400 font-bold uppercase tracking-wider">
              More News →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((article) => (
              <Link href="/news" key={article.id} className="group flex flex-col">
                <div className="relative h-48 w-full bg-neutral-900 overflow-hidden rounded-t-xl mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <div className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-2">
                    {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {article.readTimeMinutes} min read
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-neutral-400 text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
