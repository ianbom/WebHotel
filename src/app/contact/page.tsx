import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/site-sections";
import { content } from "@/data/content";
import { company, services } from "@/data/site";

export const metadata: Metadata = { title: "Kontak", description: "Hubungi Lifetime Design untuk konsultasi interior, arsitektur, dan furnitur di Jl. Pangeran Antasari No.70, Jakarta Selatan." };

export default function ContactPage() {
  const mapsQuery = encodeURIComponent("Lifetime Design " + company.address);
  return <>
    <h1 className="sr-only">Hubungi Lifetime Design</h1>
    <section className="contact-locations line-art">
      <div className="container">
        {services.slice(0, 3).map((service, index) => (
          <section className="contact-location" key={service.name} aria-labelledby={`contact-service-${index}`}>
            <div className="contact-brand">
              <Image src={content.assets.logo.src} alt="Lifetime Design" width={300} height={36} priority={index === 0} />
              <h2 id={`contact-service-${index}`}>{service.short}</h2>
            </div>
            <div className="contact-location-grid">
              <div className="contact-address">
                <h3>Alamat</h3>
                <p className="shared-office">Kantor bersama Lifetime Design</p>
                <address>{company.address}</address>
              </div>
              <div className="contact-phone">
                <h3>Telepon</h3><a href={`tel:${company.telephone}`}>{company.phone}</a>
                <h3>Email</h3><a href={`mailto:${company.email}`}>{company.email}</a>
                <a className="contact-whatsapp" href={company.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={16} /></a>
              </div>
              <div className="contact-social"><h3>Ikuti Kami</h3><SocialLinks /></div>
              {index < 2 && (
                <div className="contact-map">
                  <iframe title={`Peta kantor bersama Lifetime Design - ${service.short}`} src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                  <a href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`} target="_blank" rel="noopener noreferrer">Buka di Google Maps <ArrowUpRight size={14} /></a>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </section>
    <section className="contact-inquiry line-art"><div className="container"><p className="eyebrow">Formulir Konsultasi</p><h2>Ruang Impian Anda<br />Dimulai di Sini</h2><ContactForm email={company.email} /></div></section>
  </>;
}
