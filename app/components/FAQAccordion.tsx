"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { GraduationCap, Minus, Plus } from "lucide-react";
import type { FAQSection as FAQSectionData } from "@/app/data/types";
import {
  Photo,
  PrimaryButton,
  SectionHeading,
} from "@/app/components/Primitives";

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
            className={`rounded-xl border transition-all duration-300 overflow-hidden ${
              open
                ? "border-gold/60 bg-white shadow-card"
                : "border-[#e5edf5] bg-white/70 hover:border-gold/30 hover:bg-white"
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
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-heading hover:text-navy transition-colors duration-200"
              >
                <span className="pr-4">{item.question}</span>
                <span
                  className={`w-7 h-7 rounded-full grid place-items-center shrink-0 transition-all duration-300 ${
                    open ? "bg-gold text-navy rotate-180" : "bg-[#f0f4fa] text-navy hover:bg-gold/20"
                  }`}
                >
                  {open ? (
                    <Minus size={16} aria-hidden="true" />
                  ) : (
                    <Plus size={16} aria-hidden="true" />
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
              <div className="accordion-inner">
                <div className="p-4 sm:p-5 pt-0 text-muted text-xs sm:text-sm leading-relaxed border-t border-[#f0f4fa]">
                  <p className="m-0 pt-3">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FAQSectionView({ data }: { data: FAQSectionData }) {
  return (
    <section className="section-padding bg-surface">
      <div className="container grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-14 items-start">
        <div className="reveal reveal-right flex flex-col">
          <SectionHeading heading={data.heading} align="left" />
          <div className="relative mt-4">
            <Photo
              asset={data.image}
              className="w-full h-64 sm:h-80 rounded-2xl shadow-sm transition-transform duration-500 hover:scale-[1.02]"
              sizes="(max-width: 767px) 85vw, 43vw"
            />
            <div className="mt-5 p-5 sm:p-6 bg-white rounded-xl shadow-card border border-[#e1eaf1] flex items-start gap-4 transition-all duration-300 hover:shadow-lift hover:-translate-y-1">
              <span className="contact-information-icon">
                <GraduationCap size={28} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-heading mb-1.5">
                  {data.support.title}
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                  {data.support.description}
                </p>
                <PrimaryButton button={data.support.button} />
              </div>
            </div>
          </div>
        </div>
        <div className="reveal reveal-left delay-150">
          <FAQAccordion items={data.items} />
        </div>
      </div>
    </section>
  );
}
