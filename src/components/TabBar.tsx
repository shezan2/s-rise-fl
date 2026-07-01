"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Trophy, CalendarDays, Shield, BarChart2 } from "lucide-react";

const TABS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Bracket", href: "/bracket", icon: Trophy },
  { name: "Matches", href: "/matches", icon: CalendarDays },
  { name: "Teams", href: "/teams", icon: Shield },
  { name: "Stats", href: "/stats", icon: BarChart2 },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 md:bottom-6 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-auto z-50">
      <nav className="flex items-center justify-between md:justify-center md:gap-2 px-4 py-3 md:px-2 md:py-2 md:rounded-full bg-black/40 backdrop-blur-xl border-t md:border border-white/10 shadow-2xl">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`relative flex flex-col md:flex-row items-center gap-1 md:gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-colors ${
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 md:w-4 md:h-4 relative z-10" />
              <span className="text-[10px] md:text-sm font-medium tracking-wider uppercase relative z-10">
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
