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
    <section className="section-padding detail-section">
      <div className="container blog-detail-grid">
        <article className="blog-article">
          <Photo asset={blog.image} className="article-featured" priority />
          <div className="post-meta article-meta">
            <span>
              <GraduationCap size={18} />
              {blog.category}
            </span>
            <span>
              <CalendarDays size={18} />
              {blog.date}
            </span>
            <span>
              <UserRound size={18} />
              {content.ui.by} {blog.author}
            </span>
          </div>
          <h2 className="article-title">
            {blog.highlight
              ? blog.title.slice(0, -blog.highlight.length)
              : blog.title}
            {blog.highlight && <em>{blog.highlight}</em>}
          </h2>
          {blog.blocks.map((b, i) => (
            <ArticleBlock block={b} key={i} />
          ))}
        </article>
        <aside className="recent-posts">
          <h2>{data.recentTitle}</h2>
          <span className="tiny-rule" />
          {recent.map((b) => (
            <article className="recent-post" key={b.id}>
              <Link href={`/blog/${b.slug}`} tabIndex={-1} aria-hidden="true">
                <Photo asset={b.image} sizes="120px" />
              </Link>
              <div>
                <span className="category-badge">{b.category}</span>
                <h3>
                  <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                </h3>
                <span className="recent-date">
                  <CalendarDays size={15} />
                  {b.date}
                </span>
              </div>
            </article>
          ))}
        </aside>
      </div>
    </section>
  );
}
