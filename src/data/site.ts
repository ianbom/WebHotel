import { content } from "./content";

export const company = {
  name: "Lifetime Design",
  email: "lidia@lifetimedesign.co",
  phone: "0811-1256-162",
  telephone: "+628111256162",
  whatsapp: "https://wa.me/628111256162",
  address: "Jl. Pangeran Antasari No.70, RW.8, Cilandak Barat, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430",
  source: "https://lifetimedesign.co/kontak/",
  description: "Lifetime Design adalah perusahaan desain interior terintegrasi dengan pengalaman lebih dari 15 tahun. Dari desain interior, arsitektur, furnitur, hingga renovasi, kami menghadirkan solusi menyeluruh untuk setiap kebutuhan ruang Anda.",
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/lifetime.design/" },
    { name: "YouTube", href: "https://www.youtube.com/@LifetimeDesign" },
  ],
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Layanan Kami", href: "/our-expertise" },
  { label: "Tentang Kami", href: "/about-us" },
  { label: "Artikel", href: "/awards-articles" },
  { label: "Kontak", href: "/contact" },
] as const;

export const services = [
  {
    name: "Lifetime Design Interior",
    short: "Interior",
    subtitle: "Konsultasi dan Desain Interior",
    description: "Menghadirkan interior yang mencerminkan kepribadian dan selera Anda. Desain, fungsi, dan estetika berpadu untuk mewujudkan hunian yang elegan dan nyaman.",
    href: "https://lifetimedesign.co/jasa-desain-interior/",
    image: content.projects[7].image,
    position: "50% 50%",
  },
  {
    name: "Lifetime Design Arsitektur",
    short: "Arsitektur",
    subtitle: "Arsitektur dan Perencanaan Hunian",
    description: "Merancang rumah dengan karakter yang khas. Lifetime Design menghadirkan layanan arsitektur yang mengutamakan kebutuhan, fungsi, dan keindahan setiap ruang.",
    href: "https://lifetimedesign.co/jasa-arsitek-rumah/",
    image: content.projects[3].image,
    position: "50% 50%",
  },
  {
    name: "Lifetime Design Furniture",
    short: "Furniture",
    subtitle: "Furnitur dan Pelengkap Interior",
    description: "Lengkapi ruang dengan furnitur yang selaras dengan desain hunian Anda. Temukan koleksi Lifetime Design Furniture melalui situs resmi kami.",
    href: "https://web.ldfurniture.co.id/",
    image: content.assets.bedroom,
    position: "50% 55%",
  },
  {
    name: "Lifetime Design & Build",
    short: "Design & Build",
    subtitle: "Konstruksi dan Renovasi Hunian",
    description: "Solusi terintegrasi, dari tahap konsultasi dan perencanaan hingga pembangunan serta perawatan. Wujudkan desain menjadi hunian yang dapat Anda nikmati.",
    href: "/contact",
    image: content.assets.designBuild,
    position: "50% 50%",
  },
] as const;

export const relatedBrands = [
  { name: "Lifetime Design Furniture", href: "https://web.ldfurniture.co.id/" },
  { name: "Lifetime Design Estate", href: "https://lifetimedesign.co/lifetime-design-estate/" },
  { name: "HOIRe", href: "https://hoire.co/" },
] as const;

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(new Date(date + "T12:00:00+07:00"));
}

export type Article = (typeof content.articles)[number];
