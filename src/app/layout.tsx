import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
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
      className={`${inter.variable} ${anton.variable} h-full antialiased text-white`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[url('/theme-bg.jpg')] bg-cover bg-center bg-fixed">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} S-RISE FL. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
