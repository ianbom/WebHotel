import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Camera, Video, MessageCircle } from "lucide-react";
import { content } from "@/data/content";
import { company, formatDate, navigation, relatedBrands, services, type Article } from "@/data/site";
import { Button } from "@/components/ui/button";

export function SocialLinks() {
  return <div className="social-links">{company.socials.map((social) => <a href={social.href} key={social.name} aria-label={`Lifetime Design di ${social.name} (tab baru)`} target="_blank" rel="noopener noreferrer">{social.name === "Instagram" ? <Camera size={19} strokeWidth={1.5} /> : <Video size={21} strokeWidth={1.5} />}</a>)}</div>;
}

export function Footer() {
  return (
    <footer className="site-footer line-art">
      <div className="container">
        <nav className="footer-nav" aria-label="Navigasi footer">{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
        <div className="footer-details">
          <div><p className="footer-company">Lifetime Design</p><address>{company.address}</address></div>
          <div className="footer-brands">{relatedBrands.map((brand) => <a key={brand.name} href={brand.href} target="_blank" rel="noopener noreferrer">{brand.name}<ArrowUpRight size={12} /></a>)}</div>
          <div className="footer-contact"><a href={`tel:${company.telephone}`}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a></div>
        </div>
        <div className="footer-bottom"><p>Copyright &copy; {new Date().getFullYear()} Lifetime Design | All rights reserved</p><SocialLinks /></div>
      </div>
    </footer>
  );
}

export function WhatsAppLink() {
  return <a className="whatsapp-link" href={company.whatsapp} aria-label="Konsultasi melalui WhatsApp Lifetime Design (tab baru)" target="_blank" rel="noopener noreferrer"><MessageCircle size={31} strokeWidth={1.6} /></a>;
}

export function SectionHeading({ title, subtitle, className = "" }: { title: string; subtitle?: string; className?: string }) {
  return <div className={`section-heading ${className}`}><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>;
}

export function BrandShowcase() {
  return (
    <section className="intro-section line-art">
      <div className="container">
        <div className="intro-rule" />
        <SectionHeading title="Desain untuk Setiap Ruang" subtitle="Dari desain interior hingga furnitur, kami menghadirkan solusi terintegrasi untuk mewujudkan hunian yang mencerminkan kepribadian dan selera Anda." />
        <div className="brand-grid">{services.slice(0, 3).map((service) => (
          <a className="brand-card" href={service.href} key={service.name} target="_blank" rel="noopener noreferrer" aria-label={`${service.name} - kunjungi situs resmi`}>
            <div className="brand-card-inner">
              <div className="brand-front"><Image src={service.image.src} alt={service.image.alt} fill sizes="(max-width: 767px) calc(100vw - 32px), 380px" style={{ objectPosition: service.position }} /><span className="brand-gradient" /><div className="brand-wordmark"><Image src={content.assets.logo.src} alt="" width={245} height={30} /><span>{service.short}</span></div></div>
              <div className="brand-back"><Image src={service.image.src} alt="" fill sizes="(max-width: 767px) calc(100vw - 32px), 380px" /><div className="brand-back-copy"><h3>{service.name}</h3><p>{service.description}</p><span className="text-link">Jelajahi Layanan <ArrowRight size={20} strokeWidth={1} /></span></div></div>
            </div>
          </a>
        ))}</div>
      </div>
    </section>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <Link className="article-image" href={`/articles/${article.slug}`} tabIndex={-1} aria-hidden="true"><Image src={article.image.src} alt={article.image.alt} fill sizes="(max-width: 767px) calc(100vw - 32px), 300px" /></Link>
      <div className="article-copy"><div className="article-meta"><span>{article.category}</span><span aria-hidden="true"> / </span><time dateTime={article.date}>{formatDate(article.date)}</time></div><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link className="article-read-more" href={`/articles/${article.slug}`} aria-label={`Baca artikel: ${article.title}`}>Baca Selengkapnya <ArrowRight size={19} strokeWidth={1} /></Link></div>
    </article>
  );
}

export function ArticlesPreview() {
  return <section className="articles-preview section-space"><div className="container"><SectionHeading title="Wawasan & Inspirasi" subtitle="Artikel, inspirasi, dan cerita desain" /><div className="articles-home-grid">{content.articles.slice(0, 4).map((article) => <ArticleCard article={article} key={article.slug} />)}</div></div></section>;
}

export function ContactCTA() {
  return (
    <section className="contact-cta">
      <Image src={content.assets.designBuild.src} alt={content.assets.designBuild.alt} fill sizes="100vw" />
      <div className="cta-shade" /><div className="container"><h2>Wujudkan Ruang Impian Anda Bersama Lifetime Design</h2></div>
      <Button asChild className="cta-button"><Link href="/contact">Hubungi Kami <ArrowRight size={23} strokeWidth={1} /></Link></Button>
    </section>
  );
}
