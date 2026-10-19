import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { content } from "@/app/data";
import { Icon } from "./Primitives";
import { ScrollToTop } from "./Interactive";
import type { FooterSection } from "@/app/data/types";

export function Footer({ data }: { data: FooterSection }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/">
            <Image
              src={data.logo.src}
              alt={data.logo.alt}
              width={310}
              height={104}
            />
          </Link>
          <p>{data.description}</p>
          <div className="footer-socials">
            {data.socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name={s.icon} size={23} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h2>{data.linksTitle}</h2>
          <ul className="footer-links">
            {data.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  {l.label}
                  <ChevronRight size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{data.coursesTitle}</h2>
          <ul className="footer-links">
            {data.courseLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  {/* <ChevronRight size={18} /> */}
                  {l.label}
                  <ChevronRight size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{data.addressTitle}</h2>
          <div className="footer-contacts">
            {data.contacts.map((c) => (
              <a key={c.label} href={c.href}>
                <span className="gold-circle">
                  <Icon name={c.icon} size={25} />
                </span>
                <span>
                  <strong>{c.label}</strong>
                  <span className="footer-contact-value">{c.value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="footer-demo-notice">{content.ui.demoNotice}</p>
      <div className="footer-bottom">
        <div className="copyright">
          <span />
          {data.copyright}
          <span />
        </div>
        <ScrollToTop />
      </div>
    </footer>
  );
}
