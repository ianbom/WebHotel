import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoCarousel } from "@/components/carousel";
import { ArticlesPreview, BrandShowcase, ContactCTA } from "@/components/site-sections";
import { content } from "@/data/content";
import { company } from "@/data/site";

export default function HomePage() {
  return <>
    <PhotoCarousel hero slides={[
      { image: content.projects[7].image, title: "Mengubah Ruang dengan Desain yang Elegan", description: "Wujudkan hunian impian, dari konsep hingga terwujud.", caption: "Mrs. Nike, Interior", href: "/our-expertise", position: "50% 55%" },
      { image: content.assets.bedroom, title: "Hunian Impian, Dirancang Sepenuh Hati", description: "Solusi interior dan arsitektur terintegrasi, sesuai kepribadian dan selera Anda.", caption: "Interior Lifetime Design", href: "/our-expertise" },
    ]} />
    <BrandShowcase />
    <section className="company-preview">
      <PhotoCarousel slides={[content.projects[0], content.projects[1], content.projects[2], content.projects[7], content.projects[8]].map((project) => ({ image: project.image, title: project.name, href: project.source }))} />
      <div className="company-preview-copy"><p>{company.description}</p><Link href="/about-us" className="about-link">Tentang Kami <ArrowRight size={26} strokeWidth={1} /></Link></div>
    </section>
    <ArticlesPreview />
    <ContactCTA />
  </>;
}
