import type { Metadata } from 'next';
import { content } from '@/lib/content';
import { SharedRenderer } from '@/lib/componentRegistry';
import './globals.css';
import '@/components/forms/forms.css';

export const metadata: Metadata = {
 title: { default: content.brand.name, template: '%s' }, description: content.brand.description,
 icons: { icon: '/images/logo.png' },
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body><a href="#main-content" className="skip-link">{content.ui.skipToContent}</a><SharedRenderer name="Topbar"/><SharedRenderer name="Header"/><main id="main-content">{children}</main><SharedRenderer name="Footer"/></body></html>;
}
