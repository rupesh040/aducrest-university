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
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 text-white transition-all duration-300 ${
        scrolled
          ? "bg-[#073b6c]/95 backdrop-blur-md shadow-lg py-0"
          : "bg-gradient-to-r from-[#073b6c] to-[#0b305b] shadow-md"
      }`}
    >
      <div
        className={`container flex items-center justify-between gap-4 md:gap-10 transition-all duration-300 ${
          scrolled ? "h-16 md:h-[72px]" : "h-20 md:h-[84px]"
        }`}
      >
        <Link
          href="/"
          className="shrink-0 transition-transform duration-300 hover:scale-[1.02]"
          aria-label={content.brand.name}
          onClick={() => setOpen(false)}
        >
          <Image
            src={data.logo.src}
            alt={data.logo.alt}
            width={270}
            height={90}
            priority
            className="w-[200px] sm:w-[230px] md:w-[250px] h-auto max-h-[76px] object-contain transition-all duration-300"
          />
        </Link>
        <button
          className="lg:hidden p-2 rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? content.ui.closeMenu : content.ui.openMenu}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav
          id="main-navigation"
          className={`${
            open
              ? "flex flex-col absolute top-full left-0 right-0 bg-[#073b6c]/98 backdrop-blur-lg p-6 border-t border-white/20 shadow-2xl gap-3 animate-fade-in"
              : "hidden lg:flex"
          } lg:static lg:flex-row lg:items-center lg:gap-8 lg:p-0 lg:bg-transparent lg:shadow-none font-heading font-bold text-base lg:text-[17px]`}
        >
          {data.navigation.map((link) => {
            const isActive =
              link.href === "/" ? path === "/" : path.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 lg:py-3 transition-colors duration-200 relative whitespace-nowrap group ${
                  isActive ? "text-gold font-bold" : "text-white/90 hover:text-gold"
                }`}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`hidden lg:block absolute bottom-0 left-0 h-0.5 bg-gold rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href={data.apply.href}
            className="primary-button mt-4 lg:mt-0 lg:ml-4 shrink-0 font-body font-semibold !text-navy"
            onClick={() => setOpen(false)}
          >
            {data.apply.label}
            <ArrowRight size={19} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
