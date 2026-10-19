import { Quote } from 'lucide-react';
import { content } from '@/app/data';
import { Photo, SectionHeading } from './Primitives';
import { Carousel } from './Interactive';
import type { TestimonialsSection } from '@/app/data/types';

export function Testimonials({data}:{data:TestimonialsSection}){const items=content.collections.testimonials.filter(t=>data.testimonialIds.includes(t.id));return <section className="testimonials-section"><div className="container">{data.heading&&<SectionHeading heading={data.heading}/>}<Carousel columns={1} label={content.ui.testimonialNavigation} dark>{items.map(t=><figure className="testimonial" key={t.id}><div><Quote size={58} fill="currentColor"/><blockquote>{t.quote}</blockquote></div><figcaption><Photo asset={t.image} sizes="200px"/><strong>{t.name}</strong><span>{t.course}</span></figcaption></figure>)}</Carousel></div></section>;}
