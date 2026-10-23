"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  image: { src: string; alt: string };
  title: string;
  description?: string;
  caption?: string;
  href?: string;
  position?: string;
};

export function PhotoCarousel({ slides, hero = false }: { slides: Slide[]; hero?: boolean }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const touchStart = useRef<number | null>(null);
  useEffect(() => {
    if (paused || hovered || slides.length < 2) return;
    const interval = window.setInterval(() => {
      if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setIndex((previous) => (previous + 1) % slides.length);
      }
    }, 5000);
    return () => window.clearInterval(interval);
  }, [paused, hovered, slides.length]);

  function change(direction: number) {
    setIndex((previous) => (previous + direction + slides.length) % slides.length);
    setPaused(true);
  }

  return (
    <section className={`photo-carousel ${hero ? "hero" : "project-carousel"}`} aria-label={hero ? "Inspirasi hunian Lifetime Design" : "Pilihan proyek Lifetime Design"} aria-roledescription="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setHovered(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false); }} onTouchStart={(event) => { touchStart.current = event.changedTouches[0].clientX; }} onTouchEnd={(event) => { if (touchStart.current !== null && Math.abs(event.changedTouches[0].clientX - touchStart.current) > 50) change(event.changedTouches[0].clientX < touchStart.current ? 1 : -1); touchStart.current = null; }}>
      <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide, slideIndex) => (
          <div key={slide.title} className="photo-slide" role="group" aria-roledescription="slide" aria-label={`${slideIndex + 1} dari ${slides.length}`} aria-hidden={index !== slideIndex}>
            <Image src={slide.image.src} alt={slide.image.alt} fill priority={hero && slideIndex === 0} sizes={hero ? "100vw" : "(max-width: 767px) 100vw, 50vw"} style={{ objectPosition: slide.position || "center" }} />
            <div className="slide-shade" />
            {hero ? (
              <div className="hero-copy container">
                {slideIndex === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
                <p>{slide.description}</p>
                <Button asChild><Link tabIndex={index === slideIndex ? 0 : -1} href={slide.href || "/our-expertise"}>Jelajahi Layanan <ArrowRight size={21} strokeWidth={1} /></Link></Button>
              </div>
            ) : <a className="project-caption" href={slide.href} target="_blank" rel="noopener noreferrer" tabIndex={index === slideIndex ? 0 : -1}>{slide.title}<span aria-hidden="true">&#8599;</span></a>}
            {hero && <span className="hero-caption">{slide.caption}</span>}
          </div>
        ))}
      </div>
      <button className="carousel-arrow previous" aria-label="Slide sebelumnya" onClick={() => change(-1)}><ArrowLeft size={19} strokeWidth={1} /></button>
      <button className="carousel-arrow next" aria-label="Slide berikutnya" onClick={() => change(1)}><ArrowRight size={19} strokeWidth={1} /></button>
      {hero && <div className="carousel-dots" role="group" aria-label="Pilih slide">{slides.map((slide, slideIndex) => <button key={slide.title} aria-label={`Tampilkan slide ${slideIndex + 1}`} aria-pressed={index === slideIndex} className={index === slideIndex ? "selected" : ""} onClick={() => { setIndex(slideIndex); setPaused(true); }} />)}</div>}
      <button className="carousel-pause" aria-label={paused ? "Putar slideshow" : "Jeda slideshow"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>
    </section>
  );
}

