"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, ArrowUp, X, Play } from "lucide-react";
import { content } from "@/app/data";

export function Carousel({
  children,
  columns = 4,
  label,
  dark = false,
}: {
  children: ReactNode;
  columns?: number;
  label: string;
  dark?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(columns);
  const items = Children.toArray(children);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      const child = el.firstElementChild;
      if (child)
        setVisible(
          Math.max(
            1,
            Math.round(
              el.clientWidth / (child.getBoundingClientRect().width + 22),
            ),
          ),
        );
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pages = Math.max(1, Math.ceil(items.length / visible));
  const go = (page: number) => {
    const el = track.current;
    if (!el) return;
    const target = (page + pages) % pages;
    const first = el.firstElementChild;
    const stride = first
      ? (first.getBoundingClientRect().width +
          parseFloat(getComputedStyle(el).gap)) *
        visible
      : el.clientWidth;
    el.scrollTo({
      left: target * stride,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setIndex(target);
  };

  if (!items.length) return null;

  return (
    <div
      className={`carousel ${dark ? "is-dark" : ""}`}
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
    >
      <div
        ref={track}
        className={`carousel-track columns-${columns}`}
        onScroll={() => {
          const el = track.current;
          if (el)
            setIndex(
              Math.min(
                pages - 1,
                Math.round(
                  el.scrollLeft /
                    ((el.firstElementChild!.getBoundingClientRect().width +
                      parseFloat(getComputedStyle(el).gap)) *
                      visible),
                ),
              ),
            );
        }}
      >
        {items.map((item, i) => (
          <div className="carousel-slide" key={i}>
            {item}
          </div>
        ))}
      </div>
      {pages > 1 && (
        <div className="carousel-controls">
          <button
            type="button"
            className="circle-control"
            aria-label={content.ui.previous}
            onClick={() => go(index - 1)}
          >
            <ArrowLeft size={18} />
          </button>
          <div className="carousel-dots">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                className={i === index ? "active" : ""}
                aria-label={`${content.ui.goToSlide} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="circle-control"
            aria-label={content.ui.next}
            onClick={() => go(index + 1)}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export function PaginatedGrid({
  children,
  pageSize,
  columns = 4,
}: {
  children: ReactNode;
  pageSize: number;
  columns?: number;
}) {
  const items = Children.toArray(children);
  const [page, setPage] = useState(1);
  const total = Math.max(1, Math.ceil(items.length / pageSize));
  const start = useRef<HTMLDivElement>(null);

  const go = (p: number) => {
    setPage(p);
    start.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <div ref={start} className="scroll-mt-28">
      <div
        key={page}
        className={`grid gap-5 sm:gap-6 page-fade-in ${
          columns === 3
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {items.slice((page - 1) * pageSize, page * pageSize)}
      </div>
      {total > 1 && (
        <nav className="pagination" aria-label={content.ui.paginationLabel}>
          <button
            disabled={page === 1}
            aria-label={content.ui.previous}
            onClick={() => go(page - 1)}
          >
            <ArrowLeft size={18} />
          </button>
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              aria-label={`${content.ui.goToPage} ${i + 1}`}
              aria-current={page === i + 1 ? "page" : undefined}
              className={page === i + 1 ? "active" : ""}
              onClick={() => go(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === total}
            aria-label={content.ui.next}
            onClick={() => go(page + 1)}
          >
            <ArrowRight size={18} />
          </button>
        </nav>
      )}
    </div>
  );
}

export function ScrollToTop() {
  return (
    <button
      type="button"
      className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-gold text-navy shadow-md hover:bg-[#ffce52] transition-colors"
      aria-label={content.ui.scrollToTop}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        })
      }
    >
      <ArrowUp size={20} />
    </button>
  );
}

const YOUTUBE_SAMPLE_VIDEOS = [
  "ScMzIvxBSi4", // Open Source Animation
  "EngW7tLk6R8", // Harvard University Virtual Campus Tour
  "M576WGiDBdQ", // Stanford University Campus Walk
  "kJQP7kiw5Fk", // Trending Music
  "dQw4w9WgXcQ", // Classic Never Gonna Give You Up
  "LXb3EKWsInQ", // 4K Nature Tour
];

function formatYouTubeEmbedUrl(url: string | null | undefined): string {
  if (url && typeof url === "string" && url.trim()) {
    const trimmed = url.trim();
    if (trimmed.includes("youtube.com/embed/")) {
      const sep = trimmed.includes("?") ? "&" : "?";
      return `${trimmed}${sep}autoplay=1&rel=0`;
    }
    const watchMatch = trimmed.match(/[?&]v=([^&]+)/);
    if (watchMatch && watchMatch[1]) {
      return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&rel=0`;
    }
    const shortMatch = trimmed.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch && shortMatch[1]) {
      return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&rel=0`;
    }
    if (trimmed.startsWith("http")) {
      return trimmed;
    }
  }

  // Pick a random YouTube video from the curated list
  const randomId =
    YOUTUBE_SAMPLE_VIDEOS[
      Math.floor(Math.random() * YOUTUBE_SAMPLE_VIDEOS.length)
    ];
  return `https://www.youtube.com/embed/${randomId}?autoplay=1&rel=0`;
}

export function VideoPreview({
  url,
  title,
}: {
  url?: string | null;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeEmbedUrl, setActiveEmbedUrl] = useState<string>("");
  const close = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    setActiveEmbedUrl(formatYouTubeEmbedUrl(url));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveEmbedUrl(""); // Stop playback immediately on close
  };

  useEffect(() => {
    if (!open) return;
    const returnTarget = trigger.current;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialog.current?.querySelectorAll<HTMLElement>(
          'button, a[href], iframe, video[controls], [tabindex="0"]',
        ) ?? [],
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handler);
      returnTarget?.focus();
    };
  }, [open]);

  return (
    <>
      {/* Centered Play Button with Pulsing Ripple Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
        <span className="absolute w-16 h-16 rounded-full bg-gold/50 animate-ping pointer-events-none" />
        <button
          ref={trigger}
          type="button"
          className="relative z-10 w-14 h-14 bg-gradient-to-tr from-[#ffb800] to-[#ffd35a] text-navy rounded-full grid place-items-center shadow-[0_8px_25px_rgba(255,184,0,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 group focus-visible:outline-none"
          aria-label={content.ui.videoPreview}
          onClick={handleOpen}
        >
          <Play
            fill="currentColor"
            size={22}
            className="ml-0.5 text-navy transition-transform duration-200 group-hover:scale-110"
          />
        </button>
      </div>

      {/* Video Popup Modal Rendered at document.body level via React Portal */}
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] grid place-items-center bg-[#001428]/85 p-3 sm:p-6 backdrop-blur-md transition-opacity duration-300"
            onClick={handleClose}
          >
            <div
              ref={dialog}
              className="relative w-full max-w-3xl bg-[#072b4f] border border-white/15 rounded-2xl p-4 sm:p-6 shadow-2xl animate-fade-in"
              role="dialog"
              aria-modal="true"
              aria-labelledby="video-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
                <h2
                  id="video-title"
                  className="font-heading font-bold text-base sm:text-lg md:text-xl text-white truncate pr-2"
                >
                  {title ? `${title} — Video Preview` : content.ui.videoPreview}
                </h2>
                <button
                  ref={close}
                  className="grid place-items-center bg-white/10 hover:bg-gold hover:text-navy text-white rounded-full w-9 h-9 transition-colors shrink-0"
                  type="button"
                  aria-label={content.ui.closeVideo}
                  onClick={handleClose}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner border border-white/10">
                {activeEmbedUrl ? (
                  activeEmbedUrl.includes("youtube") ||
                  activeEmbedUrl.includes("youtu.be") ? (
                    <iframe
                      src={activeEmbedUrl}
                      title={title || "Course Video Preview"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <video
                      src={activeEmbedUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <div className="flex items-center justify-center h-full text-white/70 text-sm">
                    {content.ui.videoUnavailable}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
