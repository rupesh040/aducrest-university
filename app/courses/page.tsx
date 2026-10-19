import { PageRenderer } from "@/app/components/ComponentRenderer";
import { pageMetadata } from "@/app/lib/metadata";
export const metadata = pageMetadata("courses");
export default function Page() {
  return <PageRenderer page="courses" />;
}
