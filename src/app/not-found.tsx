import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <section className="not-found container"><p className="eyebrow">404</p><h1>Halaman Tidak Ditemukan</h1><p>Mari kembali menemukan inspirasi untuk ruang impian Anda.</p><Button asChild><Link href="/">Kembali ke Home <ArrowRight size={20} /></Link></Button></section>;
}
