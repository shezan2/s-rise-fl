import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S-RISE FL",
  description: "High-performance football league stats website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} h-full antialiased bg-black text-white`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-black border-t border-white/10 py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} S-RISE FL. All rights reserved.
        </footer>
        <SpeedInsights />
      </body>
    </html>
  );
}
