import { pageMetadata } from "@/app/lib/metadata";
import { section } from "@/app/data";
import { PageBanner } from "@/app/components/PageBanner";
import { FacultyListing } from "@/app/components/FacultyListing";
import type { BannerSection, ListingSection } from "@/app/data/types";

export const metadata = pageMetadata("faculty");

export default function Page() {
  return (
    <>
      <PageBanner
        data={section<BannerSection>("banner-faculty", "EducationInnerBanner1")}
      />
      <FacultyListing
        data={section<ListingSection>("faculty-list", "EducationFacultyListing1")}
      />
    </>
  );
}
