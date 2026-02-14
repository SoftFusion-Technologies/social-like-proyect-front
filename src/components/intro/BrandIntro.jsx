import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/*
 * Benjamin Orellana - 14/02/2026 - BrandIntro no-skip:
 * - Letras del claim caen 1 a 1 (stagger) y se posicionan.
 * - Al finalizar: el claim desaparece y aparece "SOCIAL LIKE" en mayúsculas.
 * - No se puede omitir (sin click/ESC).
 * - Llama onDone SOLO al finalizar el fade-out del overlay (para montar el Home después).
 */

function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

const DEFAULT_LILA = '#8B5CF6';

export default function BrandIntro({
  open,
  onDone,
  claim = 'Creamos marcas que conectan',
  brand = 'SOCIAL LIKE',

  tone = 'lila',
  lilaHex = DEFAULT_LILA,

  // NUEVO: ciclo de colores del brand
  brandColorCycle = true,
  brandColors = null, // si lo pasás desde Home, pisa los defaults

  baseDelayMs = 140,
  staggerMs = 42,
  settleHoldMs = 520,
  swapDelayMs = 140,
  brandHoldMs = 1600,
  exitMs = 520
}) {
  const reducedMotion = useReducedMotion();
  const doneRef = useRef(false);

  // showOverlay maneja el ciclo completo y permite exit animation interna
  const [showOverlay, setShowOverlay] = useState(false);
  const [phase, setPhase] = useState('claim'); // 'claim' | 'brand'

  useBodyScrollLock(Boolean(open && showOverlay));

  const letters = useMemo(() => Array.from(claim), [claim]);

  const SL = useMemo(
    () => ({
      lima: '#c1ff72',
      naranja: '#fff6ef',
      negro: '#000000',
      gris: '#b4b4b4',
      grisClaro: '#d9d9d9',
      amarillo: '#fffef0'
    }),
    []
  );

  const cycleColors = useMemo(() => {
    if (tone === 'negro') return null;
    if (!brandColorCycle) return null;

    // Default: lila -> lima -> negro -> lima -> lila
    const fallback = [lilaHex, SL.lima, SL.negro, SL.lima, lilaHex];

    if (Array.isArray(brandColors) && brandColors.length >= 2)
      return brandColors;
    return fallback;
  }, [tone, brandColorCycle, brandColors, lilaHex, SL]);

  const cycleTimes = useMemo(() => {
    if (!cycleColors) return null;
    const n = cycleColors.length;
    if (n === 1) return [0];
    // distribuye 0..1 (0, 0.25, 0.5, 0.75, 1) según n
    return Array.from({ length: n }, (_, i) => i / (n - 1));
  }, [cycleColors]);

  const accent = useMemo(() => {
    if (tone === 'negro') return 'var(--color-sl-negro)';
    return lilaHex;
  }, [tone, lilaHex]);

  const totalDropMs = useMemo(() => {
    if (reducedMotion) return 320;
    const n = Math.max(1, letters.length);
    return baseDelayMs + (n - 1) * staggerMs + settleHoldMs;
  }, [reducedMotion, letters.length, baseDelayMs, staggerMs, settleHoldMs]);

  useEffect(() => {
    if (!open) return;

    doneRef.current = false;
    setShowOverlay(true);
    setPhase('claim');

    const timers = [];

    // Secuencia:
    // 1) drop claim
    // 2) swap -> brand
    // 3) hold brand
    // 4) overlay fade-out (showOverlay=false) y onExitComplete -> onDone
    timers.push(
      window.setTimeout(() => {
        setPhase('brand');
      }, totalDropMs + swapDelayMs)
    );

    timers.push(
      window.setTimeout(
        () => {
          setShowOverlay(false);
        },
        totalDropMs + swapDelayMs + brandHoldMs
      )
    );

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [open, totalDropMs, swapDelayMs, brandHoldMs]);

  const containerVariants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2 } }
      }
    : {
        hidden: {},
        show: {
          transition: {
            delayChildren: baseDelayMs / 1000,
            staggerChildren: staggerMs / 1000
          }
        }
      };

  const letterVariants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2 } }
      }
    : {
        hidden: {
          y: -84,
          opacity: 0,
          rotate: -1.5,
          filter: 'blur(8px)'
        },
        show: {
          y: 0,
          opacity: 1,
          rotate: 0,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 420,
            damping: 24,
            mass: 0.75
          }
        }
      };

  const claimWrap = {
    initial: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 10, filter: 'blur(6px)' },
    transition: { duration: 0.26, ease: 'easeOut' }
  };

  const brandWrap = {
    initial: { opacity: 0, y: 10, filter: 'blur(8px)', scale: 0.995 },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 },
    exit: { opacity: 0, y: -6, filter: 'blur(6px)' },
    transition: { duration: 0.34, ease: 'easeOut' }
  };

  const overlayWrap = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 0, filter: 'blur(3px)' },
    transition: { duration: exitMs / 1000, ease: 'easeOut' }
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (doneRef.current) return;
        doneRef.current = true;
        onDone?.();
      }}
    >
      {open && showOverlay && (
        <motion.div
          key="sl-brand-intro"
          className="fixed inset-0 z-[9999] bg-white"
          style={{
            '--intro-ink': 'var(--color-sl-negro)',
            '--intro-accent': accent
          }}
          initial={overlayWrap.initial}
          animate={overlayWrap.animate}
          exit={overlayWrap.exit}
          transition={overlayWrap.transition}
          role="dialog"
          aria-modal="true"
          aria-label="Brand Intro"
        >
          {/* Fondo limpio (sin halo). Opcional: grilla muy sutil para textura */}

          <div className="relative h-full w-full flex items-center justify-center px-6">
            <div className="w-full max-w-5xl text-center select-none">
              <AnimatePresence mode="wait">
                {phase === 'claim' ? (
                  <motion.h1
                    key="claim"
                    {...claimWrap}
                    className="font-display tracking-tight leading-[1.05]
                               text-[color:var(--intro-ink)]
                               text-5xl sm:text-5xl lg:text-6xl"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {letters.map((ch, idx) => {
                      const isSpace = ch === ' ';
                      return (
                        <motion.span
                          key={`lt-${idx}`}
                          variants={letterVariants}
                          className={
                            isSpace ? 'inline-block w-[0.35em]' : 'inline-block'
                          }
                        >
                          {isSpace ? '\u00A0' : ch}
                        </motion.span>
                      );
                    })}
                  </motion.h1>
                ) : (
                  <motion.div
                    key="brand"
                    initial={brandWrap.initial}
                    animate={brandWrap.animate}
                    exit={brandWrap.exit}
                    transition={brandWrap.transition}
                    className="font-display font-extrabold
                               text-[color:var(--intro-ink)]
                               text-3xl sm:text-4xl lg:text-5xl"
                  >
                    <motion.span
                      className="tracking-[0.28em]"
                      initial={false}
                      animate={
                        tone === 'negro' || !cycleColors
                          ? { color: 'var(--intro-ink)' }
                          : { color: cycleColors }
                      }
                      transition={
                        tone === 'negro' || !cycleColors
                          ? { duration: 0.01 }
                          : {
                              duration: Math.max(
                                0.2,
                                (brandHoldMs - 120) / 1000
                              ), // deja ~120ms final estable
                              times: cycleTimes,
                              ease: 'easeInOut'
                            }
                      }
                    >
                      {brand}
                    </motion.span>
                    <div className="mx-auto mt-4 h-[2px] w-28 rounded-full bg-[color:var(--intro-ink)] opacity-10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
