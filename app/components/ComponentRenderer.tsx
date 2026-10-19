import type { ComponentType } from "react";
import { Topbar } from "@/app/components/Topbar";
import { Footer } from "@/app/components/Footer";
import { PageBanner } from "@/app/components/PageBanner";
import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { About } from "@/app/components/AboutSection";
import { PopularCourses } from "@/app/components/PopularCourses";
import { AdmissionCTA } from "@/app/components/AdmissionCTA";
import { FacultyPreview } from "@/app/components/FacultyPreview";
import { Testimonials } from "@/app/components/Testimonials";
import { LatestBlogs } from "@/app/components/LatestBlogs";
import { CourseListing } from "@/app/components/CourseListing";
import { FacultyListing } from "@/app/components/FacultyListing";
import { BlogListing } from "@/app/components/BlogListing";
import { CourseDetail } from "@/app/components/CourseDetail";
import { BlogDetail } from "@/app/components/BlogDetail";
import { FacultyDetail } from "@/app/components/FacultyDetail";
import { ContactSection } from "@/app/components/ContactSection";
import { ApplicationSection } from "@/app/components/ApplicationSection";
import { ApplicationProcess } from "@/app/components/ApplicationProcess";
import { FAQSectionView } from "@/app/components/FAQAccordion";
import { content, getPage, activeTemplate } from "@/app/data";
import type {
  SectionData,
  Course,
  Blog,
  Faculty,
  PageId,
} from "@/app/data/types";

interface RenderContext {
  course?: Course;
  blog?: Blog;
  faculty?: Faculty;
  initialCourse?: string;
}
interface RendererProps extends RenderContext {
  data: SectionData;
}
function component<T extends SectionData>(
  Component: ComponentType<{ data: T }>,
): ComponentType<RendererProps> {
  return function Variant({ data }) {
    return <Component data={data as T} />;
  };
}
export const componentRegistry = {
  EducationTopbar1: component(Topbar),
  EducationHeader1: component(Header),
  EducationFooter1: component(Footer),
  EducationHero1: component(Hero),
  EducationAbout1: component(About),
  EducationPopularCourses1: component(PopularCourses),
  EducationAdmissionCTA1: component(AdmissionCTA),
  EducationFaculty1: component(FacultyPreview),
  EducationTestimonials1: component(Testimonials),
  EducationBlog1: component(LatestBlogs),
  EducationInnerBanner1: ({ data, course, blog, faculty }: RendererProps) => (
    <PageBanner
      data={data as Parameters<typeof PageBanner>[0]["data"]}
      course={course}
      blog={blog}
      faculty={faculty}
    />
  ),
  EducationCourseListing1: component(CourseListing),
  EducationFacultyListing1: component(FacultyListing),
  EducationBlogListing1: component(BlogListing),
  EducationFAQ1: component(FAQSectionView),
  EducationContact1: component(ContactSection),
  EducationApplicationForm1: ({ data, initialCourse }: RendererProps) => (
    <ApplicationSection
      data={data as Parameters<typeof ApplicationSection>[0]["data"]}
      initialCourse={initialCourse}
    />
  ),
  EducationApplicationProcess1: component(ApplicationProcess),
  EducationCourseDetail1: ({ data, course }: RendererProps) =>
    course ? (
      <CourseDetail
        data={data as Parameters<typeof CourseDetail>[0]["data"]}
        course={course}
      />
    ) : null,
  EducationBlogDetail1: ({ data, blog }: RendererProps) =>
    blog ? (
      <BlogDetail
        data={data as Parameters<typeof BlogDetail>[0]["data"]}
        blog={blog}
      />
    ) : null,
  EducationFacultyDetail1: ({ data, faculty }: RendererProps) =>
    faculty ? (
      <FacultyDetail
        data={data as Parameters<typeof FacultyDetail>[0]["data"]}
        faculty={faculty}
      />
    ) : null,
} satisfies Record<string, ComponentType<RendererProps>>;
export type ComponentName = keyof typeof componentRegistry;
export function resolveComponent(
  name: string,
): ComponentType<RendererProps> | undefined {
  return Object.hasOwn(componentRegistry, name)
    ? componentRegistry[name as ComponentName]
    : undefined;
}
export function PageRenderer({
  page,
  ...context
}: { page: PageId } & RenderContext) {
  return (
    <>
      {getPage(page).components.map((mapping) => {
        const Component = resolveComponent(mapping.component);
        const data = content.sections[mapping.key]?.variants[mapping.component];
        if (!Component || !data) return null;
        return (
          <Component
            key={`${mapping.key}-${mapping.component}`}
            data={data}
            {...context}
          />
        );
      })}
    </>
  );
}
export function SharedRenderer({
  name,
}: {
  name: "Topbar" | "Header" | "Footer";
}) {
  const variant = content.templateComponents[activeTemplate].shared[name];
  const Component = Object.hasOwn(componentRegistry, variant)
    ? componentRegistry[variant as ComponentName]
    : undefined;
  const data = Object.values(content.sections)
    .map((s) => s.variants[variant])
    .find(Boolean);
  return Component && data ? <Component data={data} /> : null;
}
