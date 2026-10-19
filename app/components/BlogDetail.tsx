import Link from "next/link";
import { CalendarDays, GraduationCap, UserRound } from "lucide-react";
import { content, getBlog } from "@/app/data";
import { Photo } from "./Primitives";
import { ArticleBlock } from "./ArticleBlock";
import type { Blog, BlogDetailSection } from "@/app/data/types";

export function BlogDetail({
  data,
  blog,
}: {
  data: BlogDetailSection;
  blog: Blog;
}) {
  const recent = data.recentSlugs
    .map(getBlog)
    .filter((b): b is Blog => Boolean(b) && b?.slug !== blog.slug);

  return (
    <section className="section-padding bg-surface">
      <div className="container grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-12 items-start">
        <article className="reveal min-w-0">
          <div className="aspect-[1.8] sm:aspect-[2.2] rounded-xl overflow-hidden mb-5 shadow-sm">
            <Photo asset={blog.image} className="w-full h-full transition-transform duration-500 hover:scale-[1.02]" priority />
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-[13px] text-navy font-medium mb-4">
            <span className="flex items-center gap-1.5">
              <GraduationCap size={17} />
              {blog.category}
            </span>
            <span className="border-l border-[#dce3ed] pl-4 flex items-center gap-1.5 text-muted">
              <CalendarDays size={16} />
              {blog.date}
            </span>
            <span className="border-l border-[#dce3ed] pl-4 flex items-center gap-1.5 text-navy">
              <UserRound size={16} />
              {content.ui.by} {blog.author}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight my-4">
            {blog.highlight
              ? blog.title.slice(0, -blog.highlight.length)
              : blog.title}
            {blog.highlight && (
              <em className="not-italic text-[#eda700]">{blog.highlight}</em>
            )}
          </h2>
          <div className="space-y-4">
            {blog.blocks.map((b, i) => (
              <ArticleBlock block={b} key={i} />
            ))}
          </div>
        </article>
        <aside className="reveal reveal-left delay-150 bg-white p-5 sm:p-6 rounded-xl shadow-card border border-[#e8eef6] transition-all duration-300 hover:shadow-lift">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-heading mb-2">
            {data.recentTitle}
          </h2>
          <span className="tiny-rule !mx-0" />
          <div className="divide-y divide-[#e8eef4] mt-4">
            {recent.map((b) => (
              <article
                className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-3.5 py-4 first:pt-2 last:pb-0 items-center"
                key={b.id}
              >
                <Link
                  href={`/blog/${b.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="block h-20 sm:h-24 rounded-lg overflow-hidden shrink-0"
                >
                  <Photo
                    asset={b.image}
                    className="w-full h-full"
                    sizes="120px"
                  />
                </Link>
                <div>
                  <span className="category-badge !text-[10px] !py-0 !px-2">
                    {b.category}
                  </span>
                  <h3 className="text-sm font-bold text-heading leading-snug my-1 line-clamp-2">
                    <Link
                      href={`/blog/${b.slug}`}
                      className="hover:text-gold transition-colors"
                    >
                      {b.title}
                    </Link>
                  </h3>
                  <span className="flex items-center gap-1 text-[11px] text-muted">
                    <CalendarDays size={13} />
                    {b.date}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
