import { Icon } from "./Primitives";
import type { TopbarSection } from "@/app/data/types";

export function Topbar({ data }: { data: TopbarSection }) {
  return (
    <div className="bg-[#f3f8fc] border-b border-[#dce5ed] text-[13px] text-[#213f60]">
      <div className="container h-[42px] flex items-center justify-center md:justify-between gap-5">
        <div className="flex items-center gap-3 md:gap-6 text-[10px] sm:text-xs md:text-[13px]">
          {data.contacts.map((item, i) => (
            <a
              href={item.href}
              key={item.label}
              className={`flex items-center gap-2 md:gap-2.5 leading-5 transition-all duration-200 hover:text-navy hover:-translate-y-0.5 ${
                i === 0 ? "hidden md:flex" : "flex"
              } ${i < data.contacts.length - 1 ? "pr-3 md:pr-6 border-r border-[#c7d1dc]" : ""}`}
            >
              <span className="text-gold shrink-0 transition-transform duration-200 group-hover:scale-110">
                <Icon name={item.icon} size={16} />
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-6">
          {data.socials.map((s) => (
            <a
              key={s.icon}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noreferrer"
              className="flex transition-all duration-200 hover:text-gold hover:scale-125 text-[#213f60]"
            >
              <Icon name={s.icon} size={15} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
