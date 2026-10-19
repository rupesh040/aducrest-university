import { content } from "@/app/data";
import { SectionHeading } from "./Primitives";
import { Carousel } from "./Interactive";
import { CourseCard } from "./CourseCard";
import type { PopularCoursesSection } from "@/app/data/types";

export function PopularCourses({ data }: { data: PopularCoursesSection }) {
  const courses = content.collections.courses.filter((c) =>
    data.courseSlugs.includes(c.slug),
  );
  return (
    <section className="section-padding bg-[#f1faff]">
      <div className="container">
        <div className="reveal">
          <SectionHeading heading={data.heading} />
        </div>
        <div className="reveal delay-150">
          <Carousel columns={data.pageSize} label={content.ui.coursesNavigation}>
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} eligibility />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
