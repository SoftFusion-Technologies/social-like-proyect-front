/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 2026-02-13
 * Versión: 1.0
 *
 * Descripción:
 * Sección "Servicios" estilo Bento + cards premium con spotlight hover (halo siguiendo el mouse),
 * micro-animaciones con Framer Motion y copy orientado a conversión. Respeta tokens CSS de paleta y fuentes.
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FiTarget,
  FiEdit3,
  FiUsers,
  FiTrendingUp,
  FiBarChart2,
  FiGlobe,
  FiArrowUpRight,
  FiCheck
} from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.08 * i, duration: 0.6, ease: 'easeOut' }
  })
};

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function SectionBadge({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-extrabold"
      style={{
        background: 'rgba(255,255,255,0.70)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        color: 'rgba(0,0,0,0.70)'
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: 'var(--color-sl-lima)',
          boxShadow: '0 0 10px rgba(193,255,114,0.85)'
        }}
      />
      {children}
    </div>
  );
}

function ServiceCard({ service, featured = false }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    e.currentTarget.style.setProperty('--mx', `${x}px`);
    e.currentTarget.style.setProperty('--my', `${y}px`);
  };

  const Icon = service.icon;

  return (
    <motion.article
      onMouseMove={onMove}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      className={[
        'group relative overflow-hidden rounded-[28px] p-5 sm:p-6',
        'border border-black/10 bg-white/70 backdrop-blur-xl',
        'shadow-[0_18px_60px_rgba(0,0,0,0.10)]',
        featured ? 'lg:col-span-2' : ''
      ].join(' ')}
      style={{
        WebkitBackdropFilter: 'blur(22px)',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.62))'
      }}
    >
      {/* spotlight hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx) var(--my), rgba(193,255,114,0.24), rgba(255,246,239,0.16), rgba(255,255,255,0) 55%)'
        }}
      />

      {/* top row */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{
              background: 'rgba(193,255,114,0.30)',
              border: '1px solid rgba(0,0,0,0.10)'
            }}
          >
            <Icon
              className="text-[18px]"
              style={{ color: 'rgba(0,0,0,0.80)' }}
            />
          </div>

          <div>
            <div className="font-display text-[16px] sm:text-[18px] font-extrabold text-sl-negro">
              {service.title}
            </div>
            <div className="mt-1 text-[13px] sm:text-[14px] text-black/65 font-semibold max-w-[42ch]">
              {service.subtitle}
            </div>
          </div>
        </div>

        <div
          className="hidden sm:inline-flex rounded-full px-3 py-1 text-[12px] font-extrabold"
          style={{
            background: 'rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.10)',
            color: 'rgba(0,0,0,0.65)'
          }}
        >
          {service.tag}
        </div>
      </div>

      {/* bullets */}
      <div className="relative mt-5 grid gap-2">
        {service.bullets.map((b) => (
          <div key={b} className="flex items-start gap-2">
            <span
              className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-xl"
              style={{
                background: 'rgba(255,246,239,0.70)',
                border: '1px solid rgba(0,0,0,0.10)'
              }}
            >
              <FiCheck
                className="text-[14px]"
                style={{ color: 'rgba(0,0,0,0.75)' }}
              />
            </span>
            <p className="text-[13px] text-black/70 font-semibold leading-snug">
              {b}
            </p>
          </div>
        ))}
      </div>

      {/* bottom hint */}
      <div className="relative mt-5 flex items-center justify-between">
        <div className="text-[12px] font-extrabold text-black/55">
          {service.outcome}
        </div>

        <div
          className="h-9 w-9 rounded-2xl flex items-center justify-center border border-black/10 bg-white/70"
          aria-hidden="true"
        >
          <FiArrowUpRight className="text-[18px] text-black/60 group-hover:text-black transition-colors" />
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const services = useMemo(
    () => [
      {
        key: 'estrategia',
        icon: FiTarget,
        title: 'Estrategia de Contenido',
        subtitle:
          'Dejamos de “publicar por publicar”: definimos qué decir, a quién, y con qué objetivo.',
        tag: 'Dirección',
        outcome: 'Más claridad, menos improvisación',
        bullets: [
          'Posicionamiento y mensajes que diferencian tu marca',
          'Pilares de contenido + calendario mensual',
          'Guía de tono: coherencia en todo lo que publicás'
        ]
      },
      {
        key: 'creacion',
        icon: FiEdit3,
        title: 'Creación de Contenido',
        subtitle:
          'Contenido que se ve profesional y hace que te elijan (diseño + copy).',
        tag: 'Contenido',
        outcome: 'Más confianza, mejor percepción',
        bullets: [
          'Diseños modernos alineados a tu identidad',
          'Textos que explican y venden sin presión',
          'Piezas optimizadas para alcance e interacción'
        ]
      },
      {
        key: 'cm',
        icon: FiUsers,
        title: 'Community Manager',
        subtitle:
          'Atención, respuestas y presencia activa para que tu marca se sienta “viva”.',
        tag: 'Gestión',
        outcome: 'Más cercanía, menos consultas perdidas',
        bullets: [
          'Respuesta y derivación con criterio',
          'Moderación y coherencia de marca',
          'Rutina operativa para sostener constancia'
        ]
      },
      {
        key: 'inversion',
        icon: FiTrendingUp,
        title: 'Manejo de Inversión',
        subtitle:
          'Campañas con objetivo real: consultas, ventas o leads (no solo “likes”).',
        tag: 'Ads',
        outcome: 'Más consultas con mejor calidad',
        bullets: [
          'Estructura y segmentación por intención',
          'Creatividades y copys de performance',
          'Optimización semanal para mejorar costo/resultado'
        ]
      },
      {
        key: 'reportes',
        icon: FiBarChart2,
        title: 'Análisis y Reportes',
        subtitle:
          'Medimos, interpretamos y mejoramos: decisiones con datos, no con suposiciones.',
        tag: 'Métricas',
        outcome: 'Más control y mejoras continuas',
        bullets: [
          'Indicadores claros (alcance, leads, costo, conversión)',
          'Informe simple: qué funcionó y qué ajustar',
          'Plan de acción para el próximo ciclo'
        ]
      },
      {
        key: 'web',
        icon: FiGlobe,
        title: 'Páginas y Sistemas Web',
        subtitle:
          'Tu base digital para convertir: landing pages rápidas, claras y enfocadas en contacto.',
        tag: 'Web',
        outcome: 'Más conversiones, mejor experiencia',
        bullets: [
          'Landing orientada a WhatsApp / formulario',
          'Mensajes y estructura pensados para convertir',
          'Optimización para mobile y velocidad'
        ]
      }
    ],
    []
  );

  return (
    <section id="servicios" className="relative overflow-hidden">
      {/* soft background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-28 left-1/2 -translate-x-1/2 h-[420px] w-[820px] blur-[80px] opacity-60"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(193,255,114,0.35), rgba(255,246,239,0.25), rgba(255,255,255,0) 65%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.04]" />
      </div>

      <div className="sl-container relative py-14 md:py-18">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <SectionBadge>Servicios incluidos</SectionBadge>

            <button
              type="button"
              onClick={() => scrollToId('planes')}
              className="hidden sm:inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-extrabold"
              style={{
                background: 'rgba(255,255,255,0.70)',
                border: '1px solid rgba(0,0,0,0.10)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                color: 'rgba(0,0,0,0.78)'
              }}
            >
              Ver planes <FiArrowUpRight />
            </button>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-5 font-display text-[28px] sm:text-[34px] md:text-[40px] leading-tight font-extrabold text-sl-negro max-w-3xl"
          >
            Servicios que hacen crecer tu marca con{' '}
            <span
              style={{
                background:
                  'linear-gradient(90deg, var(--color-sl-lima)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              estrategia, contenido y performance
            </span>
            .
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-3 text-[15px] sm:text-[16px] text-black/70 font-semibold max-w-2xl"
          >
            Elegís el plan, nosotros ejecutamos con un sistema claro: qué
            comunicar, cómo presentarlo y cómo convertirlo en consultas reales
            (con métricas y mejora continua).
          </motion.p>

          {/* Bento grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ServiceCard service={services[0]} featured />
            <ServiceCard service={services[1]} />
            <ServiceCard service={services[2]} />
            <ServiceCard service={services[3]} />
            <ServiceCard service={services[4]} featured />
            <ServiceCard service={services[5]} />
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
          >
            <button
              type="button"
              onClick={() => scrollToId('contacto')}
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-extrabold"
              style={{
                background: 'var(--color-sl-negro)',
                color: 'white',
                boxShadow: '0 14px 40px rgba(0,0,0,0.16)'
              }}
            >
              Pedir cotización <FiArrowUpRight className="text-lg" />
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: 'var(--color-sl-lima)' }}
              />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
