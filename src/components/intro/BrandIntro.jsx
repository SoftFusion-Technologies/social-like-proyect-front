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

  // Benjamin Orellana - 14/02/2026 - Ciclo de colores fijo (hex) para evitar fallas en deploy (Netlify)
  const cycleColors = useMemo(() => {
    if (tone === 'negro') return null;

    return [
      '#8B5CF6', // lila
      '#73ba16', // verde
      '#e01919', // rojo
      '#000000', // negro
      '#2206d7', // azul
      '#8B5CF6' // vuelve a lila
    ];
  }, [tone]);

  const cycleTimes = useMemo(() => {
    if (!cycleColors) return null;
    const n = cycleColors.length;
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
            <div className="w-full max-w-[18rem] sm:max-w-xl lg:max-w-5xl text-center select-none">
              {' '}
              <AnimatePresence mode="wait">
                {phase === 'claim' ? (
                  <motion.h1
                    key="claim"
                    {...claimWrap}
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="
    font-display tracking-tight text-[color:var(--intro-ink)] select-none
    leading-[1.06] sm:leading-[1.05]
    px-1
  "
                    style={{
                      // tamaño fluido: nunca se va al carajo en mobile, y escala bien en desktop
                      fontSize: 'clamp(28px, 6.2vw, 64px)',
                      // mejora la distribución de líneas si hay wrap
                      textWrap: 'balance'
                    }}
                  >
                    {letters.map((ch, idx) => {
                      const isSpace = ch === ' ';
                      return (
                        <motion.span
                          key={`lt-${idx}`}
                          variants={letterVariants}
                          className={
                            isSpace
                              ? 'inline-block w-[0.28em] sm:w-[0.33em]'
                              : 'inline-block'
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
                      initial={{
                        color: cycleColors?.[0] ?? 'var(--intro-ink)'
                      }}
                      animate={
                        cycleColors
                          ? { color: cycleColors }
                          : { color: 'var(--intro-ink)' }
                      }
                      transition={
                        cycleColors
                          ? {
                              duration: Math.max(
                                0.2,
                                (brandHoldMs - 120) / 1000
                              ),
                              times: cycleTimes,
                              ease: 'easeInOut'
                            }
                          : { duration: 0.01 }
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
