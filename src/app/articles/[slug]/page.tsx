import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { content } from "@/data/content";
import { formatDate } from "@/data/site";
import { ArticleCard, ContactCTA } from "@/components/site-sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return content.articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = content.articles.find((entry) => entry.slug === slug);
  return article ? { title: article.title, description: article.excerpt } : { title: "Artikel Tidak Ditemukan" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = content.articles.find((entry) => entry.slug === slug);
  if (!article) notFound();
  return <>
    <article className="article-detail container"><Link href="/awards-articles" className="back-link"><ArrowLeft size={18} /> Semua Artikel</Link><header className="article-detail-heading"><div className="article-meta">{article.category} / <time dateTime={article.date}>{formatDate(article.date)}</time></div><h1>{article.title}</h1></header><div className="article-detail-image"><Image src={article.image.src} alt={article.image.alt} fill sizes="(max-width: 1232px) 95vw, 1200px" priority /></div><div className="article-body">{article.blocks.map((block, index) => block.type === "h2" ? <h2 key={index}>{block.text}</h2> : block.type === "h3" ? <h3 key={index}>{block.text}</h3> : <p key={index}>{block.text}</p>)}<p className="source-credit">Sumber: Lifetime Design. <a href={article.source} target="_blank" rel="noopener noreferrer">Lihat artikel asli <ArrowUpRight size={15} /></a></p></div></article>
    <section className="related-articles container"><h2 className="editorial-heading">Inspirasi Lainnya</h2><div className="articles-home-grid">{content.articles.filter((entry) => entry.slug !== article.slug).slice(0, 2).map((entry) => <ArticleCard key={entry.slug} article={entry} />)}</div></section><ContactCTA />
  </>;
}
