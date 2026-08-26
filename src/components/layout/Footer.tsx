import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import NewsletterForm from "./NewsletterForm";

const quickLinks = [
  { label: "برنامه‌های آموزشی", href: "/programs" },
  { label: "اساتید", href: "/teachers" },
  { label: "گالری", href: "/gallery" },
  { label: "وبلاگ", href: "/blog" },
  { label: "نظرسنجی", href: "/polls" },
];

function normalizeUrl(url: string) {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

async function getSettings() {
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  settings.forEach((s) => (map[s.key] = s.value));
  return map;
}

export default async function Footer() {
  const s = await getSettings();

  const socialLinks = [
    { label: "اینستاگرام", href: normalizeUrl(s.footer_instagram || "") },
    { label: "تلگرام", href: normalizeUrl(s.footer_telegram || "") },
    { label: "واتساپ", href: normalizeUrl(s.footer_whatsapp || "") },
    { label: "آپارات", href: normalizeUrl(s.footer_aparat || "") },
  ].filter((l) => l.href && l.href !== "#");

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo/LogoColor.png" alt="آکادمی زبان مازند آریا" className="h-12 w-auto brightness-0 invert" />
              <span className="text-lg font-black text-white">آکادمی زبان مازند آریــــا</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {s.footer_about || "آموزش حرفه‌ای زبان انگلیسی"}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">دسترسی سریع</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-amber-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">ارتباط با ما</h3>
            <ul className="space-y-3">
              {s.footer_address && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span className="text-sm text-slate-400">{s.footer_address}</span>
                </li>
              )}
              {s.footer_phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                  <span className="text-sm text-slate-400">{s.footer_phone}</span>
                </li>
              )}
              {s.footer_email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                  <span className="text-sm text-slate-400">{s.footer_email}</span>
                </li>
              )}
              {s.footer_hours && (
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-amber-400" />
                  <span className="text-sm text-slate-400">{s.footer_hours}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-white">عضویت در خبرنامه</h3>
            <NewsletterForm />

            {socialLinks.length > 0 && (
              <>
                <h3 className="mt-6 mb-3 text-sm font-bold text-white">شبکه‌های اجتماعی</h3>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-700 hover:text-amber-400 transition-colors">{social.label}</a>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-slate-500">
          © {new Date().toLocaleDateString("fa-IR", { year: "numeric" })} آکادمی زبان مازند آریــــا. تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}
