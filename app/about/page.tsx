import { pageMetadata } from "@/app/lib/metadata";
import { section } from "@/app/data";
import { PageBanner } from "@/app/components/PageBanner";
import { About } from "@/app/components/AboutSection";
import { PopularCourses } from "@/app/components/PopularCourses";
import { AdmissionCTA } from "@/app/components/AdmissionCTA";
import { FacultyPreview } from "@/app/components/FacultyPreview";
import type {
  BannerSection,
  AboutSection,
  PopularCoursesSection,
  AdmissionCTASection,
  FacultyPreviewSection,
} from "@/app/data/types";

export const metadata = pageMetadata("about");

export default function Page() {
  return (
    <>
      <PageBanner
        data={section<BannerSection>("banner-about", "EducationInnerBanner1")}
      />
      <About data={section<AboutSection>("about", "EducationAbout1")} />
      <PopularCourses
        data={section<PopularCoursesSection>(
          "popular-courses",
          "EducationPopularCourses1",
        )}
      />
      <AdmissionCTA
        data={section<AdmissionCTASection>(
          "admission-cta",
          "EducationAdmissionCTA1",
        )}
      />
      <FacultyPreview
        data={section<FacultyPreviewSection>(
          "faculty-preview",
          "EducationFaculty1",
        )}
      />
    </>
  );
}
