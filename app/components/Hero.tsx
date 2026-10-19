import { Photo, PrimaryButton } from "./Primitives";
import type { HeroSection } from "@/app/data/types";

export function Hero({ data }: { data: HeroSection }) {
  return (
    <section className="hero">
      <Photo
        asset={data.image}
        className="hero-photo"
        priority
        sizes="(max-width: 540px) 100vw, (max-width: 767px) 540px, 65vw"
      />
      <div className="hero-wash" aria-hidden="true" />
      <div className="container hero-content">
        <div className="eyebrow">
          {data.eyebrow}
          <span />
        </div>
        <h1>
          {data.titleLines.map((line, i) => (
            <span className={line.accent ? "accent" : ""} key={i}>
              {line.text}{" "}
            </span>
          ))}
        </h1>
        <p>{data.description}</p>
        <PrimaryButton button={data.button} />
      </div>
    </section>
  );
}
