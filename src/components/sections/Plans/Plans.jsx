/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 2026-02-13
 * Versión: 1.0
 *
 * Descripción:
 * Sección "Planes" con 3 cards premium (bento-ish), glass moderno, jerarquía visual fuerte,
 * y foco en conversión (CTA por plan + propuesta de plan personalizado). Respeta tokens CSS.
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowUpRight, FiStar, FiZap } from 'react-icons/fi';

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

function Price({ children }) {
  return (
    <div className="mt-4">
      <div className="font-display text-[34px] sm:text-[38px] font-extrabold tracking-tight text-sl-negro">
        {children}
      </div>
      <div className="text-[12px] font-semibold text-black/55">
        · Precio mensual ·
      </div>
    </div>
  );
}

function Chip({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-extrabold"
      style={{
        background: 'rgba(255,255,255,0.70)',
        border: '1px solid rgba(0,0,0,0.08)',
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

function Feature({ children }) {
  return (
    <div className="flex items-start gap-2">
      <span
        className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-xl"
        style={{
          background: 'rgba(193,255,114,0.30)',
          border: '1px solid rgba(0,0,0,0.10)'
        }}
      >
        <FiCheck
          className="text-[14px]"
          style={{ color: 'rgba(0,0,0,0.80)' }}
        />
      </span>
      <p className="text-[13px] leading-snug text-black/70 font-semibold">
        {children}
      </p>
    </div>
  );
}

function PlanCard({ plan, featured = false }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    e.currentTarget.style.setProperty('--mx', `${x}px`);
    e.currentTarget.style.setProperty('--my', `${y}px`);
  };

  return (
    <motion.article
      onMouseMove={onMove}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className={[
        'group relative overflow-hidden rounded-[32px] p-6 sm:p-7',
        'border border-black/10 bg-white/70 backdrop-blur-xl',
        'shadow-[0_20px_70px_rgba(0,0,0,0.12)]',
        featured ? 'lg:scale-[1.03] ring-1 ring-black/10' : ''
      ].join(' ')}
      style={{
        WebkitBackdropFilter: 'blur(22px)',
        background: featured
          ? 'linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.66))'
          : 'linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.62))'
      }}
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(650px circle at var(--mx) var(--my), rgba(193,255,114,0.22), rgba(255,246,239,0.16), rgba(255,255,255,0) 58%)'
        }}
      />

      {/* highlight ribbon for featured */}
      {featured && (
        <div className="absolute -top-12 right-8 rotate-[14deg]">
          <div
            className="rounded-full px-4 py-2 text-[12px] font-extrabold inline-flex items-center gap-2"
            style={{
              background: 'var(--color-sl-lima)',
              color: 'var(--color-sl-negro)',
              boxShadow: '0 18px 50px rgba(193,255,114,0.35)',
              border: '1px solid rgba(0,0,0,0.10)'
            }}
          >
            <FiStar /> Recomendado
          </div>
        </div>
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-[12px] font-extrabold text-black/55 tracking-wide">
            PLAN
          </div>
          <div className="font-display text-[22px] sm:text-[24px] font-extrabold text-sl-negro">
            {plan.name}
          </div>
          <div className="mt-1 text-[13px] text-black/65 font-semibold">
            {plan.nickname}
          </div>
        </div>

        <div
          className="h-11 w-11 rounded-2xl flex items-center justify-center"
          style={{
            background: featured
              ? 'rgba(193,255,114,0.30)'
              : 'rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.10)'
          }}
        >
          <plan.icon
            className="text-[18px]"
            style={{ color: 'rgba(0,0,0,0.80)' }}
          />
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {plan.chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>

      <Price>{plan.price}</Price>

      <div className="relative mt-6 grid gap-2">
        {plan.features.map((f) => (
          <Feature key={f}>{f}</Feature>
        ))}
      </div>

      <div
        className="relative mt-6 rounded-3xl p-4"
        style={{
          background: 'rgba(255,246,239,0.55)',
          border: '1px solid rgba(0,0,0,0.10)'
        }}
      >
        <div className="text-[12px] font-extrabold text-black/60">
          Ideal para
        </div>
        <div className="mt-1 text-[13px] text-black/70 font-semibold leading-snug">
          {plan.idealFor}
        </div>
      </div>

      <div className="relative mt-6 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => scrollToId('contacto')}
          className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-extrabold"
          style={{
            background: featured ? 'var(--color-sl-negro)' : 'rgba(0,0,0,0.06)',
            color: featured ? 'white' : 'rgba(0,0,0,0.78)',
            border: featured
              ? '1px solid rgba(0,0,0,0.12)'
              : '1px solid rgba(0,0,0,0.10)',
            boxShadow: featured ? '0 14px 40px rgba(0,0,0,0.16)' : 'none'
          }}
        >
          Quiero este plan <FiArrowUpRight className="text-lg" />
          {featured && (
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: 'var(--color-sl-lima)' }}
            />
          )}
        </button>

        <div className="text-[12px] text-black/55 font-semibold text-center">
          Te respondemos con pasos claros y propuesta.
        </div>
      </div>
    </motion.article>
  );
}

export default function Plans() {
  const plans = useMemo(
    () => [
      {
        key: 'esencial',
        name: 'Esencial',
        nickname: 'Impulso',
        price: '$270.000',
        icon: FiZap,
        chips: [
          '4 publicaciones / mes',
          '1 por semana',
          '6 historias / semana'
        ],
        features: [
          'Calendario de contenido mensual',
          'Diseño de contenido (posts, reels, historias)',
          'Redacción de textos (copywriting sencillo)',
          'Hashtags estratégicos',
          'Revisión mensual del rendimiento',
          'Fotos y videos'
        ],
        idealFor:
          'Emprendedores y marcas que quieren empezar con presencia profesional sin complicarse.'
      },
      {
        key: 'intermedio',
        name: 'Intermedio',
        nickname: 'Crecimiento',
        price: '$300.000',
        icon: FiStar,
        chips: [
          '8 publicaciones / mes',
          '2 por semana',
          '8 historias / semana'
        ],
        features: [
          'Calendario de contenido completo',
          'Diseño de contenido (posts, reels, historias)',
          'Copywriting profesional y persuasivo',
          'Revisión mensual con informe de métricas',
          'Fotos y videos',
          'Historias con interacción (encuestas, preguntas, etc.)'
        ],
        idealFor:
          'Marcas que ya están creciendo y buscan consolidar su presencia digital y generar más consultas.'
      },
      {
        key: 'premium',
        name: 'Premium',
        nickname: 'Presencia Total',
        price: '$330.000',
        icon: FiArrowUpRight,
        chips: [
          '12 publicaciones / mes',
          '3 por semana',
          '12 historias / semana'
        ],
        features: [
          'Diseño de contenido (posts, reels, historias)',
          'Redacción estratégica',
          'Gestión de comunidad (mensajes y comentarios)',
          'Reunión mensual de estrategia + reporte de métricas',
          'Optimización constante de la estrategia',
          'Fotos y videos'
        ],
        idealFor:
          'Marcas que quieren delegar todo el contenido y enfocarse en vender, crecer y escalar.'
      }
    ],
    []
  );

  return (
    <section id="planes" className="relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-28 left-1/2 -translate-x-1/2 h-[420px] w-[920px] blur-[85px] opacity-60"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(255,246,239,0.50), rgba(193,255,114,0.22), rgba(255,255,255,0) 66%)'
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
            className="flex flex-wrap items-end justify-between gap-3"
          >
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-extrabold"
                style={{
                  background: 'rgba(255,255,255,0.70)',
                  border: '1px solid rgba(0,0,0,0.08)',
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
                Presupuesto y planes
              </div>

              <div className="mt-4 font-display text-[28px] sm:text-[34px] md:text-[40px] leading-tight font-extrabold text-sl-negro max-w-3xl">
                Elegí el plan que se adapta a tu ritmo y{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(90deg, var(--color-sl-lima))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  convertí presencia en ventas
                </span>
                .
              </div>

              <div className="mt-3 text-[15px] sm:text-[16px] text-black/70 font-semibold max-w-2xl">
                Planes claros, ejecución constante y mejoras basadas en
                métricas. Si necesitás algo distinto, armamos un plan a medida.
              </div>
            </div>

            <motion.button
              variants={fadeUp}
              custom={1}
              type="button"
              onClick={() => scrollToId('contacto')}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-extrabold"
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
            </motion.button>
          </motion.div>

          {/* cards */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
            <motion.div variants={fadeUp} custom={2}>
              <PlanCard plan={plans[0]} />
            </motion.div>

            <motion.div variants={fadeUp} custom={3}>
              <PlanCard plan={plans[1]} featured />
            </motion.div>

            <motion.div variants={fadeUp} custom={4}>
              <PlanCard plan={plans[2]} />
            </motion.div>
          </div>

          {/* custom plan */}
          <motion.div
            variants={fadeUp}
            custom={5}
            className="mt-10 rounded-[34px] p-6 sm:p-7 border border-black/10 bg-white/70 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.10)]"
            style={{
              WebkitBackdropFilter: 'blur(22px)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.62))'
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="font-display text-[18px] sm:text-[20px] font-extrabold text-sl-negro">
                  ¿Necesitás un plan personalizado?
                </div>
                <div className="mt-1 text-[14px] text-black/70 font-semibold max-w-3xl">
                  Ajustamos objetivos, frecuencia, tipo de publicaciones y
                  presupuesto. Te proponemos una estructura clara para crecer
                  sin perder foco.
                </div>
              </div>

              <button
                type="button"
                onClick={() => scrollToId('contacto')}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-extrabold"
                style={{
                  background: 'var(--color-sl-lima)',
                  color: 'var(--color-sl-negro)',
                  border: '1px solid rgba(0,0,0,0.10)'
                }}
              >
                Armemos tu plan <FiArrowUpRight className="text-lg" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
