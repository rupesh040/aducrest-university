import type { ApplicationSection as ApplicationSectionData } from "@/app/data/types";
import {
  CheckList,
  Icon,
  Photo,
  SectionHeading,
} from "@/app/components/Primitives";
import { AdmissionForm } from "./AdmissionForm";

export function ApplicationSection({
  data,
  initialCourse,
}: {
  data: ApplicationSectionData;
  initialCourse?: string;
}) {
  return (
    <section className="section-padding bg-surface">
      <div className="container grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-10 items-start">
        <div className="reveal reveal-right">
          <AdmissionForm data={data.form} initialCourse={initialCourse} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="reveal reveal-left delay-100 rounded-2xl border border-[#e0e8ed] bg-white shadow-card overflow-hidden grid grid-cols-1 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center transition-all duration-300 hover:shadow-lift">
            <div className="p-5 sm:p-6 flex flex-col items-start">
              <SectionHeading heading={data.promo.heading} align="left" />
              <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                {data.promo.description}
              </p>
              <CheckList items={data.promo.benefits} />
            </div>
            <Photo
              asset={data.promo.image}
              className="application-promo-image self-end justify-self-center sm:justify-self-end w-full max-w-[340px] h-[240px] sm:h-[300px] aspect-[428/405] transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 495px) calc(100vw - 36px), (max-width: 767px) 460px, (max-width: 1023px) 47vw, (max-width: 1199px) 360px, 25vw"
            />
          </div>
          <div className="reveal delay-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.help.map((help) => (
              <a
                href={help.href}
                key={help.title}
                className="flex items-start gap-3.5 p-4 bg-white rounded-xl shadow-sm border border-[#e8eef6] transition-all duration-300 hover:shadow-form hover:-translate-y-1 text-muted no-underline group"
              >
                <span className="contact-information-icon !w-11 !h-11 transition-transform duration-200 group-hover:scale-110">
                  <Icon name={help.icon} size={20} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-heading mb-1 group-hover:text-gold transition-colors">
                    {help.title}
                  </h3>
                  <p className="text-[11px] text-muted leading-tight m-0 mb-1">
                    {help.description}
                  </p>
                  <strong className="text-xs font-bold text-navy truncate block">
                    {help.value}
                  </strong>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
