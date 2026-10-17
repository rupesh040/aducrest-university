"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { GraduationCap, Minus, Plus } from "lucide-react";
import type { FAQSection as FAQSectionData } from "@/types/content";
import { Photo, PrimaryButton, SectionHeading } from "@/components/ui/Primitives";

export function FAQAccordion({ items }: { items: FAQSectionData["items"] }) {
  const prefix = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | undefined;
    if (event.key === "ArrowDown") next = (index + 1) % items.length;
    else if (event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    if (next !== undefined) { event.preventDefault(); buttons.current[next]?.focus(); }
  }
  return <div className="faq-accordion">{items.map((item, index) => {
    const open = item.id === openId;
    const id = `${prefix}-${item.id}`;
    return <div key={item.id} className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <h3><button type="button" id={`${id}-button`} aria-expanded={open} aria-controls={`${id}-answer`}
        ref={(button) => { buttons.current[index] = button; }} onKeyDown={(event) => keyboard(event, index)}
        onClick={() => setOpenId(open ? null : item.id)}>
        <span>{item.question}</span><span className="faq-toggle">{open ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}</span>
      </button></h3>
      <div className="faq-answer" id={`${id}-answer`} role="region" aria-labelledby={`${id}-button`} aria-hidden={!open}>
        <div><p>{item.answer}</p></div>
      </div>
    </div>;
  })}</div>;
}

export function FAQSectionView({ data }: { data: FAQSectionData }) {
  return <section className="faq-section section-padding"><div className="container faq-grid">
    <div className="faq-introduction">
      <SectionHeading heading={data.heading} align="left" />
      <div className="faq-visual">
        <div className="faq-photo-decoration" aria-hidden="true" />
        <Photo asset={data.image} className="faq-student-image" sizes="(max-width: 767px) 85vw, 43vw" />
        <div className="faq-support-card">
          <span className="contact-information-icon"><GraduationCap size={30} aria-hidden="true" /></span>
          <div><h3>{data.support.title}</h3><p>{data.support.description}</p><PrimaryButton button={data.support.button} /></div>
        </div>
      </div>
    </div>
    <FAQAccordion items={data.items} />
  </div></section>;
}
