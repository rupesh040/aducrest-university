import type { Metadata } from 'next';
import { getPage, content } from './content';
import type { PageId } from '@/types/content';
export function pageMetadata(page:PageId):Metadata{const data=getPage(page);return {title:data.title,description:data.description,openGraph:{title:data.title,description:data.description,siteName:content.brand.name,type:'website'}};}
