import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimation,
  useReducedMotion
} from 'framer-motion';

/*
 * Benjamin Orellana - 14/02/2026 - RotatingSelectableWord (loop robusto):
 * - Delay inicial real (startDelayMs) antes del primer ciclo.
 * - Selección letra por letra (izq->der), luego deselección letra por letra (der->izq).
 * - Swap: palabra sube/desvanece, entra la siguiente.
 * - Loop infinito estable: el ciclo NO depende de re-renders por "word", corre en un único loop.
 */

const inset = (rightPct) => `inset(0% ${rightPct}% 0% 0%)`;

function buildStepKeyframesRightInset(
  n,
  direction = 'select',
  holdFrac = 0.72
) {
  const frames = [];
  const times = [];

  const steps = Math.max(1, n);
  const stepDur = 1 / steps;

  const rightAt = (i) => {
    const t = i / steps;
    if (direction === 'select') return 100 * (1 - t);
    return 100 * t;
  };

  for (let i = 0; i <= steps; i += 1) {
    const right = rightAt(i);
    const tStart = i === 0 ? 0 : i * stepDur;
    const tHold = Math.min(1, tStart + holdFrac * stepDur);

    frames.push(inset(right));
    times.push(tStart);

    if (i < steps) {
      frames.push(inset(right));
      times.push(tHold);
    }
  }

  if (times[times.length - 1] !== 1) times[times.length - 1] = 1;
  return { frames, times };
}

const nextFrame = () =>
  new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));

export default function RotatingSelectableWord({
  // 3 o 5 palabras (recomendado 5)
  words = ['Profesional', 'Moderno', 'Confiable', 'Memorable', 'Eficaz'],

  // Delay inicial (lo que pediste)
  startDelayMs = 2000,

  // Timing selección
  selectMs = 820,
  deselectMs = 760,
  holdAfterDeselectMs = 160,

  // Swap (entrada/salida de palabra)
  swapMs = 260,

  // Gap para asegurar que la palabra nueva ya terminó de entrar antes de subrayar
  afterSwapGapMs = 120,

  // Visual
  highlightColor = 'var(--color-sl-lima)',
  inkColorSelected = 'var(--color-sl-negro)',
  baseGradient = 'linear-gradient(90deg, var(--color-sl-lima), var(--color-sl-lima))',

  // Ajuste letra por letra
  stepHoldFrac = 0.72,

  className = ''
}) {
  const reducedMotion = useReducedMotion();
  const clipCtrl = useAnimation();

  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  const mountedRef = useRef(false);

  // Importante: si el array viene inline, puede cambiar de identidad. Usamos key por contenido.
  const safeWords = useMemo(() => {
    const arr = Array.isArray(words) ? words.filter(Boolean).map(String) : [];
    return arr.length >= 3 ? arr : ['Profesional', 'Moderno', 'Confiable'];
  }, [words]);

  const wordsKey = useMemo(() => safeWords.join('||'), [safeWords]);

  const word = useMemo(
    () => safeWords[idx % safeWords.length] ?? '',
    [safeWords, idx]
  );
  const hiddenClip = inset(100);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clipCtrl.stop();
    };
  }, [clipCtrl]);

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    const wait = (ms) =>
      new Promise((res) => {
        const t = window.setTimeout(res, ms);
        timers.push(t);
      });

    const run = async () => {
      // Reset al inicio
      idxRef.current = 0;
      setIdx(0);
      await nextFrame();

      await clipCtrl.set({ clipPath: hiddenClip });

      // Delay inicial REAL (solo una vez por montaje/cambio de palabras)
      if (!reducedMotion && startDelayMs > 0) {
        await wait(startDelayMs);
      }

      // Loop infinito
      while (!cancelled && mountedRef.current) {
        const currentIdx = idxRef.current % safeWords.length;
        const currentWord = safeWords[currentIdx] ?? '';
        const n = Math.max(1, currentWord.length);

        // Asegurar overlay oculto antes de arrancar
        await clipCtrl.set({ clipPath: hiddenClip });

        if (reducedMotion) {
          // En reduce motion: rotar sin selección
          await wait(1400);
        } else {
          // 1) Selección letra por letra
          const sel = buildStepKeyframesRightInset(n, 'select', stepHoldFrac);
          await clipCtrl.start({
            clipPath: sel.frames,
            transition: {
              duration: selectMs / 1000,
              times: sel.times,
              ease: 'linear'
            }
          });

          if (cancelled || !mountedRef.current) break;

          // 2) Deselección letra por letra
          const des = buildStepKeyframesRightInset(n, 'deselect', stepHoldFrac);
          await clipCtrl.start({
            clipPath: des.frames,
            transition: {
              duration: deselectMs / 1000,
              times: des.times,
              ease: 'linear'
            }
          });

          if (cancelled || !mountedRef.current) break;

          if (holdAfterDeselectMs > 0) await wait(holdAfterDeselectMs);
        }

        if (cancelled || !mountedRef.current) break;

        // 3) Swap de palabra
        const next = (idxRef.current + 1) % safeWords.length;
        idxRef.current = next;
        setIdx(next);

        // Esperar a que React pinte la nueva palabra + termine la animación de swap
        await nextFrame();
        await wait(swapMs + afterSwapGapMs);
      }
    };

    run();

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      clipCtrl.stop();
    };
  }, [
    wordsKey,
    reducedMotion,
    startDelayMs,
    selectMs,
    deselectMs,
    holdAfterDeselectMs,
    swapMs,
    afterSwapGapMs,
    stepHoldFrac,
    hiddenClip,
    safeWords,
    clipCtrl
  ]);

  return (
    <span
      className={`relative inline-block align-baseline select-none ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          className="relative inline-block"
          initial={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 14, filter: 'blur(6px)' }
          }
          animate={
            reducedMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: 'blur(0px)' }
          }
          exit={
            reducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -14, filter: 'blur(6px)' }
          }
          transition={{ duration: swapMs / 1000, ease: 'easeOut' }}
        >
          {/* Base text fijo (gradiente) */}
          <span
            className="relative z-[1]"
            style={{
              background: baseGradient,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {word}
          </span>

          {/* Highlight de selección */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-[-0.10em_-0.10em] rounded-[0.28em] z-[2]"
            style={{ background: highlightColor, clipPath: hiddenClip }}
            animate={clipCtrl}
          />

          {/* Texto seleccionado */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 z-[3]"
            style={{ clipPath: hiddenClip }}
            animate={clipCtrl}
          >
            <span style={{ color: inkColorSelected }}>{word}</span>
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
