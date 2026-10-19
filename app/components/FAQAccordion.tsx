"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Minus, Plus } from "lucide-react";
import type { FAQSection as FAQSectionData } from "@/app/data/types";

export function FAQAccordion({ items }: { items: FAQSectionData["items"] }) {
  const prefix = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowDown") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp")
      next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      buttons.current[next]?.focus();
    }
  }

  return (
    <div className="space-y-3.5">
      {items.map((item, index) => {
        const open = item.id === openId;
        const id = `${prefix}-${item.id}`;
        return (
          <div
            key={item.id}
            className={`rounded-2xl transition-all duration-300 overflow-hidden ${
              open
                ? "border border-slate-200/90 shadow-[0_8px_24px_rgba(10,37,64,0.08)] bg-white"
                : "border border-[#e8eff5] bg-white shadow-[0_2px_8px_rgba(10,37,64,0.03)] hover:border-slate-300 hover:shadow-card"
            }`}
          >
            <h3>
              <button
                type="button"
                id={`${id}-button`}
                aria-expanded={open}
                aria-controls={`${id}-answer`}
                ref={(button) => {
                  buttons.current[index] = button;
                }}
                onKeyDown={(event) => keyboard(event, index)}
                onClick={() => setOpenId(open ? null : item.id)}
                className={`w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base transition-colors duration-200 group ${
                  open
                    ? "bg-[#0a2540] text-white"
                    : "bg-white text-heading hover:text-navy"
                }`}
              >
                <span className="pr-4">{item.question}</span>
                <span
                  className={`w-7 h-7 rounded-full grid place-items-center shrink-0 transition-all duration-300 ${
                    open
                      ? "bg-gold text-navy shadow-sm"
                      : "bg-[#f1f5f9] text-[#64748b] border border-[#e2e8f0] group-hover:bg-[#e2e8f0]"
                  }`}
                >
                  {open ? (
                    <Minus size={15} strokeWidth={2.5} aria-hidden="true" />
                  ) : (
                    <Plus size={15} strokeWidth={2.5} aria-hidden="true" />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={`${id}-answer`}
              role="region"
              aria-labelledby={`${id}-button`}
              className={`accordion-grid ${open ? "is-open" : ""}`}
            >
              <div className="accordion-inner bg-white">
                <div className="p-4 sm:p-5 text-muted text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                  <p className="m-0">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderHeadingTitle(title: string, highlight?: string) {
  if (
    title === "Explore our Academic" &&
    highlight === "Facilities & Departments"
  ) {
    return (
      <>
        Explore our <span className="text-gold">Academic</span>
        <br className="hidden sm:inline" />{" "}
        Facilities & <span className="text-gold">Departments</span>
      </>
    );
  }

  return (
    <>
      {title}
      {highlight && (
        <>
          {" "}
          <span className="text-gold">{highlight}</span>
        </>
      )}
    </>
  );
}

export function FAQSectionView({ data }: { data: FAQSectionData }) {
  return (
    <section className="section-padding bg-surface py-12 md:py-16">
      <div className="container grid grid-cols-1 lg:grid-cols-[1.1fr_1.2fr] gap-10 lg:gap-14 xl:gap-16 items-start">
        {/* Left Column: Heading + Image Composite */}
        <div className="reveal reveal-right flex flex-col">
          {/* Eyebrow */}
          {data.heading.eyebrow && (
            <div className="flex items-center gap-3 text-navy uppercase text-xs font-bold tracking-[1.8px] mb-3">
              <span className="w-8 h-[2.5px] bg-gold rounded-full shrink-0" />
              <span>{data.heading.eyebrow}</span>
            </div>
          )}

          {/* Heading */}
          <h2 className="text-heading font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-[1.2] tracking-tight">
            {renderHeadingTitle(data.heading.title, data.heading.highlight)}
          </h2>

          {/* Description */}
          {data.heading.description && (
            <p className="mt-3.5 text-muted text-sm sm:text-base leading-relaxed max-w-xl">
              {data.heading.description}
            </p>
          )}

          {/* Image & Support Card Composite */}
          <div className="relative mt-8 sm:mt-10 flex flex-col sm:flex-row items-center sm:items-end">
            {/* Student Image */}
            <div className="relative shrink-0 select-none pointer-events-none">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                width={365}
                height={423}
                priority
                className="w-[260px] sm:w-[300px] md:w-[330px] h-auto object-contain block"
              />
            </div>

            {/* Floating Support Card */}
            <div className="relative -mt-8 sm:mt-0 sm:-ml-14 md:-ml-16 mb-4 sm:mb-6 z-10 w-full max-w-[270px] sm:max-w-[290px] shrink-0">
              {/* Subtle Decorative Dashed Arc behind bottom-right */}
              <svg
                className="absolute -right-3 -bottom-3 sm:-right-4 sm:-bottom-4 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none text-gold/70 z-[-1]"
                viewBox="0 0 100 100"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M 15 25 C 55 30, 85 65, 70 100"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_12px_32px_-4px_rgba(10,37,64,0.08),0_2px_10px_rgba(10,37,64,0.03)] border border-[#e5edf5] transition-all duration-300 hover:shadow-lift hover:-translate-y-1">
                <div className="flex items-center gap-3.5 mb-2.5">
                  <span className="w-11 h-11 rounded-full bg-[#e8f3fc] text-[#0066cc] flex items-center justify-center shrink-0">
                    <GraduationCap size={24} aria-hidden="true" />
                  </span>
                  <h3 className="font-bold text-base sm:text-[17px] text-heading leading-tight m-0">
                    {data.support.title}
                  </h3>
                </div>
                <p className="text-muted text-xs sm:text-[13px] leading-relaxed mb-4 m-0">
                  {data.support.description}
                </p>
                <Link
                  href={data.support.button.href}
                  className="inline-flex items-center gap-2 bg-gold hover:bg-[#e09b00] text-navy font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98]"
                >
                  <span>{data.support.button.label}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: FAQ Accordion */}
        <div className="reveal reveal-left delay-150 w-full pt-2 lg:pt-0">
          <FAQAccordion items={data.items} />
        </div>
      </div>
    </section>
  );
}
