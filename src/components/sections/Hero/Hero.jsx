/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 2026-02-13
 * Versión: 1.1
 *
 * Descripción:
 * Hero cinematográfico estilo Premium SaaS para Social Like, con Glassmorphism cálido,
 * Aurora/Blob background, overlay generativo tipo grid/circuito (SVG), UI orbital
 * y micro-animaciones con Framer Motion. Copys orientados a conversión y métricas con count-up.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiPlay, FiCheck } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.08 * i, duration: 0.6, ease: 'easeOut' }
  })
};

const floaty = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } }
};

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-32 -left-36 h-[520px] w-[520px] rounded-full blur-[70px] opacity-70"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, var(--color-sl-lima) 0%, rgba(193,255,114,0.0) 60%)'
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full blur-[80px] opacity-70"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, var(--color-sl-naranja) 0%, rgba(255,246,239,0.0) 62%)'
        }}
      />
      <div
        className="absolute top-10 right-1/3 h-[460px] w-[460px] rounded-full blur-[75px] opacity-50"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, var(--color-sl-amarillo) 0%, rgba(255,254,240,0.0) 62%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.05]" />
    </div>
  );
}

function TechPatternOverlay() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.10] pointer-events-none"
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="black"
            strokeOpacity="0.16"
            strokeWidth="1"
          />
        </pattern>

        <pattern
          id="nodes"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="12" cy="12" r="2" fill="black" opacity="0.18" />
          <circle cx="100" cy="36" r="1.8" fill="black" opacity="0.14" />
          <circle cx="70" cy="92" r="1.6" fill="black" opacity="0.12" />
          <path
            d="M12 12 L100 36 L70 92"
            fill="none"
            stroke="black"
            strokeOpacity="0.10"
            strokeWidth="1"
          />
        </pattern>

        <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="black" stopOpacity="0.18" />
          <stop offset="60%" stopColor="black" stopOpacity="0.10" />
          <stop offset="100%" stopColor="black" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <rect width="1200" height="700" fill="url(#grid)" />
      <rect width="1200" height="700" fill="url(#nodes)" />
      <rect width="1200" height="700" fill="url(#fade)" />
    </svg>
  );
}

function OrbitalKinetics() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute right-[10%] top-[18%] h-[280px] w-[280px] rounded-full"
        style={{
          border: '1px solid rgba(0,0,0,0.08)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.4)'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        <motion.div
          className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full"
          style={{
            background: 'var(--color-sl-lima)',
            boxShadow: '0 0 18px rgba(193,255,114,0.85)'
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-6 right-10 h-3 w-3 rounded-full"
          style={{
            background: 'rgba(0,0,0,0.20)',
            boxShadow: '0 0 14px rgba(0,0,0,0.12)'
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        className="absolute right-[18%] top-[28%] h-[160px] w-[160px] rounded-full"
        style={{ border: '1px dashed rgba(0,0,0,0.10)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function ValueChip({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold"
      style={{
        background: 'rgba(255,255,255,0.70)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: 'var(--color-sl-lima)',
          boxShadow: '0 0 10px rgba(193,255,114,0.85)'
        }}
      />
      <span className="text-black/70">{children}</span>
    </div>
  );
}

function useCountUp({ from = 0, to = 100, duration = 900, start = true }) {
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!start) return;

    let raf = 0;
    const t0 = performance.now();
    const delta = to - from;

    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const next = from + delta * eased;
      setVal(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration, start]);

  return val;
}

function MetricCard({
  title,
  type = 'number',
  to,
  suffix = '',
  valueText,
  sub
}) {
  const animated = useCountUp({
    from: 0,
    to: typeof to === 'number' ? to : 0,
    duration: 900,
    start: type === 'number'
  });

  const displayValue =
    type === 'number' ? `${Math.round(animated)}${suffix}` : (valueText ?? '');

  return (
    <div
      className="rounded-3xl p-4"
      style={{
        background: 'rgba(255,255,255,0.70)',
        border: '1px solid rgba(0,0,0,0.10)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}
    >
      <div className="text-[12px] font-extrabold text-black/55">{title}</div>
      <div className="mt-1 font-display text-[18px] font-extrabold text-sl-negro">
        {displayValue}
      </div>
      <div className="mt-1 text-[12px] text-black/55 font-semibold">{sub}</div>
    </div>
  );
}

export default function Hero() {
  const chips = useMemo(
    () => [
      'Estrategia de Contenido',
      'Análisis y Reportes',
      'Campañas que Convierten'
    ],
    []
  );

  const bullets = useMemo(
    () => [
      'Más Consultas y Ventas (sin “posteos al azar”)',
      'Contenido Profesional para Ganar Confianza',
      'Resultados Medibles y Optimización Constante'
    ],
    []
  );

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, p)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onTiltMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const ry = (px - 0.5) * 10; // -5..+5
    const rx = -(py - 0.5) * 10; // -5..+5
    setTilt({ rx, ry });
  };

  const onTiltLeave = () => setTilt({ rx: 0, ry: 0 });
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: 'var(--color-sl-bg)' }}
    >
      <div className="absolute left-0 top-0 h-[3px] w-full bg-black/5">
        <motion.div
          className="h-full"
          style={{
            background:
              'linear-gradient(90deg, var(--color-sl-lima), rgba(193,255,114,0.25), var(--color-sl-naranja))',
            width: `${progress}%`,
            boxShadow: '0 0 18px rgba(193,255,114,0.55)'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 24 }}
        />
      </div>
      <AuroraBackground />
      <TechPatternOverlay />
      <OrbitalKinetics />

      <div className="sl-container relative py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              animate="show"
              viewport={{ once: true, amount: 0.35 }}
              className="flex flex-col gap-6"
            >
              <motion.div
                custom={0}
                variants={fadeUp}
                className="flex flex-wrap items-center gap-2"
              >
                {chips.map((c) => (
                  <ValueChip key={c}>{c}</ValueChip>
                ))}
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                className="font-display text-[40px] leading-[1.05] sm:text-[52px] md:text-[60px] tracking-tight text-sl-negro"
              >
                Hacé que tu Negocio se vea{' '}
                <span
                  style={{
                    background:
                      'linear-gradient(90deg, var(--color-sl-lima))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  Profesional
                </span>{' '}
                y transforme visitas en{' '}
                <span className="underline decoration-black/15 underline-offset-4">
                  Clientes.
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                className="text-[15px] sm:text-[16px] md:text-[18px] text-black/70 max-w-2xl"
              >
                Si tu negocio depende de “que te elijan”, necesitás presencia
                clara, contenido que convenza y campañas que traigan consultas
                reales. Nosotros lo armamos, lo medimos y lo mejoramos mes a
                mes.
              </motion.p>

              <motion.div
                custom={3}
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <motion.a
                  href="/social-like-cotizacion.pdf"
                  download
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-extrabold"
                  style={{
                    background: 'var(--color-sl-negro)',
                    color: 'white',
                    boxShadow: '0 14px 40px rgba(0,0,0,0.16)'
                  }}
                >
                  Pedir Cotización <FiArrowUpRight className="text-lg" />
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: 'var(--color-sl-lima)' }}
                  />
                </motion.a>

                <motion.a
                  href="#planes"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('planes');
                    if (el) {
                      const y =
                        el.getBoundingClientRect().top + window.scrollY - 84;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-extrabold"
                  style={{
                    background: 'rgba(255,255,255,0.70)',
                    border: '1px solid rgba(0,0,0,0.10)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    color: 'var(--color-sl-negro)'
                  }}
                >
                  Ver Planes <FiPlay className="text-lg" />
                </motion.a>
              </motion.div>

              <motion.div
                custom={5}
                variants={fadeUp}
                className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl"
              >
                {bullets.map((b) => (
                  <div
                    key={b}
                    className="flex items-start gap-2 rounded-2xl px-3 py-3"
                    style={{
                      background: 'rgba(255,255,255,0.60)',
                      border: '1px solid rgba(0,0,0,0.08)',
                      backdropFilter: 'blur(18px)',
                      WebkitBackdropFilter: 'blur(18px)'
                    }}
                  >
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-xl"
                      style={{
                        background: 'rgba(193,255,114,0.35)',
                        border: '1px solid rgba(0,0,0,0.08)'
                      }}
                    >
                      <FiCheck className="text-[14px]" />
                    </span>
                    <p className="text-[13px] leading-snug text-black/70 font-semibold">
                      {b}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <motion.div
              initial="hidden"
              animate="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={floaty}
              className="relative"
              style={{ perspective: 900 }}
            >
              <motion.div
                onMouseMove={onTiltMove}
                onMouseLeave={onTiltLeave}
                style={{
                  transformStyle: 'preserve-3d',
                  rotateX: tilt.rx,
                  rotateY: tilt.ry
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              >
                <div
                  className="absolute -inset-4 rounded-[36px] blur-2xl opacity-70"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(193,255,114,0.55), rgba(255,246,239,0.45), rgba(255,254,240,0.0) 70%)'
                  }}
                />

                <div
                  className="relative rounded-[34px] p-5 sm:p-6"
                  style={{
                    background: 'rgba(255,255,255,0.75)',
                    border: '1px solid rgba(0,0,0,0.10)',
                    boxShadow:
                      '0 20px 60px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.35)',
                    backdropFilter: 'blur(22px)',
                    WebkitBackdropFilter: 'blur(22px)'
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[12px] font-extrabold text-black/55">
                        Panel de Resultados
                      </div>
                      <div className="font-display text-[18px] font-extrabold text-sl-negro">
                        Crecimiento en Acción
                      </div>
                    </div>

                    <div
                      className="rounded-2xl px-3 py-2 text-[12px] font-extrabold"
                      style={{
                        background: 'rgba(193,255,114,0.40)',
                        border: '1px solid rgba(0,0,0,0.10)'
                      }}
                    >
                      Más Clientes{' '}
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <MetricCard
                      title="Alcance"
                      type="number"
                      to={38}
                      suffix="%"
                      sub="Últimos 14 Días"
                    />
                    <MetricCard
                      title="Interacción"
                      type="number"
                      to={22}
                      suffix="%"
                      sub="Mejor Calidad de Leads"
                    />
                    <MetricCard
                      title="Contenido"
                      type="number"
                      to={12}
                      suffix=""
                      sub="Piezas / Mes"
                    />
                    <MetricCard
                      title="Campañas"
                      type="text"
                      valueText="Activas"
                      sub="Optimización"
                    />
                  </div>

                  <div className="mt-5 rounded-3xl p-4 border border-black/10 bg-white/70">
                    <div className="flex items-center justify-between">
                      <div className="text-[12px] font-extrabold text-black/60">
                        Próximo Paso
                      </div>
                      <div className="text-[12px] font-extrabold text-black/60">
                        24–48h
                      </div>
                    </div>
                    <div className="mt-1 font-display text-[16px] font-extrabold text-sl-negro">
                      Auditoría + Propuesta
                    </div>
                    <p className="mt-1 text-[13px] text-black/65 font-semibold">
                      Te devolvemos un plan claro: qué mejorar, qué publicar y
                      cómo escalar con anuncios para generar más consultas.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
