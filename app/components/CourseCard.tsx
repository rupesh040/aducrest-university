import Link from "next/link";
import { ArrowRight, Clock3, GraduationCap } from "lucide-react";
import { Photo } from "./Primitives";
import { content } from "@/app/data";
import type { Course } from "@/app/data/types";

export function CourseCard({
  course,
  eligibility = false,
}: {
  course: Course;
  eligibility?: boolean;
}) {
  return (
    <article className="lift-card flex flex-col h-full bg-white rounded-xl shadow-card group">
      <Link
        href={`/courses/${course.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="block aspect-[1.8] overflow-hidden"
      >
        <Photo
          asset={course.image}
          className="w-full h-full group-hover:scale-108 transition-transform duration-500 ease-out"
          sizes="(max-width: 600px) 100vw, (max-width: 1023px) 45vw, 25vw"
        />
      </Link>
      <div className="p-3.5 sm:p-4.5 flex flex-col flex-1">
        <div>
          <span className="category-badge group-hover:bg-[#ffd35a] transition-colors duration-200">{course.category}</span>
        </div>
        <h3 className="text-sm sm:text-base md:text-[17px] font-bold text-heading leading-snug my-2 min-h-[44px] line-clamp-2">
          <Link
            href={`/courses/${course.slug}`}
            className="hover:text-gold transition-colors duration-200"
          >
            {course.title}
          </Link>
        </h3>
        <div className="mt-auto pt-2 space-y-1.5 text-xs sm:text-[13px] text-muted">
          <p className="flex items-center gap-2 m-0">
            <Clock3
              size={16}
              className="text-heading shrink-0"
              aria-hidden="true"
            />
            <span>{course.duration}</span>
          </p>
          {eligibility && (
            <p className="flex items-center gap-2 m-0">
              <GraduationCap
                size={16}
                className="text-heading shrink-0"
                aria-hidden="true"
              />
              <span>{course.eligibility}</span>
            </p>
          )}
        </div>
        <Link
          className="flex items-center justify-between border-t border-[#e7edf2] mt-3.5 pt-3 text-xs sm:text-[13px] font-bold text-heading hover:text-navy transition-colors group/link"
          href={`/courses/${course.slug}`}
          aria-label={`${content.ui.viewDetails}: ${course.title}`}
        >
          <span>{content.ui.viewDetails}</span>
          <span className="round-arrow">
            <ArrowRight size={17} />
          </span>
        </Link>
      </div>
    </article>
  );
}
