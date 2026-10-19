import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import type { Faculty, FacultyDetailSection } from "@/app/data/types";

interface FacultyDetailProps {
  data: FacultyDetailSection;
  faculty: Faculty;
}

export function FacultyDetail({ data, faculty }: FacultyDetailProps) {
  const profileEyebrow = data.profileEyebrow || "FACULTY PROFILE";
  const contactTitle = data.contactTitle || "Get in Touch";
  const subjectsTitle = data.subjectsTitle || "Subjects Teaching";
  const aboutTitle = data.aboutTitle || "About";
  const educationTitle = data.educationTitle || "Education";
  const experienceTitle = data.experienceTitle || "Experience";

  const nameParts = faculty.name.trim().split(" ");
  const lastName = nameParts.length > 1 ? nameParts.pop() : "";
  const firstName = nameParts.join(" ");

  return (
    <section className="section-padding bg-[#f2f5f9]">
      <div className="container max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="reveal lg:col-span-8 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 space-y-10">
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-center sm:items-start">
              <div className="relative w-full sm:w-64 md:w-72 aspect-[4/5] rounded-2xl overflow-hidden shrink-0 shadow-sm border border-slate-100 bg-slate-50 group">
                <Image
                  src={faculty.image.src}
                  alt={faculty.image.alt || faculty.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 290px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 w-full text-center sm:text-left">
                <div className="inline-flex sm:flex items-center justify-center sm:justify-start gap-2.5 mb-2.5">
                  <span className="w-7 h-[3px] bg-amber-400 rounded-full inline-block" />
                  <span className="text-xs font-bold uppercase tracking-wider text-navy">
                    {profileEyebrow}
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl md:text-[44px] font-bold leading-tight tracking-tight text-navy">
                  {firstName}{" "}
                  {lastName && (
                    <span className="text-amber-500 font-bold">{lastName}</span>
                  )}
                </h1>

                <p className="text-base sm:text-lg font-medium text-slate-600 mt-1 mb-3.5">
                  {faculty.role}
                </p>

                {faculty.shortBio && (
                  <p className="text-xs sm:text-[14px] text-slate-600 leading-relaxed mb-6">
                    {faculty.shortBio}
                  </p>
                )}

                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                  {faculty.socials?.map((item, index) => {
                    const platform = item.platform.toLowerCase();

                    if (platform === "facebook") {
                      return (
                        <a
                          key={index}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${faculty.name} on Facebook`}
                          className="w-9 h-9 rounded-full bg-[#183b6b] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14 22v-9h3l.5-4H14V6.5c0-1 .3-1.5 1.7-1.5H18V1.4A25 25 0 0 0 14.8 1C11.6 1 10 3 10 6v3H7v4h3v9z" />
                          </svg>
                        </a>
                      );
                    }

                    if (platform === "linkedin") {
                      return (
                        <a
                          key={index}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${faculty.name} on LinkedIn`}
                          className="w-9 h-9 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="4.5" cy="4.5" r="2" />
                            <path d="M3 8h3v13H3zm5 0h3v2c1-1.5 2-2.3 4-2.3 3 0 5 1.5 5 5V21h-3v-7.5c0-2-.7-3-2.5-3S11 12 11 14v7H8z" />
                          </svg>
                        </a>
                      );
                    }

                    if (platform === "instagram") {
                      return (
                        <a
                          key={index}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${faculty.name} on Instagram`}
                          className="w-9 h-9 rounded-full bg-[#e1306c] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                        >
                          <svg
                            className="w-4 h-4 stroke-current fill-none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle
                              cx="17.5"
                              cy="6.5"
                              r="1.2"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      );
                    }

                    if (platform === "youtube") {
                      return (
                        <a
                          key={index}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${faculty.name} on YouTube`}
                          className="w-9 h-9 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                            />
                          </svg>
                        </a>
                      );
                    }

                    if (platform === "mail" || platform === "email") {
                      return (
                        <a
                          key={index}
                          href={item.href}
                          aria-label={`Email ${faculty.name}`}
                          className="w-9 h-9 rounded-full bg-amber-400 text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-sm"
                        >
                          <Mail size={16} strokeWidth={2.2} />
                        </a>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            </div>

            {faculty.about && faculty.about.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <h2 className="font-heading text-2xl sm:text-[26px] font-bold text-navy mb-4">
                  {aboutTitle} {faculty.name}
                </h2>
                <div className="space-y-3.5 text-xs sm:text-[14px] text-slate-600 leading-relaxed">
                  {faculty.about.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {faculty.education && faculty.education.length > 0 && (
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy">
                    {educationTitle}
                  </h3>
                  <div className="w-9 h-[3px] bg-amber-400 rounded-full mt-2 mb-6" />

                  <div className="relative pl-6 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-[2px] before:bg-slate-200">
                    {faculty.education.map((item, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-100/90" />
                        <h4 className="text-sm font-bold text-navy leading-snug">
                          {item.degree}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">
                          {item.institution}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {item.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {faculty.experience && faculty.experience.length > 0 && (
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-navy">
                    {experienceTitle}
                  </h3>
                  <div className="w-9 h-[3px] bg-amber-400 rounded-full mt-2 mb-6" />

                  <div className="relative pl-6 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-[2px] before:bg-slate-200">
                    {faculty.experience.map((item, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-100/90" />
                        <h4 className="text-sm font-bold text-navy leading-snug">
                          {item.position}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">
                          {item.institution}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {item.year}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="reveal reveal-left delay-150 lg:col-span-4 space-y-8">
            {faculty.contact && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-[#002563] px-6 py-5 text-white">
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    {contactTitle}
                  </h3>
                  <div className="w-9 h-[3px] bg-amber-400 rounded-full" />
                </div>

                <div className="p-6 sm:p-7 space-y-6">
                  {faculty.contact.phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#f0f4f9] flex items-center justify-center text-navy shrink-0 shadow-sm">
                        <Phone size={18} strokeWidth={2.2} />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-navy">
                          Phone
                        </span>
                        <a
                          href={`tel:${faculty.contact.phone}`}
                          className="text-xs sm:text-sm text-slate-600 hover:text-navy transition font-medium"
                        >
                          {faculty.contact.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {faculty.contact.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#f0f4f9] flex items-center justify-center text-navy shrink-0 shadow-sm">
                        <Mail size={18} strokeWidth={2.2} />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-navy">
                          Email
                        </span>
                        <a
                          href={`mailto:${faculty.contact.email}`}
                          className="text-xs sm:text-sm text-slate-600 hover:text-navy break-all transition font-medium"
                        >
                          {faculty.contact.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {faculty.contact.office && (
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#f0f4f9] flex items-center justify-center text-navy shrink-0 shadow-sm">
                        <MapPin size={18} strokeWidth={2.2} />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-navy">
                          Office
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line mt-0.5">
                          {faculty.contact.office}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {faculty.subjects && faculty.subjects.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-7">
                <h3 className="font-heading text-xl font-bold text-navy mb-5">
                  {subjectsTitle}
                </h3>
                <ul className="space-y-4">
                  {faculty.subjects.map((subject, idx) => (
                    <li key={idx} className="flex items-center gap-3.5">
                      <span className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-white shrink-0 shadow-sm">
                        <ChevronRight size={14} strokeWidth={3} />
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-700">
                        {subject}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
