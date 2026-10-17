import { PageRenderer } from '@/lib/componentRegistry';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('about');
export default function Page(){return <PageRenderer page="about"/>;}
