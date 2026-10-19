import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { content } from "@/app/data";
import { Icon } from "./Primitives";
import { ScrollToTop } from "./Interactive";
import type { FooterSection } from "@/app/data/types";

export function Footer({ data }: { data: FooterSection }) {
  return (
    <footer className="bg-gradient-to-r from-[#00366b] to-[#003168] text-[#e7eef7] mt-auto">
      <div className="reveal container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.1fr_1.1fr] gap-8 lg:gap-10 py-[42px] lg:py-[58px]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block mb-4 transition-transform duration-300 hover:scale-[1.02]">
            <Image
              src={data.logo.src}
              alt={data.logo.alt}
              width={295}
              height={90}
              className="w-[240px] sm:w-[270px] h-auto object-contain"
            />
          </Link>
          <p className="text-sm leading-relaxed text-[#c7d5e6] max-w-sm mb-6">
            {data.description}
          </p>
          <div className="flex items-center gap-3">
            {data.socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-gold/70 text-white grid place-items-center transition-all duration-300 hover:scale-115 hover:bg-gold hover:text-navy hover:border-gold"
              >
                <Icon name={s.icon} size={20} />
              </a>
            ))}
          </div>
        </div>
        <div className="lg:border-l lg:border-white/15 lg:pl-8">
          <h2 className="font-heading font-bold text-lg sm:text-xl text-white mb-4 after:content-[''] after:block after:w-9 after:h-1 after:rounded-full after:bg-gold after:mt-2.5">
            {data.linksTitle}
          </h2>
          <ul className="list-none m-0 p-0 space-y-2 text-sm text-[#d0deee]">
            {data.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between py-1.5 border-b border-white/10 hover:text-gold transition-colors duration-200"
                >
                  <span>{l.label}</span>
                  <ChevronRight size={16} className="text-gold transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:border-l lg:border-white/15 lg:pl-8">
          <h2 className="font-heading font-bold text-lg sm:text-xl text-white mb-4 after:content-[''] after:block after:w-9 after:h-1 after:rounded-full after:bg-gold after:mt-2.5">
            {data.coursesTitle}
          </h2>
          <ul className="list-none m-0 p-0 space-y-2 text-sm text-[#d0deee]">
            {data.courseLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between py-1.5 border-b border-white/10 hover:text-gold transition-colors duration-200"
                >
                  <span>{l.label}</span>
                  <ChevronRight size={16} className="text-gold transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-1 lg:border-l lg:border-white/15 lg:pl-8">
          <h2 className="font-heading font-bold text-lg sm:text-xl text-white mb-4 after:content-[''] after:block after:w-9 after:h-1 after:rounded-full after:bg-gold after:mt-2.5">
            {data.addressTitle}
          </h2>
          <div className="space-y-3.5 text-sm text-[#d0deee]">
            {data.contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="group flex items-start gap-3.5 py-2 border-b border-white/10 hover:text-white transition-all duration-200 hover:translate-x-1"
              >
                <span className="w-10 h-10 rounded-full bg-gold text-navy grid place-items-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                  <Icon name={c.icon} size={20} />
                </span>
                <span className="min-w-0">
                  <strong className="block text-xs font-bold text-white uppercase tracking-wider mb-0.5">
                    {c.label}
                  </strong>
                  <span className="block text-xs text-[#b8cde3] break-words">
                    {c.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-[#b9cbe0] px-6 pb-5 max-w-4xl mx-auto leading-relaxed">
        {content.ui.demoNotice}
      </p>
      <div className="relative border-t border-white/15 py-5 px-6 min-h-[72px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-xs sm:text-[13px] text-[#c2d4e8]">
          <span className="w-8 h-0.5 bg-gold" />
          <span>{data.copyright}</span>
          <span className="w-8 h-0.5 bg-gold" />
        </div>
        <ScrollToTop />
      </div>
    </footer>
  );
}
