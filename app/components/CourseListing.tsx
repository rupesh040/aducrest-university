import { content } from "@/app/data";
import { SectionHeading } from "./Primitives";
import { PaginatedGrid } from "./Interactive";
import { CourseCard } from "./CourseCard";
import type { ListingSection } from "@/app/data/types";

export function CourseListing({ data }: { data: ListingSection }) {
  return (
    <section className="section-padding listing-section">
      <div className="container">
        <SectionHeading heading={data.heading} />
        <PaginatedGrid pageSize={data.pageSize}>
          {content.collections.courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </PaginatedGrid>
      </div>
    </section>
  );
}
