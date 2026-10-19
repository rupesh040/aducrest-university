import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageRenderer } from '@/app/components/ComponentRenderer';
import { content, getBlog } from '@/app/data';
export function generateStaticParams(){return content.collections.blogs.map(item=>({slug:item.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=getBlog(slug);if(!item)return {};return {title:`${item.title} | ${content.brand.name}`,description:item.excerpt};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getBlog(slug);if(!item)notFound();return <PageRenderer page="blog-detail" blog={item}/>;}
