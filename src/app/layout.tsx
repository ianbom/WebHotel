import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { content } from "@/data/content";
import { company, navigation } from "@/data/site";
import { Footer, WhatsAppLink } from "@/components/site-sections";
import "./globals.css";

const inter = localFont({ src: "../../public/fonts/inter.ttf", variable: "--font-inter", weight: "100 900", display: "swap" });
const cormorant = localFont({ src: "../../public/fonts/cormorantgaramond.ttf", variable: "--font-cormorant", weight: "300 700", display: "swap" });
const montserrat = localFont({ src: "../../public/fonts/montserrat.ttf", variable: "--font-montserrat", weight: "100 900", display: "swap" });
const poppins = localFont({ src: "../../public/fonts/poppins.ttf", variable: "--font-poppins", weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Lifetime Design | Desain Interior, Arsitektur & Furniture", template: "%s | Lifetime Design" },
  description: "Solusi desain interior, arsitektur, furnitur, dan design & build terintegrasi. Wujudkan hunian yang elegan bersama Lifetime Design.",
  icons: { icon: "/images/branding/lifetime-design-symbol.webp" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" className={`${inter.variable} ${cormorant.variable} ${montserrat.variable} ${poppins.variable}`}><body><a className="skip-link" href="#main-content">Lewati ke konten</a><Header logo={content.assets.logo.src} menuImage={content.assets.bedroom.src} navigation={navigation} phone={company.phone} telephone={company.telephone} email={company.email} /><main id="main-content">{children}</main><Footer /><WhatsAppLink /></body></html>;
}
