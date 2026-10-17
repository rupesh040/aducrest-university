import source from '@/data/content.json';
import type { Blog, Course, EducationContent, PageId, SectionData } from '@/types/content';

export const content = source.Education as unknown as EducationContent;
export const activeTemplate = 'template-1';

export function getContent(): EducationContent { return content; }

export function getPage(page: PageId) {
  return content.templateComponents[activeTemplate].pages[page];
}

export function section<T extends SectionData = SectionData>(key: string, component: string): T {
  const variant = content.sections[key]?.variants[component];
  if (!variant) throw new Error(`Missing content variant: ${key}/${component}`);
  return variant as T;
}

export function getCourse(slug: string): Course | undefined {
  return content.collections.courses.find((course) => course.slug === slug);
}

export function getBlog(slug: string): Blog | undefined {
  return content.collections.blogs.find((blog) => blog.slug === slug);
}
