import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ArticleCard } from "@/components/site-sections";
import { content } from "@/data/content";
import { formatDate } from "@/data/site";

export const metadata: Metadata = { title: "Artikel & Publikasi", description: "Inspirasi interior, arsitektur, cerita proyek, dan artikel pilihan Lifetime Design." };

const highlights = [
  ...content.articles.map((article) => ({ title: article.title, image: article.image, href: `/articles/${article.slug}`, label: article.category })),
  ...content.projects.slice(0, 4).map((project) => ({ title: project.name, image: project.image, href: project.source, label: "Cerita Proyek" })),
];

export default function ArticlesPage() {
  return <>
    <section className="publications-section line-art"><div className="container"><div className="page-heading"><h1>Publikasi Pilihan</h1></div><div className="publications-grid">{highlights.map((highlight) => <Link className="publication" href={highlight.href} key={highlight.href} target={highlight.href.startsWith("https:") ? "_blank" : undefined} rel={highlight.href.startsWith("https:") ? "noopener noreferrer" : undefined}><div className="publication-image"><Image src={highlight.image.src} alt={highlight.image.alt} fill sizes="(max-width: 767px) 43vw, 270px" /></div><span className="publication-category">{highlight.label}</span><h2>{highlight.title}</h2><ArrowUpRight className="publication-arrow" size={16} /></Link>)}</div></div></section>
    <section className="articles-list-section container"><h2 className="editorial-heading">Temukan Wawasan & Inspirasi</h2><div className="articles-with-sidebar"><div className="articles-list">{content.articles.map((article) => <ArticleCard article={article} key={article.slug} />)}</div><aside className="featured-articles"><h2>Artikel Pilihan</h2>{content.articles.slice(3, 6).map((article) => <article key={article.slug}><div className="article-meta">{article.category} / <time dateTime={article.date}>{formatDate(article.date)}</time></div><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3></article>)}</aside></div></section>
  </>;
}
