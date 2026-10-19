import { ChevronRight } from "lucide-react";
import type { ApplicationProcessSection } from "@/app/data/types";
import { Icon, SectionHeading } from "@/app/components/Primitives";

export function ApplicationProcess({
  data,
}: {
  data: ApplicationProcessSection;
}) {
  return (
    <section className="section-padding bg-[#f4faff]">
      <div className="container">
        <div className="reveal">
          <SectionHeading heading={data.heading} />
        </div>
        <ol className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-9">
          {data.steps.map((step, index) => (
            <li
              key={step.title}
              className={`reveal delay-${(index + 1) * 100} group relative bg-white rounded-xl p-6 md:p-8 shadow-card border border-[#e8eef6] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lift`}
            >
              <span className="w-16 h-16 rounded-full bg-[#eaf2ff] text-gold grid place-items-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ffeed1]">
                <Icon name={step.icon} size={32} />
              </span>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-heading mb-2 group-hover:text-gold transition-colors duration-200">
                  <span className="text-gold">
                    {String(index + 1).padStart(2, "0")}.{" "}
                  </span>
                  {step.title}
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed m-0">
                  {step.description}
                </p>
              </div>
              {index < data.steps.length - 1 && (
                <ChevronRight
                  className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-gold z-10 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                  size={24}
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
