import { content } from "@/app/data";
import { SectionHeading } from "./Primitives";
import { Carousel } from "./Interactive";
import { FacultyCard } from "./FacultyCard";
import type { FacultyPreviewSection } from "@/app/data/types";

export function FacultyPreview({ data }: { data: FacultyPreviewSection }) {
  const faculty = content.collections.faculty.filter((f) =>
    data.facultyIds.includes(f.id),
  );
  return (
    <section className="section-padding py-8 bg-[#f4faff]">
      <div className="container">
        <div className="reveal">
          <SectionHeading heading={data.heading} />
        </div>
        <div className="reveal delay-150">
          <Carousel columns={data.pageSize} label={content.ui.facultyNavigation}>
            {faculty.map((f) => (
              <FacultyCard key={f.id} faculty={f} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
