import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRenderer } from "@/app/components/ComponentRenderer";
import { content, getFaculty } from "@/app/data";

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
  return <PageRenderer page="faculty-detail" faculty={item} />;
}
