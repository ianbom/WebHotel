import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { content } from "@/data/content";
import { services } from "@/data/site";

export const metadata: Metadata = { title: "Tentang Kami", description: "Sejak 2007, Lifetime Design menghadirkan solusi desain interior dan arsitektur terintegrasi untuk hunian Anda." };

const story = [
  { title: "2007 - Awal Perjalanan", text: "Sejak 2007, Lifetime Design telah membawa interior impian menjadi kenyataan melalui desain serta konstruksi modern klasik yang unik dan elegan.", image: content.assets.about },
  { title: "Dari Furnitur ke Solusi Interior", text: "Berawal dari toko furnitur sederhana, Lifetime Design berkembang melayani kebutuhan renovasi dan konsultasi interior. Setiap ruang dirancang sesuai visi dan harapan pemiliknya.", image: content.projects[2].image },
  { title: "Desain Interior yang Personal", text: services[0].description, image: content.projects[6].image },
  { title: "Arsitektur dan Hunian", text: services[1].description, image: content.projects[3].image },
  { title: "Solusi Terintegrasi", text: "Layanan interior, arsitektur, furnitur, konstruksi, dan renovasi saling melengkapi untuk menghadirkan solusi menyeluruh bagi kebutuhan ruang Anda.", image: content.projects[4].image },
  { title: "Hari Ini - Mewujudkan Ruang Impian", text: "Dengan pengalaman lebih dari 15 tahun, kami terus mendampingi Anda dalam membangun hunian yang elegan, menyenangkan, dan sesuai kepribadian Anda.", image: content.projects[8].image },
];

export default function AboutPage() {
  return <>
    <section className="philosophy"><div className="philosophy-image"><Image src={content.assets.about.src} alt={content.assets.about.alt} fill sizes="(max-width: 767px) 100vw, 50vw" priority /></div><div className="philosophy-copy"><h1>Filosofi Lifetime Design</h1><p>Desain terbaik berawal dari memahami Anda. Kami mengkolaborasikan desain, fungsi, dan estetika untuk menghadirkan ruang yang mencerminkan kepribadian dan selera Anda.</p><p>Solusi terintegrasi untuk rumah yang elegan, nyaman, dan sesuai visi Anda.</p></div></section>
    <section className="brand-philosophy line-art"><div className="container">{services.slice(0, 3).map((service) => <div className="brand-philosophy-row" key={service.name}><div className="brand-identity"><Image src={content.assets.logo.src} alt="Lifetime Design" width={270} height={32} /><h2>{service.short}</h2></div><div><p>{service.description}</p><a href={service.href} target="_blank" rel="noopener noreferrer">Kunjungi Situs Resmi <ArrowRight size={20} strokeWidth={1} /></a></div></div>)}</div></section>
    <section className="company-story container" aria-label="Perjalanan dan layanan Lifetime Design"><p className="story-note">Perjalanan kami sejak 2007, dilanjutkan dengan gambaran layanan kami saat ini. Entri tanpa tahun bukan penanda tanggal peluncuran.</p><div className="timeline">{story.map((entry) => <article className="timeline-entry" key={entry.title}><div className="timeline-image"><Image src={entry.image.src} alt={entry.image.alt} fill sizes="(max-width: 767px) 35vw, 340px" /></div><div className="timeline-copy"><h2>{entry.title}</h2><p>{entry.text}</p></div></article>)}</div></section>
  </>;
}
