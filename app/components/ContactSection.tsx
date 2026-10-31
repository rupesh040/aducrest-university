import type { ContactSection as ContactSectionData } from "@/app/data/types";
import { Icon, Photo, SectionHeading } from "@/app/components/Primitives";
import { ContactForm } from "./ContactForm";

function mapEmbedUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      ["google.com", "www.google.com", "maps.google.com"].includes(
        url.hostname,
      ) &&
      url.pathname.startsWith("/maps")
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export function ContactSection({ data }: { data: ContactSectionData }) {
  const embedUrl = mapEmbedUrl(data.map.embedUrl);
  return (
    <>
      <section className="section-padding py-8 bg-surface">
        <div className="container">
          <div className="reveal">
            <SectionHeading heading={data.heading} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-6 lg:gap-8 items-stretch">
            <div className="reveal reveal-right delay-100">
              <ContactForm data={data.form} />
            </div>
            <div className="reveal delay-200 flex flex-col gap-3.5 min-w-0">
              {data.information.map((information, i) => {
                const body = (
                  <>
                    <span className="contact-information-icon transition-transform duration-200 group-hover:scale-110">
                      <Icon name={information.icon} size={23} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-heading mb-1 group-hover:text-gold transition-colors">
                        {information.title}
                      </h3>
                      {information.lines.map((line, index) => (
                        <p
                          key={`${line}-${index}`}
                          className="text-xs text-muted leading-relaxed truncate"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </>
                );
                return information.href ? (
                  <a
                    className="contact-information-card group transition-all duration-300 hover:-translate-y-1 hover:shadow-form"
                    href={information.href}
                    key={`${information.title}-${i}`}
                  >
                    {body}
                  </a>
                ) : (
                  <div
                    className="contact-information-card group transition-all duration-300 hover:-translate-y-1 hover:shadow-form"
                    key={`${information.title}-${i}`}
                  >
                    {body}
                  </div>
                );
              })}
              <div className="pt-2 px-1">
                <h3 className="font-bold text-sm text-heading mb-2.5 after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gold after:mt-1.5">
                  {data.socialTitle}
                </h3>
                <div className="flex items-center gap-2.5 mt-2.5">
                  {data.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social transition-all duration-300 hover:scale-110 hover:bg-gold hover:text-white"
                    >
                      <Icon name={social.icon} size={19} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="reveal reveal-left delay-300 h-full min-h-[300px] rounded-xl overflow-hidden shadow-sm group">
              <Photo
                asset={data.image}
                className="w-full h-full min-h-[300px] transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 40vw, 27vw"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full relative" aria-label={data.map.title}>
        {embedUrl && (
          <iframe
            src={embedUrl}
            title={data.map.title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="w-full h-72 sm:h-96 md:h-[420px] border-0"
          />
        )}
        {data.map.notice ? (
          <p className="text-center text-xs text-muted py-3 bg-[#f0f4fa] m-0 border-t border-[#e2eaf2]">
            {data.map.notice}
          </p>
        ) : null}
      </section>
    </>
  );
}
