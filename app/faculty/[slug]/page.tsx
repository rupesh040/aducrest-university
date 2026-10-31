import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content, getFaculty, section } from "@/app/data";
import { PageBanner } from "@/app/components/PageBanner";
import { FacultyDetail } from "@/app/components/FacultyDetail";
import type { BannerSection, FacultyDetailSection } from "@/app/data/types";

export function generateStaticParams() {
  return content.collections.faculty.map((item) => ({
    slug: item.slug || item.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getFaculty(slug);
  if (!item) return {};
  return {
    title: `${item.name} - ${item.role} | ${content.brand.name}`,
    description:
      item.shortBio ||
      `${item.name} is ${item.role} in ${item.department} at ${content.brand.name}.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getFaculty(slug);
  if (!item) notFound();

  return (
    <>
      <PageBanner
        data={section<BannerSection>(
          "banner-faculty-detail",
          "EducationInnerBanner1",
        )}
        faculty={item}
      />
      <FacultyDetail
        data={section<FacultyDetailSection>(
          "faculty-detail",
          "EducationFacultyDetail1",
        )}
        faculty={item}
      />
    </>
  );
}
