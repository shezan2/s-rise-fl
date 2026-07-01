import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import TabBar from "@/components/TabBar";
import SmoothScroll from "@/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
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
      className={`${inter.variable} ${anton.variable} h-full antialiased text-white`}
    >
      <body className="min-h-full flex flex-col font-sans bg-black">
        <div className="fixed inset-0 -z-10 w-full h-full">
          <img src="/theme-bg.jpg" alt="" className="w-full h-full object-cover opacity-50" />
        </div>
        <SmoothScroll>
          <main className="flex-grow flex flex-col pb-6">{children}</main>
          <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 py-6 pb-24 md:pb-24 text-center text-gray-500 text-sm relative z-40">
            &copy; {new Date().getFullYear()} S-RISE FL. All rights reserved.
          </footer>
          <TabBar />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
