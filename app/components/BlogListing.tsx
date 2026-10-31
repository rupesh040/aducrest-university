import { content } from "@/app/data";
import { SectionHeading } from "./Primitives";
import { PaginatedGrid } from "./Interactive";
import { BlogCard } from "./BlogCard";
import type { ListingSection } from "@/app/data/types";

export function BlogListing({ data }: { data: ListingSection }) {
  return (
    <section className="section-padding py-8 bg-[#f3faff]">
      <div className="container">
        <div className="reveal">
          <SectionHeading heading={data.heading} />
        </div>
        <div className="reveal delay-100">
          <PaginatedGrid pageSize={data.pageSize} columns={3}>
            {content.collections.blogs.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </PaginatedGrid>
        </div>
      </div>
    </section>
  );
}
