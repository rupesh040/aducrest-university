import { Photo, PrimaryButton } from "./Primitives";
import type { HeroSection } from "@/app/data/types";

export function Hero({ data }: { data: HeroSection }) {
  return (
    <section className="relative min-h-[640px] md:min-h-[580px] lg:min-h-[640px] flex items-center bg-[#edf6fb] overflow-hidden">
      <div className="w-full md:w-[62%] h-[400px] md:h-full absolute inset-x-0 bottom-0 top-auto md:top-0 md:inset-x-auto md:right-0 reveal reveal-zoom delay-100">
        <Photo
          asset={data.image}
          className="w-full h-full"
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
      <div className="container relative z-10 pt-[34px] pb-[374px] md:py-[58px]">
        <div className="reveal reveal-down delay-75 flex items-center gap-3 text-navy uppercase text-[11px] font-bold tracking-[2.4px] mb-4">
          <span>{data.eyebrow}</span>
          <span className="w-8 h-0.5 bg-gold" />
        </div>

        <h1 className="reveal delay-150 text-3xl sm:text-5xl lg:text-[62px] font-heading font-bold text-heading leading-[1.06] tracking-tight max-w-[630px]">
          {data.titleLines.map((line, i) => (
            <span
              className={line.accent ? "text-[#e8a52a] block" : "block"}
              key={i}
            >
              {line.text}
            </span>
          ))}
        </h1>

        <p className="reveal delay-200 text-muted text-base sm:text-lg max-w-[500px] my-5 leading-relaxed">
          {data.description}
        </p>

        <div className="reveal delay-300 inline-block">
          <PrimaryButton button={data.button} />
        </div>
      </div>
    </section>
  );
}
