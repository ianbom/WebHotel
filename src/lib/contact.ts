export type Inquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export function validateInquiry(values: Inquiry) {
  const errors: Partial<Record<keyof Inquiry, string>> = {};
  for (const field of Object.keys(values) as (keyof Inquiry)[]) {
    if (!values[field].trim()) errors[field] = "Bagian ini wajib diisi.";
  }
  if (values.email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || /[\r\n]/.test(values.email))) {
    errors.email = "Masukkan alamat email yang valid.";
  }
  const phoneDigits = values.phone.replace(/\D/g, "");
  if (values.phone && (!/^\+?[\d\s().-]{7,24}$/.test(values.phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15)) {
    errors.phone = "Masukkan nomor telepon yang valid (7-24 karakter).";
  }
  if (values.firstName.length > 80) errors.firstName = "Maksimal 80 karakter.";
  if (values.lastName.length > 80) errors.lastName = "Maksimal 80 karakter.";
  if (values.email.length > 254) errors.email = "Alamat email terlalu panjang.";
  if (values.message.length > 2000) errors.message = "Pesan maksimal 2.000 karakter.";
  return errors;
}

export function inquiryMailto(values: Inquiry, recipient: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient) || /[\r\n]/.test(recipient)) {
    throw new Error("Invalid contact recipient");
  }
  if (Object.keys(validateInquiry(values)).length) throw new Error("Invalid inquiry");
  const body = [
    "Halo Lifetime Design,",
    "",
    `Nama: ${values.firstName.trim()} ${values.lastName.trim()}`,
    `Email: ${values.email.trim()}`,
    `Telepon: ${values.phone.trim()}`,
    "",
    values.message.trim(),
  ].join("\n");
  return `mailto:${recipient}?subject=${encodeURIComponent("Konsultasi desain - Lifetime Design")}&body=${encodeURIComponent(body)}`;
}
