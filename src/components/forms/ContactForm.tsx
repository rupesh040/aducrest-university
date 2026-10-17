import type { FormSectionConfig } from "@/types/content";
import { UniversityForm } from "./UniversityForm";

export function ContactForm({ data }: { data: FormSectionConfig }) {
  return <UniversityForm data={data} kind="contact" />;
}
