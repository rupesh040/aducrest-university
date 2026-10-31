import { pageMetadata } from "@/app/lib/metadata";
import { section } from "@/app/data";
import { PageBanner } from "@/app/components/PageBanner";
import { CourseListing } from "@/app/components/CourseListing";
import type { BannerSection, ListingSection } from "@/app/data/types";

export const metadata = pageMetadata("courses");

export default function Page() {
  return (
    <>
      <PageBanner
        data={section<BannerSection>("banner-courses", "EducationInnerBanner1")}
      />
      <CourseListing
        data={section<ListingSection>("courses", "EducationCourseListing1")}
      />
    </>
  );
}
