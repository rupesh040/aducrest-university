import { PageRenderer } from "@/app/components/ComponentRenderer";
import { pageMetadata } from "@/app/lib/metadata";
import { getCourse } from "@/app/data";
export const metadata = pageMetadata("apply-now");
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const slug = typeof params.course === "string" ? params.course : undefined;
  const initialCourse = slug ? getCourse(slug)?.id : undefined;
  return <PageRenderer page="apply-now" initialCourse={initialCourse} />;
}
