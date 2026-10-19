import { GraduationCap, Quote } from "lucide-react";
import { Photo, CheckList } from "./Primitives";
import type { BlogBlock } from "@/app/data/types";

export function ArticleBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-muted text-base sm:text-[17px] leading-relaxed my-4">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading my-6 pt-2 after:content-[''] after:block after:w-9 after:h-0.5 after:bg-gold after:mt-3">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <figure className="relative flex items-center gap-4 sm:gap-6 bg-[#edf4ff] border-l-4 border-gold rounded-lg my-7 p-5 sm:p-6 text-navy overflow-hidden">
          <Quote size={40} className="text-royal shrink-0" fill="currentColor" />
          <div className="z-10">
            <blockquote className="font-heading italic text-lg sm:text-xl font-bold leading-snug mb-2 text-navy">
              &ldquo;{block.text}&rdquo;
            </blockquote>
            <figcaption className="text-xs sm:text-sm font-semibold text-royal">
              {block.author}
              <span className="text-muted font-normal ml-2">{block.role}</span>
            </figcaption>
          </div>
          <GraduationCap
            className="hidden sm:block absolute right-4 bottom-2 text-navy/10"
            size={76}
          />
        </figure>
      );
    case "image":
      return (
        <div className="my-6 rounded-xl overflow-hidden aspect-[2.2] sm:aspect-[2.75]">
          <Photo asset={block.image} className="w-full h-full" />
        </div>
      );
    case "list":
      return <CheckList items={block.items} />;
  }
}
