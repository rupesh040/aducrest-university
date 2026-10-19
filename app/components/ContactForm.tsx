import type { FormSectionConfig } from "@/app/data/types";
import { UniversityForm } from "./UniversityForm";

export function ContactForm({ data }: { data: FormSectionConfig }) {
  return <UniversityForm data={data} kind="contact" />;
}
