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
    <section className="section-padding bg-surface">
      <div className="container grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-10 items-start">
        <article className="reveal min-w-0">
          <Photo
            asset={course.mainImage}
            className="w-full h-64 sm:h-72 md:h-80 rounded-xl shadow-sm mb-4 transition-transform duration-500 hover:scale-[1.01]"
            priority
          />
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 p-3.5 sm:p-4 bg-[#edf2fe] rounded-lg text-navy text-xs sm:text-[13px] font-medium my-4">
            <span className="flex items-center gap-2">
              <UserRound size={17} />
              {content.ui.by} {course.meta.instructor}
            </span>
            <span className="flex items-center gap-2 border-l border-[#d8dfeb] pl-4">
              <CalendarDays size={17} />
              {content.ui.lastUpdated} {course.updated}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-heading my-4">
            {course.title}
          </h2>
          <SectionHeading heading={data.overviewHeading} align="left" />
          <div className="space-y-3 mb-6">
            {course.overview.map((p, idx) => (
              <p
                key={idx}
                className="text-muted text-sm sm:text-base leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
          <SectionHeading heading={data.outcomesHeading} align="left" />
          <CheckList items={course.outcomes} />
        </article>
        <aside className="reveal reveal-left delay-150 bg-white p-5 sm:p-6 rounded-xl shadow-card border border-[#e8eef6] max-w-lg lg:max-w-none mx-auto w-full lg:sticky lg:top-28 transition-all duration-300 hover:shadow-lift">
          <div className="relative rounded-lg overflow-hidden aspect-[1.6] mb-5">
            <Photo asset={course.previewImage} className="w-full h-full" />
            <VideoPreview url={course.videoUrl} />
          </div>
          <SectionHeading heading={data.detailsHeading} align="left" />
          <dl className="divide-y divide-[#e9edf2] my-5 text-sm">
            {(Object.keys(metaIcons) as (keyof CourseMeta)[]).map((key) => (
              <div
                key={key}
                className="flex items-center justify-between py-3 gap-3"
              >
                <dt className="flex items-center gap-2.5 text-[#1f3e63] font-medium">
                  <Icon name={metaIcons[key]} size={18} />
                  {content.ui.metaLabels[key]}
                </dt>
                <dd className="m-0 font-semibold text-heading text-right">
                  {course.meta[key]}
                </dd>
              </div>
            ))}
          </dl>
          <PrimaryButton
            button={{
              label: data.applyLabel,
              href: `/contact`,
            }}
            className="w-full !text-base"
          />
        </aside>
      </div>
    </section>
  );
}
