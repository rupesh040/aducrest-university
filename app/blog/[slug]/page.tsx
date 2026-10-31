import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content, getBlog, section } from "@/app/data";
import { PageBanner } from "@/app/components/PageBanner";
import { BlogDetail } from "@/app/components/BlogDetail";
import type { BannerSection, BlogDetailSection } from "@/app/data/types";

export function generateStaticParams() {
  return content.collections.blogs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getBlog(slug);
  if (!item) return {};
  return {
    title: `${item.title} | ${content.brand.name}`,
    description: item.excerpt,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getBlog(slug);
  if (!item) notFound();

  return (
    <>
      <PageBanner
        data={section<BannerSection>(
          "banner-blog-detail",
          "EducationInnerBanner1",
        )}
        blog={item}
      />
      <BlogDetail
        data={section<BlogDetailSection>(
          "blog-detail",
          "EducationBlogDetail1",
        )}
        blog={item}
      />
    </>
  );
}
