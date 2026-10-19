import Link from "next/link";
import { ArrowRight, CalendarDays, GraduationCap } from "lucide-react";
import { Photo } from "./Primitives";
import { content } from "@/app/data";
import type { Blog } from "@/app/data/types";

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <article className="lift-card flex flex-col h-full bg-white rounded-xl shadow-card group">
      <Link
        href={`/blog/${blog.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="block aspect-[1.65] overflow-hidden"
      >
        <Photo
          asset={blog.image}
          className="w-full h-full group-hover:scale-108 transition-transform duration-500 ease-out"
          sizes="(max-width: 767px) 100vw, 33vw"
        />
      </Link>
      <div className="p-4 sm:p-5 flex flex-col flex-1 relative pb-14">
        <div className="flex items-center gap-3 text-xs text-navy font-medium mb-3">
          <span className="flex items-center gap-1.5">
            <GraduationCap size={16} />
            {blog.category}
          </span>
          <span className="border-l border-[#dce3ed] pl-3 flex items-center gap-1.5 text-muted">
            <CalendarDays size={15} />
            {blog.date}
          </span>
        </div>
        <h3 className="font-heading font-bold text-lg sm:text-xl lg:text-[22px] text-heading leading-tight mb-2 line-clamp-2">
          <Link
            href={`/blog/${blog.slug}`}
            className="hover:text-gold transition-colors duration-200"
          >
            {blog.title}
          </Link>
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-4">
          {blog.excerpt}
        </p>
        <Link
          className="round-arrow absolute right-4 bottom-4"
          href={`/blog/${blog.slug}`}
          aria-label={`${content.ui.readMore}: ${blog.title}`}
        >
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
