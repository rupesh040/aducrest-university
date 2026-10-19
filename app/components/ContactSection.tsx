import type { ContactSection as ContactSectionData } from "@/app/data/types";
import { Icon, Photo, SectionHeading } from "@/app/components/Primitives";
import { ContactForm } from "./ContactForm";

function mapEmbedUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ["google.com", "www.google.com", "maps.google.com"].includes(url.hostname)
      && url.pathname.startsWith("/maps") ? url.href : undefined;
  } catch { return undefined; }
}

export function ContactSection({ data }: { data: ContactSectionData }) {
  const embedUrl = mapEmbedUrl(data.map.embedUrl);
  return (
    <>
      <section className="contact-section section-padding">
        <div className="container">
          <SectionHeading heading={data.heading} />
          <div className="contact-grid">
            <ContactForm data={data.form} />
            <div className="contact-information">
              {data.information.map((information) => {
                const body = <><span className="contact-information-icon"><Icon name={information.icon} size={23} /></span><div><h3>{information.title}</h3>{information.lines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}</div></>;
                return information.href
                  ? <a className="contact-information-card" href={information.href} key={information.title}>{body}</a>
                  : <div className="contact-information-card" key={information.title}>{body}</div>;
              })}
              <div className="contact-socials">
                <h3>{data.socialTitle}</h3>
                <div>{data.socials.map((social) => <a key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer" className={`contact-social contact-social--${social.icon}`}><Icon name={social.icon} size={21} /></a>)}</div>
              </div>
            </div>
            <Photo asset={data.image} className="contact-campus-image" sizes="(max-width: 767px) 100vw, (max-width: 1023px) 40vw, 27vw" />
          </div>
        </div>
      </section>
      <section className="contact-map" aria-label={data.map.title}>
        {embedUrl && <iframe src={embedUrl} title={data.map.title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />}
        <p className="map-notice">{data.map.notice}</p>
      </section>
    </>
  );
}
