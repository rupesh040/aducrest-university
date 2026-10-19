import { CalendarDays, UserRound } from "lucide-react";
import { content } from "@/app/data";
import {
  Photo,
  SectionHeading,
  CheckList,
  Icon,
  PrimaryButton,
} from "./Primitives";
import { VideoPreview } from "./Interactive";
import type { Course, CourseDetailSection, CourseMeta } from "@/app/data/types";

const metaIcons: Record<keyof CourseMeta, string> = {
  cost: "coins",
  instructor: "user",
  duration: "clock",
  students: "users",
  views: "eye",
  lessons: "fileText",
  language: "globe",
  certificate: "award",
};
export function CourseDetail({
  data,
  course,
}: {
  data: CourseDetailSection;
  course: Course;
}) {
  return (
    <section className="section-padding detail-section">
      <div className="container course-detail-grid">
        <article>
          <Photo
            asset={course.mainImage}
            className="course-main-image"
            priority
          />
          <div className="detail-meta">
            <span>
              <UserRound size={18} />
              {content.ui.by} {course.meta.instructor}
            </span>
            <span>
              <CalendarDays size={18} />
              {content.ui.lastUpdated} {course.updated}
            </span>
          </div>
          <h2 className="course-detail-title">{course.title}</h2>
          <SectionHeading heading={data.overviewHeading} align="left" />
          {course.overview.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <SectionHeading heading={data.outcomesHeading} align="left" />
          <CheckList items={course.outcomes} />
        </article>
        <aside className="course-sidebar">
          <div className="course-preview">
            <Photo asset={course.previewImage} />
            <VideoPreview url={course.videoUrl} />
          </div>
          <SectionHeading heading={data.detailsHeading} align="left" />
          <dl>
            {(Object.keys(metaIcons) as (keyof CourseMeta)[]).map((key) => (
              <div key={key}>
                <dt>
                  <Icon name={metaIcons[key]} size={20} />
                  {content.ui.metaLabels[key]}
                </dt>
                <dd>{course.meta[key]}</dd>
              </div>
            ))}
          </dl>
          <PrimaryButton
            button={{
              label: data.applyLabel,
              href: `/apply-now?course=${course.slug}`,
            }}
          />
        </aside>
      </div>
    </section>
  );
}
