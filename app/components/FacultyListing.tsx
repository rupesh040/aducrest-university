import { content } from "@/app/data";
import { SectionHeading } from "./Primitives";
import { PaginatedGrid } from "./Interactive";
import { FacultyCard } from "./FacultyCard";
import type { ListingSection } from "@/app/data/types";

export function FacultyListing({ data }: { data: ListingSection }) {
  return (
    <section className="section-padding listing-section">
      <div className="container">
        <SectionHeading heading={data.heading} />
        <PaginatedGrid pageSize={data.pageSize}>
          {content.collections.faculty.map((f) => (
            <FacultyCard key={f.id} faculty={f} />
          ))}
        </PaginatedGrid>
      </div>
    </section>
  );
}
