"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { nav, site } from "../../content/site";

const ease = [0.16, 1, 0.3, 1] as const;

function isNavActive(pathname: string, href: string) {
  if (href.startsWith("/#")) {
    return pathname === "/";
  }

  if (href.startsWith("mailto:") || href.startsWith("http")) {
    return false;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavLinkProps = {
  href: string;
  label: string;
  active?: boolean;
  external?: boolean;
  onNavigate?: () => void;
  className?: string;
};

function NavLink({
  href,
  label,
  active = false,
  external = false,
  onNavigate,
  className = "",
}: NavLinkProps) {
  const linkClassName = `nav-link text-base font-medium tracking-tight transition-colors ${
    active
      ? "text-[var(--accent)]"
      : "text-[var(--ink)] hover:text-[var(--accent)]"
  } ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {label}
      </a>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={linkClassName}>
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      prefetch={false}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={linkClassName}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  const closeMenu = () => setOpen(false);

  const navItems = [
    ...nav.map((item) => ({
      href: item.href,
      label: item.label,
      external: false,
    })),
    { href: `mailto:${site.email}`, label: "Email", external: false },
    { href: site.linkedin, label: "LinkedIn", external: true },
  ];

  return (
    <motion.header
      className="sticky top-0 z-40"
      initial={reduceMotion ? false : { y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 border-b"
        animate={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--bg) 84%, transparent)"
            : "color-mix(in srgb, var(--bg) 48%, transparent)",
          backdropFilter: scrolled ? "blur(14px)" : "blur(6px)",
          borderColor: scrolled ? "var(--rule)" : "rgba(228, 221, 212, 0)",
        }}
        transition={{ duration: 0.35, ease }}
      />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <div className="relative flex items-center justify-center py-4 sm:py-5">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
          >
            <Link
              href="/"
              prefetch={false}
              className="font-display shrink-0 text-xl font-extrabold tracking-[-0.03em] text-[var(--ink)] transition-opacity hover:opacity-75 sm:text-2xl"
            >
              {site.shortName}
            </Link>
          </motion.div>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 md:ml-10 md:flex"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : 0.14 + index * 0.06,
                  ease,
                }}
              >
                <NavLink
                  href={item.href}
                  label={item.label}
                  external={item.external}
                  active={isNavActive(pathname, item.href)}
                />
              </motion.div>
            ))}
          </nav>

          <motion.button
            type="button"
            className="absolute right-0 inline-flex items-center justify-center px-2 py-1 text-base font-medium text-[var(--ink)] md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          >
            {open ? "Close" : "Menu"}
          </motion.button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.nav
              id={menuId}
              aria-label="Primary"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0, transition: { duration: 0.22 } }
              }
              transition={{ duration: 0.32, ease }}
              className="overflow-hidden border-b border-[var(--rule)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col gap-2 px-1 py-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={
                      reduceMotion
                        ? undefined
                        : { opacity: 0, transition: { duration: 0.15 } }
                    }
                    transition={{
                      duration: 0.28,
                      delay: reduceMotion ? 0 : index * 0.04,
                      ease,
                    }}
                  >
                    <NavLink
                      href={item.href}
                      label={item.label}
                      external={item.external}
                      active={isNavActive(pathname, item.href)}
                      onNavigate={closeMenu}
                      className="inline-block py-1"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
