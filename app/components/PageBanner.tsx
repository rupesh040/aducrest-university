import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Photo } from "./Primitives";
import type { BannerSection } from "@/app/data/types";

export function PageBanner({ data }: { data: BannerSection }) {
  return (
    <section className="page-banner">
      <Photo
        asset={data.image}
        priority
        className="banner-photo"
        sizes="100vw"
      />
      <div className="banner-overlay" />
      <div className="container banner-content">
        <h1>{data.title}</h1>
        <nav aria-label={data.title} className="breadcrumbs">
          <Home size={16} aria-hidden="true" />
          {data.breadcrumbs.map((item, i) => (
            <span key={`${item.label}-${i}`}>
              {i > 0 && <ChevronRight size={16} aria-hidden="true" />}
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
