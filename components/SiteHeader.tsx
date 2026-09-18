"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/content";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setOpen(false);
    setMobileAboutOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      firstMenuLinkRef.current?.focus();
    } else {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    }
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileAboutOpen(false);
        toggleRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!aboutOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setAboutOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [aboutOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,padding,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/92 py-3.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md"
          : "bg-transparent py-6.5"
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 font-serif text-text-ondark">
          <span className="relative h-9.5 w-9.5 flex-shrink-0">
            <Image src="/images/sigma-lambda-logo.png" alt="" fill sizes="38px" className="object-contain" />
          </span>
          <span className="leading-tight">
            <b className="block text-base font-semibold">SIGMA LAMBDA CHAPTER</b>
            <span className="mt-0.5 block font-sans text-[11px] tracking-[0.08em] text-gold-bright">
              ALPHA PHI ALPHA FRATERNITY, INC.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.href}
                ref={aboutRef}
                className="group relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <button
                  type="button"
                  className="relative flex items-center gap-1.5 py-1 text-[14.5px] font-medium text-text-ondark/90 hover:text-text-ondark"
                  aria-haspopup="true"
                  aria-expanded={aboutOpen}
                  onClick={() => setAboutOpen(true)}
                >
                  {link.label}
                  <Chevron open={aboutOpen} />
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-200 ${
                      aboutOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
                <div
                  className={`absolute left-0 top-full pt-3 transition-opacity duration-150 ${
                    aboutOpen ? "visible opacity-100" : "invisible opacity-0"
                  }`}
                >
                  <div className="min-w-[220px] rounded-md border border-line bg-ink p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setAboutOpen(false)}
                        className="block rounded px-3 py-2 text-[13.5px] text-text-ondark/80 hover:bg-white/5 hover:text-text-ondark"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 text-[14.5px] font-medium text-text-ondark/90 hover:text-text-ondark"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            )
          )}
          <Link
            href="/portal"
            className="rounded-sm bg-gold px-5 py-2.5 text-[13.5px] font-bold tracking-[0.02em] text-ink shadow-[0_18px_40px_-18px_rgba(140,109,27,0.45)] transition-transform hover:-translate-y-px"
          >
            Member Portal
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="flex h-9.5 w-10.5 items-center justify-center rounded border border-line text-lg text-gold-bright lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => (open ? closeMenu() : setOpen(true))}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-[99] flex flex-col overflow-y-auto bg-ink px-8 pt-25 pb-10 transition-transform duration-300 lg:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {navLinks.map((link, i) =>
          link.children ? (
            <div key={link.href} className="border-b border-line">
              <button
                type="button"
                className="flex w-full items-center justify-between py-3.5 font-serif text-2xl text-text-ondark"
                aria-expanded={mobileAboutOpen}
                onClick={() => setMobileAboutOpen((v) => !v)}
              >
                {link.label}
                <Chevron open={mobileAboutOpen} />
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-300 ${
                  mobileAboutOpen ? "max-h-60" : "max-h-0"
                }`}
              >
                <div className="flex flex-col gap-1 pb-4 pl-2">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={closeMenu}
                      className="py-2 font-sans text-base text-text-ondark/75"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              ref={i === 0 ? firstMenuLinkRef : undefined}
              onClick={closeMenu}
              className="border-b border-line py-3.5 font-serif text-2xl text-text-ondark"
            >
              {link.label}
            </Link>
          )
        )}
        <Link
          href="/portal"
          onClick={closeMenu}
          className="border-b border-line py-3.5 font-serif text-2xl text-text-ondark"
        >
          Member Portal
        </Link>
      </div>
    </header>
  );
}
