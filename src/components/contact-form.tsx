"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { inquiryMailto, validateInquiry, type Inquiry } from "@/lib/contact";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fields = [
  { name: "firstName", label: "Nama Depan", autoComplete: "given-name", type: "text", maxLength: 80 },
  { name: "lastName", label: "Nama Belakang", autoComplete: "family-name", type: "text", maxLength: 80 },
  { name: "email", label: "Email Anda", autoComplete: "email", type: "email", maxLength: 254 },
  { name: "phone", label: "Nomor Telepon", autoComplete: "tel", type: "tel", maxLength: 24 },
] as const;

export function ContactForm({ email }: { email: string }) {
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const [handoff, setHandoff] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: Inquiry = { firstName: String(data.get("firstName") || ""), lastName: String(data.get("lastName") || ""), email: String(data.get("email") || ""), phone: String(data.get("phone") || ""), message: String(data.get("message") || "") };
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    setHandoff(false);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }
    window.location.href = inquiryMailto(values, email);
    setHandoff(true);
  }
  return (
    <form ref={formRef} className="inquiry-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        {fields.map((field) => <div className="form-field" key={field.name}><label className="sr-only" htmlFor={field.name}>{field.label} (wajib)</label><Input {...field} id={field.name} placeholder={`${field.label} *`} required aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `${field.name}-error` : undefined} />{errors[field.name] && <p className="field-error" id={`${field.name}-error`}>{errors[field.name]}</p>}</div>)}
        <div className="form-field message-field"><label className="sr-only" htmlFor="message">Pesan Anda (wajib)</label><Textarea name="message" id="message" placeholder="Pesan Anda *" maxLength={2000} rows={3} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
      </div>
      <Button type="submit">Lanjutkan ke Email <ArrowRight size={20} strokeWidth={1} /></Button>
      <p className="form-note">Formulir ini membuka aplikasi email Anda. Pesan belum terkirim sampai Anda mengirimkannya melalui aplikasi tersebut.</p>
      <p className="form-status" role="status">{handoff ? "Permintaan membuka email telah dibuat. Jika aplikasi tidak terbuka, hubungi kami melalui tautan email di bawah." : ""}</p>
      <a className="email-fallback" href={`mailto:${email}`}>{email}</a>
    </form>
  );
}
