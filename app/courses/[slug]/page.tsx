import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageRenderer } from '@/lib/componentRegistry';
import { content, getCourse } from '@/lib/content';
export function generateStaticParams(){return content.collections.courses.map(item=>({slug:item.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=getCourse(slug);if(!item)return {};return {title:`${item.title} | ${content.brand.name}`,description:item.overview[0]};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getCourse(slug);if(!item)notFound();return <PageRenderer page="course-detail" course={item}/>;}
