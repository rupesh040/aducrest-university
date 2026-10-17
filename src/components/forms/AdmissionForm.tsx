import type { FormSectionConfig } from "@/types/content";
import { UniversityForm } from "./UniversityForm";

export function AdmissionForm({ data, initialCourse }: { data: FormSectionConfig; initialCourse?: string }) {
  return <UniversityForm data={data} kind="admission" initialCourse={initialCourse} />;
}
