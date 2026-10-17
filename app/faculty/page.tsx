import { PageRenderer } from '@/lib/componentRegistry';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('faculty');
export default function Page(){return <PageRenderer page="faculty"/>;}
