import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content, getCourse, section } from "@/app/data";
import { PageBanner } from "@/app/components/PageBanner";
import { CourseDetail } from "@/app/components/CourseDetail";
import type { BannerSection, CourseDetailSection } from "@/app/data/types";

export function generateStaticParams() {
  return content.collections.courses.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCourse(slug);
  if (!item) return {};
  return {
    title: `${item.title} | ${content.brand.name}`,
    description: item.overview[0],
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCourse(slug);
  if (!item) notFound();

  return (
    <>
      <PageBanner
        data={section<BannerSection>(
          "banner-course-detail",
          "EducationInnerBanner1",
        )}
        course={item}
      />
      <CourseDetail
        data={section<CourseDetailSection>(
          "course-detail",
          "EducationCourseDetail1",
        )}
        course={item}
      />
    </>
  );
}
