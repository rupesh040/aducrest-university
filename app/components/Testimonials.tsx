import { Quote } from "lucide-react";
import { content } from "@/app/data";
import { Photo, SectionHeading } from "./Primitives";
import { Carousel } from "./Interactive";
import type { TestimonialsSection } from "@/app/data/types";

export function Testimonials({ data }: { data: TestimonialsSection }) {
  const items = content.collections.testimonials.filter((t) =>
    data.testimonialIds.includes(t.id),
  );
  return (
    <section className="section-padding bg-[#0c3061] text-[#e7ecf5]">
      <div className="container">
        {data.heading && (
          <div className="reveal">
            <SectionHeading heading={data.heading} />
          </div>
        )}
        <div className="reveal reveal-zoom delay-150">
          <Carousel columns={1} label={content.ui.testimonialNavigation} dark>
            {items.map((t) => (
              <figure
                className="grid grid-cols-1 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_250px] gap-8 md:gap-16 items-center max-w-[1050px] mx-auto text-center md:text-left"
                key={t.id}
              >
                <div className="flex flex-col items-center md:items-start">
                  <Quote
                    size={52}
                    className="text-[#ffd04c] mb-2 shrink-0 transition-transform duration-300 hover:scale-110 hover:-rotate-6"
                    fill="currentColor"
                  />
                  <blockquote className="text-lg sm:text-xl lg:text-[22px] leading-relaxed text-[#e7ecf5] font-normal italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="text-center flex flex-col items-center group">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full border-2 border-gold overflow-hidden mb-3.5 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(255,184,0,0.4)]">
                    <Photo
                      asset={t.image}
                      className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                      sizes="200px"
                    />
                  </div>
                  <strong className="text-base sm:text-lg text-white font-bold group-hover:text-gold transition-colors duration-200">
                    {t.name}
                  </strong>
                  <span className="text-xs sm:text-[13px] text-[#b5c7df] mt-1">
                    {t.course}
                  </span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
