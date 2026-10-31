import { content } from "@/app/data";
import { SectionHeading } from "./Primitives";
import { Carousel } from "./Interactive";
import { BlogCard } from "./BlogCard";
import type { LatestBlogsSection } from "@/app/data/types";

export function LatestBlogs({ data }: { data: LatestBlogsSection }) {
  const blogs = data.blogSlugs.flatMap((slug) =>
    content.collections.blogs.filter((b) => b.slug === slug),
  );
  return (
    <section className="section-padding py-8 bg-surface">
      <div className="container">
        <div className="reveal">
          <SectionHeading heading={data.heading} />
        </div>
        <div className="reveal delay-150">
          <Carousel columns={data.pageSize} label={content.ui.blogsNavigation}>
            {blogs.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
