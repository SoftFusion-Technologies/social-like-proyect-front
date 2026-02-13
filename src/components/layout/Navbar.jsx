/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 2026-01-30
 * Versión: 2.0
 *
 * Descripción:
 * Navbar ultra moderno y responsive (Social Like). Incluye:
 * - ScrollSpy para resaltar la sección activa.
 * - Indicador animado tipo "pill" en el item activo (Framer Motion layoutId).
 * - Morphing visual al hacer scroll (glass + compact).
 * - Menú mobile estilo sheet con animaciones stagger.
 * - CTA con microinteracción y paleta consistente.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import logoNav from '../../assets/brand/logo_nav.jpeg';

const navItems = [
  { label: 'Inicio', href: '#top' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Planes', href: '#planes' },
  { label: 'Contacto', href: '#contacto' }
];

function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function scrollToHash(href) {
  if (!href?.startsWith('#')) return;
  const id = href.slice(1);

  if (!id || id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  // offset para sticky nav
  const navOffset = 84;
  const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function getActiveFromScroll(sectionIds) {
  // Elegimos la sección cuyo top está más cercano a un umbral (navOffset)
  const navOffset = 92;
  let active = 'top';
  let bestDist = Number.POSITIVE_INFINITY;

  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    const dist = Math.abs(rect.top - navOffset);
    if (rect.top <= navOffset + 120 && dist < bestDist) {
      bestDist = dist;
      active = id;
    }
  }

  // Si está arriba de todo, mantener "top"
  if (window.scrollY < 40) return 'top';
  return active;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('top');

  useLockBodyScroll(open);

  const sectionIds = useMemo(
    () => ['top', 'servicios', 'planes', 'portfolio', 'contacto'],
    []
  );

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ScrollSpy (simple, robusto)
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setActiveId(getActiveFromScroll(sectionIds));
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [sectionIds]);

  const shellClass = useMemo(() => {
    return [
      'fixed inset-x-0 top-0 z-50',
      'transition-all duration-300',
      scrolled ? 'bg-white/75 backdrop-blur-xl shadow-sm' : 'bg-transparent'
    ].join(' ');
  }, [scrolled]);

  // “morphing” sutil: más compacto cuando scrolleás
  const innerClass = useMemo(() => {
    return [
      'sl-container',
      'flex items-center justify-between',
      scrolled ? 'h-[66px]' : 'h-[72px]',
      scrolled
        ? 'border-b border-sl-gris-claro/70'
        : 'border-b border-transparent',
      'transition-all duration-300'
    ].join(' ');
  }, [scrolled]);

  const onNavClick = (e, href) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      setOpen(false);
      scrollToHash(href);
    }
  };

  const desktopItemBase =
    'relative px-3.5 py-2 rounded-2xl text-sm font-semibold transition-colors';
  const desktopItemText = 'text-black/70 hover:text-black';

  return (
    <header className={shellClass}>
      <div className={innerClass}>
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => onNavClick(e, '#top')}
          className="flex items-center gap-3 group"
          aria-label="Ir al inicio"
        >
          <motion.div
            className="relative"
            whileHover={{ rotate: -1.5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <img
              src={logoNav}
              alt="Social Like"
              className={[
                'h-10 w-10 rounded-2xl object-cover',
                'border border-sl-gris-claro shadow-sm'
              ].join(' ')}
              loading="eager"
            />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-sl-lima border border-white" />
          </motion.div>

          <div className="leading-tight">
            <div className="font-display text-[15px] sm:text-[16px] font-extrabold tracking-tight text-sl-negro">
              Social Like
            </div>
            <div className="text-[11px] sm:text-[12px] text-black/60">
              Creamos marcas que conectan
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((it) => {
            const id = it.href.replace('#', '') || 'top';
            const isActive = activeId === id;

            return (
              <a
                key={it.href}
                href={it.href}
                onClick={(e) => onNavClick(e, it.href)}
                className={[
                  desktopItemBase,
                  desktopItemText,
                  'hover:bg-sl-naranja/70'
                ].join(' ')}
              >
                {/* Pill activa animada */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-2xl bg-sl-lima/40"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}

                {/* Texto por encima */}
                <span className="relative z-10">{it.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* CTA Desktop */}
          <motion.a
            href="#contacto"
            onClick={(e) => onNavClick(e, '#contacto')}
            className={[
              'hidden sm:inline-flex items-center gap-2',
              'px-4 py-2 rounded-2xl text-sm font-extrabold',
              'bg-sl-negro text-white',
              'shadow-sm',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-sl-lima/60'
            ].join(' ')}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <span className="relative text-gray-800">
              Hablemos
              {/* shimmer sutil */}
              <span className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100" />
            </span>
            <FiArrowUpRight className="text-base" />
            <span className="ml-1 inline-flex h-2 w-2 rounded-full bg-sl-lima" />
          </motion.a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={[
              'md:hidden inline-flex items-center justify-center',
              'h-10 w-10 rounded-2xl border border-sl-gris-claro bg-white/85',
              'hover:bg-white transition-colors',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-sl-lima/60'
            ].join(' ')}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open ? 'true' : 'false'}
          >
            {open ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="relative z-50"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            >
              <div className="sl-container pb-4">
                <div className="rounded-3xl border border-sl-gris-claro bg-white/92 backdrop-blur-xl shadow-xl overflow-hidden">
                  <motion.div
                    className="p-3"
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.05 } }
                    }}
                  >
                    {navItems.map((it) => {
                      const id = it.href.replace('#', '') || 'top';
                      const isActive = activeId === id;

                      return (
                        <motion.a
                          key={it.href}
                          href={it.href}
                          onClick={(e) => onNavClick(e, it.href)}
                          variants={{
                            hidden: { y: -6, opacity: 0 },
                            show: { y: 0, opacity: 1 }
                          }}
                          className={[
                            'relative flex items-center justify-between',
                            'px-4 py-3 rounded-2xl',
                            'text-sm font-extrabold',
                            'text-sl-negro',
                            'hover:bg-sl-naranja/70 transition-colors'
                          ].join(' ')}
                        >
                          {isActive && (
                            <span className="absolute inset-0 rounded-2xl bg-sl-lima/35" />
                          )}
                          <span className="relative z-10">{it.label}</span>
                          <span className="relative z-10 text-black/40">→</span>
                        </motion.a>
                      );
                    })}
                  </motion.div>

                  <div className="p-3 pt-0">
                    <motion.a
                      href="#contacto"
                      onClick={(e) => onNavClick(e, '#contacto')}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 bg-sl-lima text-sl-negro font-extrabold"
                    >
                      Hablemos <FiArrowUpRight className="text-lg" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
