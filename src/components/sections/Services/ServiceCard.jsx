import React, { useMemo, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiCheck, FiArrowUpRight } from 'react-icons/fi';

/*
 * Benjamin Orellana - 14/02/2026 - ServiceCard UX premium:
 * - Entrada: fade + y + blur + stagger interno.
 * - Hover (desktop): tilt 3D sutil + spotlight tracking + icon/tag micro anim.
 * - Touch: feedback sin hover effects.
 */

export default function ServiceCard({ service, featured = false }) {
  const rm = useReducedMotion();
  const ref = useRef(null);

  const supportsHover = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia && window.matchMedia('(hover: hover)').matches;
  }, []);

  const onMove = (e) => {
    if (!supportsHover || rm) return;
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);

    // Tilt 3D (suave)
    const px = (x / r.width - 0.5) * 2; // -1..1
    const py = (y / r.height - 0.5) * 2; // -1..1
    el.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
  };

  const Icon = service.icon;

  const wrap = useMemo(
    () => ({
      hidden: rm ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(10px)' },
      show: rm
        ? { opacity: 1, transition: { duration: 0.2 } }
        : {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.5,
              ease: 'easeOut',
              staggerChildren: 0.08
            }
          }
    }),
    [rm]
  );

  const item = useMemo(
    () => ({
      hidden: rm ? { opacity: 0 } : { opacity: 0, y: 10, filter: 'blur(8px)' },
      show: rm
        ? { opacity: 1 }
        : {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.35, ease: 'easeOut' }
          }
    }),
    [rm]
  );

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      variants={wrap}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      whileTap={{ scale: 0.99 }}
      className={[
        'group relative overflow-hidden rounded-[28px] p-5 sm:p-6',
        'border border-black/10 bg-white/70 backdrop-blur-xl',
        'shadow-[0_18px_60px_rgba(0,0,0,0.10)]',
        featured ? 'lg:col-span-2' : ''
      ].join(' ')}
      style={{
        WebkitBackdropFilter: 'blur(22px)',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.62))',
        perspective: 1200
      }}
      animate={supportsHover && !rm ? undefined : undefined}
    >
      {/* Layer: spotlight (mejorado) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(520px circle at var(--mx) var(--my), rgba(193,255,114,0.26), rgba(255,246,239,0.18), rgba(255,255,255,0) 58%)'
        }}
      />

      {/* Layer: ring hover */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow:
            '0 0 0 1px rgba(0,0,0,0.10), 0 0 0 6px rgba(193,255,114,0.14)'
        }}
      />

      {/* Contenido con tilt (transform-style) */}
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          transform:
            supportsHover && !rm
              ? 'rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0)'
              : 'none',
          transition:
            supportsHover && !rm ? 'transform 180ms ease-out' : undefined
        }}
      >
        {/* top row */}
        <motion.div
          variants={item}
          className="relative flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-3">
            <motion.div
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{
                background: 'rgba(193,255,114,0.30)',
                border: '1px solid rgba(0,0,0,0.10)'
              }}
              whileHover={
                supportsHover && !rm
                  ? {
                      scale: 1.05,
                      rotate: -2,
                      transition: {
                        type: 'spring',
                        stiffness: 220,
                        damping: 16
                      }
                    }
                  : undefined
              }
            >
              <Icon
                className="text-[18px]"
                style={{ color: 'rgba(0,0,0,0.80)' }}
              />
            </motion.div>

            <div>
              <div className="font-display text-[16px] sm:text-[18px] font-extrabold text-sl-negro">
                {service.title}
              </div>
              <div className="mt-1 text-[13px] sm:text-[14px] text-black/65 font-semibold max-w-[42ch]">
                {service.subtitle}
              </div>
            </div>
          </div>

          <motion.div
            variants={item}
            className="hidden sm:inline-flex rounded-full px-3 py-1 text-[12px] font-extrabold"
            style={{
              background: 'rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.10)',
              color: 'rgba(0,0,0,0.65)'
            }}
            whileHover={
              supportsHover && !rm
                ? { y: -1, transition: { duration: 0.2 } }
                : undefined
            }
          >
            {service.tag}
          </motion.div>
        </motion.div>

        {/* bullets (stagger) */}
        <motion.div
          className="relative mt-5 grid gap-2"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } }
          }}
        >
          {service.bullets.map((b) => (
            <motion.div
              key={b}
              variants={item}
              className="flex items-start gap-2"
            >
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
            </motion.div>
          ))}
        </motion.div>

        {/* bottom hint */}
        <motion.div
          variants={item}
          className="relative mt-5 flex items-center justify-between"
        >
          <div className="text-[12px] font-extrabold text-black/55">
            {service.outcome}
          </div>

          <motion.div
            className="h-9 w-9 rounded-2xl flex items-center justify-center border border-black/10 bg-white/70"
            aria-hidden="true"
            whileHover={
              supportsHover && !rm
                ? {
                    scale: 1.05,
                    rotate: 6,
                    transition: { type: 'spring', stiffness: 240, damping: 16 }
                  }
                : undefined
            }
          >
            <motion.div
              animate={
                supportsHover && !rm
                  ? { x: [0, 2, 0], y: [0, -2, 0] }
                  : undefined
              }
              transition={
                supportsHover && !rm
                  ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                  : undefined
              }
            >
              <FiArrowUpRight className="text-[18px] text-black/60 group-hover:text-black transition-colors" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
}
