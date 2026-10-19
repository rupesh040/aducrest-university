import Link from 'next/link';
import { ArrowRight, CalendarDays, GraduationCap } from 'lucide-react';
import { Photo } from './Primitives';
import { content } from '@/app/data';
import type { Blog } from '@/app/data/types';

export function BlogCard({blog}:{blog:Blog}){return <article className="blog-card lift-card"><Link href={`/blog/${blog.slug}`} tabIndex={-1} aria-hidden="true"><Photo asset={blog.image} sizes="(max-width: 767px) 100vw, 33vw"/></Link><div className="blog-card-body"><div className="post-meta"><span><GraduationCap size={17}/>{blog.category}</span><span><CalendarDays size={16}/>{blog.date}</span></div><h3><Link href={`/blog/${blog.slug}`}>{blog.title}</Link></h3><p>{blog.excerpt}</p><Link className="round-arrow" href={`/blog/${blog.slug}`} aria-label={`${content.ui.readMore}: ${blog.title}`}><ArrowRight size={19}/></Link></div></article>;}
