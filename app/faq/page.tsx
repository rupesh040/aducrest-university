import { pageMetadata } from "@/app/lib/metadata";
import { section } from "@/app/data";
import { PageBanner } from "@/app/components/PageBanner";
import { FAQSectionView } from "@/app/components/FAQAccordion";
import type { BannerSection, FAQSection as FAQSectionData } from "@/app/data/types";

export const metadata = pageMetadata("faq");

export default function Page() {
  return (
    <>
      <PageBanner
        data={section<BannerSection>("banner-faq", "EducationInnerBanner1")}
      />
      <FAQSectionView
        data={section<FAQSectionData>("faq", "EducationFAQ1")}
      />
    </>
  );
}
