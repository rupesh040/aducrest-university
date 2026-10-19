import { content } from '@/app/data';
import { PrimaryButton } from '@/app/components/Primitives';
export default function NotFound(){return <section className="not-found"><div><h1>{content.ui.notFoundTitle}</h1><p>{content.ui.notFoundDescription}</p><PrimaryButton button={{label:content.ui.backHome,href:'/'}}/></div></section>;}
