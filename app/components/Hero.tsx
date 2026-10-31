import { Photo, PrimaryButton } from "./Primitives";
import type { HeroSection } from "@/app/data/types";

const delays = ["delay-100", "delay-200", "delay-300"];

export function Hero({ data }: { data: HeroSection }) {
  return (
    <section className="py-8 relative min-h-[560px] md:min-h-[520px] lg:min-h-[560px] flex items-center bg-[#edf6fb] overflow-hidden">
      <div
        className="pointer-events-none absolute -top-28 -left-28 w-96 h-96 rounded-full bg-gradient-to-br from-[#ffd35a]/20 to-transparent blur-3xl animate-float"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-[#06447d]/10 via-[#002b60]/5 to-transparent blur-3xl animate-float-reverse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full border border-navy/5 hidden lg:block animate-float"
        aria-hidden="true"
      />
      <div className="reveal reveal-right delay-150 w-full md:w-[62%] h-[400px] md:h-full absolute inset-x-0 bottom-0 top-auto md:top-0 md:inset-x-auto md:right-0 group">
        <Photo
          asset={data.image}
          className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
          priority
          sizes="(max-width: 540px) 100vw, (max-width: 767px) 540px, 65vw"
        />
      </div>
      <div
        className="md:hidden absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-b from-[#edf6fb] via-[#edf6fb]/40 via-15% to-transparent to-30% pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hidden md:block absolute inset-y-0 left-0 w-[68%] bg-gradient-to-r from-[#edf6fb] via-[#edf6fb]/95 via-70% to-transparent to-100% pointer-events-none"
        aria-hidden="true"
      />
      <div className="container relative z-10 pt-8 pb-[374px] md:py-8">
        <div className="reveal reveal-down delay-75 group flex items-center gap-3 text-navy uppercase text-[11px] font-bold tracking-[2.4px] mb-4">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          <span className="transition-colors duration-300 group-hover:text-royal">
            {data.eyebrow}
          </span>
          <span className="w-8 h-0.5 bg-gold transition-all duration-500 ease-out group-hover:w-14" />
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-[62px] font-heading font-bold text-heading leading-[1.06] tracking-tight max-w-[630px]">
          {data.titleLines.map((line, i) => (
            <span
              className={`block reveal reveal-left ${delays[i] ?? "delay-200"} ${
                line.accent
                  ? "text-[#e8a52a] bg-gradient-to-r from-[#d98200] via-[#ffb800] to-[#e8a52a] bg-clip-text text-transparent drop-shadow-sm"
                  : ""
              }`}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
              key={i}
            >
              {line.text}
            </span>
          ))}
        </h1>
        <p className="reveal delay-250 text-muted text-base sm:text-lg max-w-[500px] my-5 leading-relaxed">
          {data.description}
        </p>
        <div className="reveal delay-300 inline-block transition-transform duration-300 hover:scale-[1.02]">
          <PrimaryButton button={data.button} />
        </div>
      </div>
    </section>
  );
}
