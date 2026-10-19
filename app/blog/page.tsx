import { PageRenderer } from "@/app/components/ComponentRenderer";
import { pageMetadata } from "@/app/lib/metadata";
export const metadata = pageMetadata("blog");
export default function Page() {
  return <PageRenderer page="blog" />;
}
