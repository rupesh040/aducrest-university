import { Photo, PrimaryButton, SectionHeading, Icon } from "./Primitives";
import type { AdmissionCTASection } from "@/app/data/types";

export function AdmissionCTA({ data }: { data: AdmissionCTASection }) {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="reveal reveal-zoom admission-cta relative isolate overflow-hidden rounded-2xl border border-[#e3eaf0] bg-[#f7faff] shadow-card">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 top-0 h-48 w-48 rounded-full bg-[#f8f0df] sm:right-[10%] sm:h-60 sm:w-60 lg:h-64 lg:w-64 hidden md:block animate-float"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-[2%] h-64 w-64 rounded-full bg-[#092b60] sm:-bottom-28 sm:right-[4%] sm:h-80 sm:w-80 lg:h-[370px] lg:w-[370px] hidden md:block animate-float-reverse"
          />

          <div className="relative z-10 flex flex-col items-start px-5 py-7 sm:px-8 sm:py-9 md:min-h-[400px] md:w-[62%] md:justify-center md:px-9 lg:px-12 lg:py-10">
            <div className="admission-cta-heading max-w-[570px] w-full reveal delay-100">
              <SectionHeading heading={data.heading} align="left" />
            </div>

            <div className="reveal delay-200 mt-4 flex w-full max-w-[530px] flex-wrap gap-3 sm:gap-4 sm:flex-nowrap">
              {data.features.map((feature, index) => (
                <div
                  key={feature.label}
                  className={`flex min-w-[130px] sm:min-w-0 flex-1 items-center gap-2.5 transition-transform duration-200 hover:translate-x-1 ${
                    index !== data.features.length - 1
                      ? "sm:border-r sm:border-[#d0dbe6] sm:pr-3"
                      : ""
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff1d9] text-[#173760] sm:h-10 sm:w-10 shadow-sm transition-transform duration-200 hover:scale-110">
                    <Icon name={feature.icon} size={19} />
                  </span>
                  <span className="text-xs font-semibold leading-4 text-[#192f50] sm:text-sm sm:leading-5">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="admission-cta-button mt-6 sm:mt-7 reveal delay-300">
              <PrimaryButton button={data.button} />
            </div>
          </div>
          <div className="relative z-[5] mx-auto mt-2 flex w-full max-w-[280px] sm:max-w-[340px] items-end justify-center h-[260px] sm:h-[320px] md:hidden px-3">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 right-2 h-48 w-48 sm:h-56 sm:w-56 rounded-full bg-[#092b60] animate-float-reverse"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-2 left-2 h-40 w-40 sm:h-48 sm:w-48 rounded-full bg-[#f8f0df] animate-float"
            />
            <Photo
              asset={data.image}
              className="cta-photo relative z-10 w-full h-full"
              sizes="(max-width: 639px) 280px, 340px"
              priority
            />
          </div>
          <div className="reveal reveal-left delay-150 hidden md:flex md:absolute md:bottom-0 md:right-0 md:h-full md:w-[38%] md:items-end md:justify-center z-[5]">
            <Photo
              asset={data.image}
              className="cta-photo relative w-full h-full transition-transform duration-500 hover:scale-[1.03]"
              sizes="(max-width: 1023px) 38vw, 440px"
              priority
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[8%] top-[24%] z-[6] hidden rotate-[-48deg] gap-2 md:flex animate-float"
          >
            <span className="h-6 w-2 rounded-full bg-[#ffb20b]" />
            <span className="mt-4 h-6 w-2 rounded-full bg-[#ffb20b]" />
          </div>
        </div>
      </div>
    </section>
  );
}
