"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { content } from "@/app/data";
import type { HeaderSection } from "@/app/data/types";

export function Header({ data }: { data: HeaderSection }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [path]);

  // Prevent background scrolling on mobile when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 text-white transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-[#073b6c]/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,35,80,0.22)] py-0 border-b border-white/10"
            : "bg-gradient-to-r from-[#073b6c] via-[#093563] to-[#0b305b] shadow-md border-b border-transparent"
        }`}
      >
        {/* Luminous gold accent line at bottom when scrolled */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent transition-opacity duration-500 pointer-events-none ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        <div
          className={`container flex items-center justify-between gap-3 sm:gap-4 md:gap-10 transition-all duration-300 ${
            scrolled ? "h-16 md:h-[72px]" : "h-20 md:h-[84px]"
          }`}
        >
          {/* Brand Logo with responsive sizing to prevent mobile crowding */}
          <Link
            href="/"
            className="shrink-0 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] py-1"
            aria-label={content.brand.name}
            onClick={() => setOpen(false)}
          >
            <Image
              src={data.logo.src}
              alt={data.logo.alt}
              width={270}
              height={90}
              priority
              className="w-[155px] xs:w-[185px] sm:w-[220px] md:w-[250px] max-w-[60vw] sm:max-w-none h-auto max-h-[52px] sm:max-h-[72px] object-contain transition-all duration-300"
            />
          </Link>

          {/* Animated Hamburger / Close Button */}
          <button
            className="lg:hidden p-2 rounded-lg border border-white/20 text-white hover:bg-white/10 active:scale-95 transition-all duration-200 flex items-center justify-center shrink-0 w-10 h-10"
            type="button"
            aria-expanded={open}
            aria-controls="main-navigation"
            aria-label={open ? content.ui.closeMenu : content.ui.openMenu}
            onClick={() => setOpen(!open)}
          >
            <div className="w-6 h-6 relative flex items-center justify-center">
              <Menu
                size={24}
                className={`transition-all duration-300 ease-in-out ${
                  open
                    ? "opacity-0 rotate-90 scale-50"
                    : "opacity-100 rotate-0 scale-100"
                }`}
                aria-hidden="true"
              />
              <X
                size={24}
                className={`absolute transition-all duration-300 ease-in-out text-gold ${
                  open
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-50"
                }`}
                aria-hidden="true"
              />
            </div>
          </button>

          {/* Desktop Navigation Bar */}
          <nav
            id="desktop-navigation"
            className="hidden lg:flex lg:flex-row lg:items-center lg:gap-2 xl:gap-5 font-heading font-bold text-[16px] xl:text-[17px]"
          >
            {data.navigation.map((link) => {
              const isActive =
                link.href === "/" ? path === "/" : path.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 group hover:-translate-y-0.5 ${
                    isActive
                      ? "text-gold font-bold"
                      : "text-white/90 hover:text-gold hover:bg-white/5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{link.label}</span>
                  {/* Glowing animated underline on desktop */}
                  <span
                    className={`absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-gold to-[#ffd35a] rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,184,0,0.5)] ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 origin-center"
                    }`}
                  />
                </Link>
              );
            })}

            {/* CTA Button on Desktop */}
            <Link
              href={data.apply.href}
              className="primary-button group mt-0 ml-2 xl:ml-3 shrink-0 font-body font-semibold !text-navy transition-all duration-300 hover:shadow-[0_6px_20px_rgba(255,184,0,0.4)] hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>{data.apply.label}</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden="true"
              />
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          id="main-navigation"
          className={`lg:hidden absolute top-full left-0 right-0 bg-[#073b6c] border-t border-white/15 shadow-2xl transition-all duration-300 ease-out origin-top z-40 ${
            open
              ? "max-h-[calc(100dvh-70px)] opacity-100 scale-y-100 pointer-events-auto"
              : "max-h-0 opacity-0 scale-y-95 pointer-events-none overflow-hidden"
          }`}
        >
          <nav className="flex flex-col p-4 sm:p-6 gap-2 overflow-y-auto max-h-[calc(100dvh-90px)] font-heading font-bold text-base">
            {data.navigation.map((link, index) => {
              const isActive =
                link.href === "/" ? path === "/" : path.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ animationDelay: `${index * 35}ms` }}
                  className={`px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap flex items-center justify-between gap-2 animate-mobile-item ${
                    isActive
                      ? "text-gold font-bold bg-white/15"
                      : "text-white/90 hover:text-gold hover:bg-white/5 active:bg-white/10"
                  }`}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="text-sm sm:text-base">{link.label}</span>
                </Link>
              );
            })}

            {/* Mobile CTA Button - Full width, comfortable touch target */}
            <div className="pt-2">
              <Link
                href={data.apply.href}
                className="primary-button group w-full justify-center shrink-0 font-body font-semibold !text-navy min-h-[48px] transition-all duration-300 active:scale-[0.98]"
                onClick={() => setOpen(false)}
              >
                <span>{data.apply.label}</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Dimmed backdrop overlay covering the rest of the screen */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30 transition-opacity duration-300"
          style={{ top: scrolled ? "64px" : "80px" }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
