import { pageMetadata } from "@/app/lib/metadata";
import { section } from "@/app/data";
import { PageBanner } from "@/app/components/PageBanner";
import { BlogListing } from "@/app/components/BlogListing";
import type { BannerSection, ListingSection } from "@/app/data/types";

export const metadata = pageMetadata("blog");

export default function Page() {
  return (
    <>
      <PageBanner
        data={section<BannerSection>("banner-blog", "EducationInnerBanner1")}
      />
      <BlogListing
        data={section<ListingSection>("blog-list", "EducationBlogListing1")}
      />
    </>
  );
}
