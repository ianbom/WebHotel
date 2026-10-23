import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/site";

export const metadata: Metadata = { title: "Layanan Kami", description: "Layanan desain interior, arsitektur, furnitur, konstruksi, dan renovasi hunian Lifetime Design." };

export default function ExpertisePage() {
  return <div className="expertise-page line-art"><div className="container"><div className="page-heading"><h1>Layanan Kami</h1><p>Merancang Ruang. Menghadirkan Pengalaman.</p></div><div className="expertise-grid">{services.map((service, index) => <Link href={service.href} key={service.name} target={index === 3 ? undefined : "_blank"} rel={index === 3 ? undefined : "noopener noreferrer"} className={`expertise-panel expertise-panel-${index + 1}`}><Image src={service.image.src} alt={service.image.alt} fill sizes={index === 0 || index === 3 ? "(max-width: 1232px) 95vw, 1200px" : "(max-width: 767px) 95vw, 700px"} style={{ objectPosition: service.position }} priority={index === 0} /><div className="expertise-shade" /><div className="expertise-copy"><h2>{service.name}</h2><p>{service.subtitle}</p><span className="expertise-explore">Jelajahi {service.short} <ArrowRight size={21} strokeWidth={1} /></span></div></Link>)}</div></div></div>;
}
