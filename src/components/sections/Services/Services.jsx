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
import ServiceCard from './ServiceCard';
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
