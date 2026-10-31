"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { Photo, PrimaryButton, SectionHeading, Icon } from "./Primitives";
import type { AboutSection } from "@/app/data/types";

export function About({ data }: { data: AboutSection }) {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  return (
    <section className="section-padding py-8 bg-surface overflow-hidden">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className="reveal reveal-right relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] max-w-[500px] lg:max-w-none mx-auto w-full">
          <div className="absolute w-[72%] h-[75%] bg-[#e5edf8] top-8 left-8 sm:top-10 sm:left-10 rounded-2xl animate-float-reverse" />
          <Photo
            asset={data.images[0]}
            className="w-[76%] h-[340px] sm:h-[420px] lg:h-[470px] rounded-xl shadow-md transition-transform duration-500 hover:scale-[1.02]"
            sizes="(max-width: 767px) 76vw, 34vw"
          />
          <div className="absolute right-0 bottom-0 w-[48%] h-[220px] sm:h-[280px] lg:h-[310px] rounded-xl border-4 border-white shadow-lift overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <Photo
              asset={data.images[1]}
              className="w-full h-full"
              sizes="(max-width: 767px) 43vw, 24vw"
            />
          </div>
        </div>

        <div className="reveal delay-100 flex flex-col">
          <SectionHeading heading={data.heading} align="left" />
          {data.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-muted text-sm sm:text-[15px] leading-relaxed mb-3"
            >
              {p}
            </p>
          ))}
          <div className="grid gap-4 my-5 sm:my-6">
            {data.benefits.map((b, bIdx) => (
              <div
                key={b.title}
                className={`reveal delay-${(bIdx + 1) * 100} flex items-center gap-4 group p-2 rounded-lg transition-colors hover:bg-white/60`}
              >
                <span className="w-12 h-12 rounded-full bg-[#ffe5a1] text-[#d99200] grid place-items-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Icon name={b.icon} size={24} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-heading mb-1 group-hover:text-gold transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-muted text-xs sm:text-sm m-0 leading-normal">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal delay-300 flex flex-wrap items-center gap-5 sm:gap-7 mt-4">
            {!isAboutPage && data.button && (
              <div className="inline-block">
                <PrimaryButton button={data.button} />
              </div>
            )}
            <a
              className={`flex items-center gap-3 text-navy transition-all duration-200 hover:translate-x-1 ${
                !isAboutPage && data.button
                  ? "sm:pl-6 sm:border-l sm:border-[#d9e0ea]"
                  : ""
              }`}
              href={data.phone.href}
            >
              <span className="w-11 h-11 bg-[#eaf2ff] text-navy grid place-items-center rounded-full shrink-0 shadow-sm transition-transform duration-200 hover:scale-110">
                <Phone size={20} />
              </span>
              <div>
                <small className="block text-xs text-muted leading-tight">
                  {data.phone.label}
                </small>
                <strong className="text-sm font-bold text-navy">
                  {data.phone.value}
                </strong>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
