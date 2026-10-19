import { PageRenderer } from '@/app/components/ComponentRenderer';
import { pageMetadata } from '@/app/lib/metadata';
export const metadata = pageMetadata('about');
export default function Page(){return <PageRenderer page="about"/>;}
