import Image from "next/image";
import { Check } from "lucide-react";
import type { ApplicationSection as ApplicationSectionData } from "@/app/data/types";
import { Icon } from "@/app/components/Primitives";
import { AdmissionForm } from "./AdmissionForm";

export function ApplicationSection({
  data,
  initialCourse,
}: {
  data: ApplicationSectionData;
  initialCourse?: string;
}) {
  return (
    <section className="section-padding py-8 bg-[#f5faff]">
      <div className="container max-w-[1260px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_1fr] gap-6 lg:gap-8 items-start">
          {/* Left Column: Application Form */}
          <div className="reveal">
            <AdmissionForm data={data.form} initialCourse={initialCourse} />
          </div>

          {/* Right Column: Academic Journey Card + Contact Bar */}
          <div className="flex flex-col gap-6 min-w-0">
            {/* Top Promo Card */}
            <div className="reveal delay-100 rounded-2xl border border-[#e2eaf1] bg-white shadow-sm overflow-hidden grid grid-cols-1 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-stretch">
              {/* Text Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-center items-start">
                {/* Eyebrow */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-4 h-[2px] bg-[#d99b26] rounded-full" />
                  <span className="text-xs sm:text-[13px] font-bold tracking-widest text-[#0a2540] uppercase">
                    {data.promo.heading.eyebrow ?? "ADMISSION OPEN"}
                  </span>
                  <span className="w-4 h-[2px] bg-[#d99b26] rounded-full" />
                </div>

                {/* Heading */}
                <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[32px] leading-[1.2] text-[#0a2540] mb-3.5">
                  Begin Your <br className="hidden sm:inline" />
                  <span className="text-[#d99b26]">Academic Journey</span> <br className="hidden sm:inline" />
                  With Us
                </h2>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-5">
                  {data.promo.description}
                </p>

                {/* Checklist */}
                <ul className="space-y-3 list-none p-0 m-0 w-full">
                  {data.promo.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center gap-3 text-sm sm:text-[14px] font-medium text-slate-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#d99b26] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Student Photo with Campus Background & Golden Swooshes */}
              <div className="relative w-full h-[280px] sm:h-full min-h-[280px] sm:min-h-[310px] flex items-end justify-center overflow-hidden">
                {/* Blurred campus background */}
                <div className="absolute inset-0 bg-[#fdfbf6]">
                  <Image
                    src="/images/about/campus.webp"
                    alt="Campus"
                    fill
                    className="object-cover opacity-25 filter blur-[1px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
                </div>

                {/* Top-Right Golden Decorative Swoosh */}
                <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none z-10">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#f3be4d]">
                    <path
                      d="M100 0 C70 0, 50 18, 54 48 C57 68, 68 78, 76 70 C86 60, 92 38, 100 22 Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Bottom-Right Golden Decorative Swoosh */}
                <div className="absolute bottom-0 right-0 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none z-10">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#f3be4d]">
                    <path
                      d="M0 100 C35 100, 68 82, 82 48 C94 22, 100 0, 100 0 L100 100 Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Student cutout */}
                <div className="relative z-10 w-full h-full flex items-end justify-center">
                  <Image
                    src={data.promo.image.src || "/images/hero/admissions.webp"}
                    alt={data.promo.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 35vw, 260px"
                    className="object-contain object-bottom transition-transform duration-500 hover:scale-[1.03]"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Bottom Contact Info Bar - Robust 3-column layout without overlap */}
            <div className="reveal delay-200 rounded-2xl border border-[#e2eaf1] bg-white shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-3">
              {data.help.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex flex-col items-start p-4 sm:p-5 border-b md:border-b-0 md:border-r border-slate-100 last:border-none min-w-0 w-full no-underline group hover:bg-slate-50/70 transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-[#e8f2fc] text-[#175ea8] flex items-center justify-center shrink-0 mb-2.5 group-hover:bg-[#d8e9fa] transition-colors">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0a2540] mb-0.5 truncate w-full">
                    {item.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 mb-1 leading-snug truncate w-full">
                    {item.description}
                  </span>
                  <span className="text-xs sm:text-[13px] font-bold text-[#0a2540] group-hover:text-gold transition-colors break-words [overflow-wrap:anywhere] w-full">
                    {item.value}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
