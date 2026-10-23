"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";

type HeaderProps = {
  logo: string;
  menuImage: string;
  navigation: readonly { label: string; href: string }[];
  phone: string;
  telephone: string;
  email: string;
};

export function Header({ logo, menuImage, navigation, phone, telephone, email }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  function active(href: string) {
    return pathname === href || (href === "/awards-articles" && pathname.startsWith("/articles/"));
  }
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link href="/" className="wordmark" aria-label="Lifetime Design - halaman utama">
          <Image src={logo} alt="Lifetime Design" width={205} height={30} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navigation.slice(0, 4).map((item) => <Link key={item.href} className={active(item.href) ? "active" : ""} aria-current={active(item.href) ? "page" : undefined} href={item.href}>{item.label}</Link>)}
        </nav>
        <Button asChild className="header-contact"><Link href="/contact">Hubungi Kami</Link></Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="mobile-toggle" aria-label="Buka menu navigasi"><Menu size={25} strokeWidth={1.4} /></SheetTrigger>
          <SheetContent>
            <Image className="menu-background" src={menuImage} alt="" fill sizes="400px" />
            <div className="menu-wash" />
            <SheetTitle className="sr-only">Navigasi Lifetime Design</SheetTitle>
            <SheetDescription className="sr-only">Pilih halaman untuk menjelajahi layanan Lifetime Design.</SheetDescription>
            <Link href="/" className="menu-wordmark" onClick={() => setOpen(false)}><Image src={logo} alt="Lifetime Design" width={205} height={30} /></Link>
            <nav aria-label="Navigasi seluler">
              {navigation.slice(0, 4).map((item) => <Link key={item.href} aria-current={active(item.href) ? "page" : undefined} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={17} /></Link>)}
            </nav>
            <Button asChild className="menu-contact"><Link href="/contact" onClick={() => setOpen(false)}>Hubungi Kami</Link></Button>
            <a className="menu-phone" href={`tel:${telephone}`}>{phone}</a>
            <a className="menu-email" href={`mailto:${email}`}>{email}</a>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
