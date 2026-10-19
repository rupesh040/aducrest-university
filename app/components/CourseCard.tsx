import Link from 'next/link';
import { ArrowRight, Clock3, GraduationCap } from 'lucide-react';
import { Photo } from './Primitives';
import { content } from '@/app/data';
import type { Course } from '@/app/data/types';

export function CourseCard({course,eligibility=false}:{course:Course;eligibility?:boolean}){return <article className="course-card lift-card"><Link href={`/courses/${course.slug}`} tabIndex={-1} aria-hidden="true"><Photo asset={course.image} sizes="(max-width: 600px) 100vw, (max-width: 1023px) 45vw, 25vw"/></Link><div className="course-card-body"><span className="category-badge">{course.category}</span><h3><Link href={`/courses/${course.slug}`}>{course.title}</Link></h3><p className="card-detail"><Clock3 size={17} aria-hidden="true"/><span>{course.duration}</span></p>{eligibility&&<p className="card-detail"><GraduationCap size={17} aria-hidden="true"/><span>{course.eligibility}</span></p>}<Link className="card-link" href={`/courses/${course.slug}`} aria-label={`${content.ui.viewDetails}: ${course.title}`}>{content.ui.viewDetails}<span className="round-arrow"><ArrowRight size={18}/></span></Link></div></article>;}
