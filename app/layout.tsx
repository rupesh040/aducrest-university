import type { Metadata } from "next";
import { content } from "@/app/data";
import { SharedRenderer } from "@/app/components/ComponentRenderer";
import { AnimationController } from "@/app/components/AnimationController";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: content.brand.name, template: "%s" },
  description: content.brand.description,
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-surface text-muted font-body antialiased min-h-screen flex flex-col">
        <AnimationController />
        <a
          href="#main-content"
          className="fixed top-2 left-3 z-[100] -translate-y-40 focus:translate-y-0 bg-gold px-4 py-2 text-navy font-bold rounded-md shadow-md transition-transform"
        >
          {content.ui.skipToContent}
        </a>
        <SharedRenderer name="Topbar" />
        <SharedRenderer name="Header" />
        <main id="main-content" className="flex-1 flex flex-col page-fade-in">
          {children}
        </main>
        <SharedRenderer name="Footer" />
      </body>
    </html>
  );
}
