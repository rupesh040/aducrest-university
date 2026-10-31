import { pageMetadata } from "@/app/lib/metadata";
import { section } from "@/app/data";
import { PageBanner } from "@/app/components/PageBanner";
import { ApplicationSection } from "@/app/components/ApplicationSection";
import { ApplicationProcess } from "@/app/components/ApplicationProcess";
import type {
  BannerSection,
  ApplicationSection as ApplicationSectionData,
  ApplicationProcessSection,
} from "@/app/data/types";

export const metadata = pageMetadata("apply-now");

export default function Page() {
  return (
    <>
      <PageBanner
        data={section<BannerSection>(
          "banner-apply-now",
          "EducationInnerBanner1",
        )}
      />
      <ApplicationSection
        data={section<ApplicationSectionData>(
          "application",
          "EducationApplicationForm1",
        )}
      />
      <ApplicationProcess
        data={section<ApplicationProcessSection>(
          "application-process",
          "EducationApplicationProcess1",
        )}
      />
    </>
  );
}
