import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Photo } from "./Primitives";
import type { BannerSection, Course, Blog, Faculty } from "@/app/data/types";

interface PageBannerProps {
  data: BannerSection;
  course?: Course;
  blog?: Blog;
  faculty?: Faculty;
}

export function PageBanner({ data, course, blog, faculty }: PageBannerProps) {
  let breadcrumbs = data.breadcrumbs;

  if (course) {
    breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Course", href: "/courses" },
      { label: course.title },
    ];
  } else if (blog) {
    breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: blog.title },
    ];
  } else if (faculty) {
    breadcrumbs = [
      { label: "Home", href: "/" },
      { label: "Faculty", href: "/faculty" },
      { label: faculty.name },
    ];
  }

  return (
    <section className="py-8 relative h-52 sm:h-80 md:h-96 lg:h-[310px] grid place-items-center bg-[#242724] overflow-hidden">
      <div className="w-full h-full absolute inset-0">
        <Photo
          asset={data.image}
          priority
          className="w-full h-full transition-transform duration-700 ease-out hover:scale-105"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-90" />
      <div className="container relative z-10 text-center text-white max-w-container px-4">
        <h1 className="reveal reveal-down delay-100 font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-white tracking-tight leading-tight">
          {data.title}
        </h1>
        <nav
          aria-label={data.title}
          className="reveal delay-200 inline-flex items-center gap-1.5 bg-[#1e1a17]/60 border border-white/25 rounded-full px-4 py-2 mt-4 text-white font-bold text-xs sm:text-sm backdrop-blur-md max-w-full overflow-hidden shadow-lg"
        >
          <Home size={15} aria-hidden="true" className="shrink-0 text-gold" />
          {breadcrumbs.map((item, i) => (
            <span
              key={`${item.label}-${i}`}
              className="inline-flex items-center gap-1.5 min-w-0"
            >
              {i > 0 && (
                <ChevronRight
                  size={14}
                  aria-hidden="true"
                  className="opacity-70 shrink-0"
                />
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-gold transition-colors duration-200 shrink-0"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="text-gold truncate max-w-[180px] sm:max-w-xs md:max-w-md lg:max-w-lg"
                  title={item.label}
                >
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
