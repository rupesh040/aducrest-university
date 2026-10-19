import type { FormSectionConfig } from "@/app/data/types";
import { UniversityForm } from "./UniversityForm";

export function AdmissionForm({ data, initialCourse }: { data: FormSectionConfig; initialCourse?: string }) {
  return <UniversityForm data={data} kind="admission" initialCourse={initialCourse} />;
}
