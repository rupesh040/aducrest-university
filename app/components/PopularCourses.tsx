import { content } from '@/app/data';
import { SectionHeading } from './Primitives';
import { Carousel } from './Interactive';
import { CourseCard } from './CourseCard';
import type { PopularCoursesSection } from '@/app/data/types';

export function PopularCourses({data}:{data:PopularCoursesSection}){const courses=content.collections.courses.filter(c=>data.courseSlugs.includes(c.slug));return <section className="section-padding courses-section"><div className="container"><SectionHeading heading={data.heading}/><Carousel columns={data.pageSize} label={content.ui.coursesNavigation}>{courses.map(c=><CourseCard key={c.id} course={c} eligibility/>)}</Carousel></div></section>;}
