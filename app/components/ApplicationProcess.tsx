import React from "react";
import { ChevronRight } from "lucide-react";
import type { ApplicationProcessSection } from "@/app/data/types";
import { Icon } from "@/app/components/Primitives";

export function ApplicationProcess({
  data,
}: {
  data: ApplicationProcessSection;
}) {
  return (
    <section className="section-padding py-8 bg-[#fcf9f4]">
      <div className="container max-w-[1260px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 reveal">
          <div className="flex items-center justify-center gap-2.5 mb-2.5">
            <span className="w-5 h-[2px] bg-[#d99b26] rounded-full" />
            <span className="text-xs sm:text-[13px] font-bold tracking-widest text-[#0a2540] uppercase">
              {data.heading.eyebrow ?? "SIMPLE STEPS"}
            </span>
            <span className="w-5 h-[2px] bg-[#d99b26] rounded-full" />
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-[38px] text-[#0a2540] leading-tight">
            {data.heading.title}{" "}
            <span className="text-[#d99b26]">{data.heading.highlight}</span>
          </h2>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between gap-6 lg:gap-3 xl:gap-4 reveal delay-100">
          {data.steps.map((step, index) => {
            const isBlue = index % 2 === 0;
            const stepNumber = String(index + 1).padStart(2, "0");
            const cleanTitle = step.title.replace(/^\d+\.\s*/, "");

            return (
              <React.Fragment key={step.title}>
                <div className="flex items-center gap-4 w-full lg:w-auto lg:max-w-[260px] xl:max-w-[280px]">
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 hover:scale-105 ${
                      isBlue
                        ? "bg-[#e3effc] text-[#155a9d]"
                        : "bg-[#fef2d8] text-[#c5841b]"
                    }`}
                  >
                    <Icon name={step.icon} size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-[#0a2540] mb-1 leading-snug">
                      {stepNumber}. {cleanTitle}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed m-0">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < data.steps.length - 1 && (
                  <div
                    className="hidden lg:flex items-center justify-center text-[#2b6cb0] shrink-0"
                    aria-hidden="true"
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
