/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 2026-02-13
 * Versión: 1.0
 *
 * Descripción:
 * Footer premium minimalista para Social Like con tokens CSS, links internos por ancla
 * y crédito "Desarrollado por SoftFusion" con link externo seguro.
 */

import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

function scrollToHash(href) {
  const id = String(href || '').replace('#', '');
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: 'Inicio', href: '#top' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Planes', href: '#planes' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Soft background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 h-[320px] w-[820px] blur-[85px] opacity-60"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(193,255,114,0.28), rgba(255,246,239,0.30), rgba(255,255,255,0) 66%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.04]" />
      </div>

      <div className="sl-container relative py-10">
        <div
          className="rounded-[34px] border border-black/10 bg-white/70 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.10)]"
          style={{
            WebkitBackdropFilter: 'blur(22px)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.62))'
          }}
        >
          <div className="px-6 py-6 sm:px-8 sm:py-7 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Brand */}
              <div>
                <div className="font-display text-[18px] sm:text-[20px] font-extrabold text-sl-negro">
                  Social Like
                </div>
                <div className="mt-1 text-[13px] text-black/65 font-semibold max-w-xl">
                  Estrategia, contenido y campañas para que tu marca se vea
                  profesional, conecte con tu audiencia y convierta.
                </div>
              </div>

              {/* Nav links */}
              <nav className="flex flex-wrap gap-2">
                {links.map((l) => (
                  <button
                    key={l.href}
                    type="button"
                    onClick={() => scrollToHash(l.href)}
                    className="px-3 py-2 rounded-2xl text-sm font-extrabold text-black/70 hover:text-black hover:bg-[rgba(255,246,239,0.70)] transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="h-px w-full bg-black/10" />

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-[12px] text-black/55 font-semibold">
                © {year} Social Like. Todos los derechos reservados.
              </div>

              <a
                href="https://softfusion.com.ar/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[12px] font-extrabold text-black/60 hover:text-black transition-colors"
                aria-label="Desarrollado por SoftFusion"
              >
                Desarrollado por{' '}
                <span className="font-display">SoftFusion</span>
                <FiArrowUpRight className="text-[14px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
