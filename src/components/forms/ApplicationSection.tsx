import type { ApplicationSection as ApplicationSectionData } from "@/types/content";
import { CheckList, Icon, Photo, SectionHeading } from "@/components/ui/Primitives";
import { AdmissionForm } from "./AdmissionForm";

export function ApplicationSection({ data, initialCourse }: { data: ApplicationSectionData; initialCourse?: string }) {
  return (
    <section className="application-section section-padding">
      <div className="container application-grid">
        <AdmissionForm data={data.form} initialCourse={initialCourse} />
        <div className="application-aside">
          <div className="application-promo">
            <div className="application-promo-content">
              <SectionHeading heading={data.promo.heading} align="left" />
              <p>{data.promo.description}</p>
              <CheckList items={data.promo.benefits} />
            </div>
            <Photo asset={data.promo.image} className="application-promo-image" sizes="(max-width: 495px) calc(100vw - 36px), (max-width: 767px) 460px, (max-width: 1023px) 47vw, (max-width: 1199px) 360px, 25vw" />
          </div>
          <div className="application-help">
            {data.help.map((help) => <a href={help.href} key={help.title} className="application-help-card">
              <span className="contact-information-icon"><Icon name={help.icon} size={23} /></span>
              <h3>{help.title}</h3><p>{help.description}</p><strong>{help.value}</strong>
            </a>)}
          </div>
        </div>
      </div>
    </section>
  );
}
