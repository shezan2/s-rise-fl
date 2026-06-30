import { articles } from "@/lib/data/articles";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  "Match Report": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Transfer News": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Interview": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "League Update": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Player Spotlight": "bg-red-500/10 text-red-400 border-red-500/20",
  "Preview": "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

export default function NewsPage() {
  // Sort articles by date descending
  const sortedArticles = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Latest News</h1>
          <p className="text-zinc-400 mt-2 text-lg">Stay updated with everything S-RISE FL</p>
        </div>

        {/* Featured Article (First one) */}
        {sortedArticles.length > 0 && (
          <Link href={`/news/${sortedArticles[0].id}`} className="group block">
            <div className="bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors rounded-3xl overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-zinc-800 relative aspect-video md:aspect-auto flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-black/80 z-10" />
                <div className="text-9xl font-black text-white/5 absolute -right-10 -bottom-10 uppercase tracking-tighter transform group-hover:scale-105 transition-transform duration-700">
                  News
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-r from-zinc-900 to-black">
                <div className="flex items-center gap-4 mb-6">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border ${categoryColors[sortedArticles[0].category] || categoryColors["Preview"]}`}>
                    {sortedArticles[0].category}
                  </span>
                  <span className="flex items-center text-sm font-bold text-zinc-500">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {sortedArticles[0].readTimeMinutes} min read
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-red-400 transition-colors">{sortedArticles[0].title}</h2>
                <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                  {sortedArticles[0].excerpt}
                </p>
                <div className="text-sm font-bold text-zinc-600 flex items-center mt-auto">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {new Date(sortedArticles[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedArticles.slice(1).map((article) => (
            <Link key={article.id} href={`/news/${article.id}`} className="group block h-full">
              <div className="bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors rounded-2xl p-8 h-full flex flex-col relative overflow-hidden">
                
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border ${categoryColors[article.category] || categoryColors["Preview"]}`}>
                    {article.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-red-400 transition-colors">{article.title}</h3>
                
                <p className="text-zinc-400 flex-grow">
                  {article.excerpt}
                </p>

                <div className="mt-8 flex items-center justify-between text-sm font-bold text-zinc-600 border-t border-white/5 pt-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {article.readTimeMinutes} min
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}
