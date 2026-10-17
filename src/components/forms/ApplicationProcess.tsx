import { ChevronRight } from "lucide-react";
import type { ApplicationProcessSection } from "@/types/content";
import { Icon, SectionHeading } from "@/components/ui/Primitives";

export function ApplicationProcess({ data }: { data: ApplicationProcessSection }) {
  return <section className="application-process section-padding"><div className="container">
    <SectionHeading heading={data.heading} />
    <ol className="application-steps">{data.steps.map((step, index) => <li key={step.title}>
      <span className="process-icon"><Icon name={step.icon} size={34} /></span>
      <div><h3><span>{String(index + 1).padStart(2, "0")}. </span>{step.title}</h3><p>{step.description}</p></div>
      {index < data.steps.length - 1 && <ChevronRight className="process-arrow" aria-hidden="true" size={22} />}
    </li>)}</ol>
  </div></section>;
}
