import { pageMetadata } from "@/app/lib/metadata";
import { section } from "@/app/data";
import { PageBanner } from "@/app/components/PageBanner";
import { ContactSection } from "@/app/components/ContactSection";
import type {
  BannerSection,
  ContactSection as ContactSectionData,
} from "@/app/data/types";

export const metadata = pageMetadata("contact");

export default function Page() {
  return (
    <>
      <PageBanner
        data={section<BannerSection>("banner-contact", "EducationInnerBanner1")}
      />
      <ContactSection
        data={section<ContactSectionData>("contact", "EducationContact1")}
      />
    </>
  );
}
