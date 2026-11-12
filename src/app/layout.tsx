import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import RgoVisualEditor from '@/components/rgo-visual-editor'

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlueOak Software — Rooted in engineering. Built to grow.",
  description: "BlueOak Software designs and builds web apps, mobile products and AI-powered software for startups and growing businesses.",
  icons: { icon: "/brand/blueoak-icon.svg", apple: "/brand/blueoak-icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}{process.env.NODE_ENV === 'development' && <RgoVisualEditor />}</body>
    </html>
  );
}
