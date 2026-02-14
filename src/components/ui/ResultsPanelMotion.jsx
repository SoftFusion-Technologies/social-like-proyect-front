import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/*
 * Benjamin Orellana - 14/02/2026 - Animaciones premium para "Panel de Resultados":
 * - Entrada en viewport con blur + spring.
 * - Hover: tilt 3D sutil + shine + ring.
 * - Stagger interno para header, métricas y bloque final.
 */

export default function ResultsPanelMotion({ children }) {
  const rm = useReducedMotion();

  const wrap = useMemo(
    () => ({
      hidden: rm ? { opacity: 0 } : { opacity: 0, y: 18, filter: 'blur(10px)' },
      show: rm
        ? { opacity: 1, transition: { duration: 0.2 } }
        : {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              type: 'spring',
              stiffness: 140,
              damping: 18,
              mass: 0.9,
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
    <motion.div
      variants={wrap}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      style={{ perspective: 1200 }}
      className="relative"
    >
      {/* Tilt + shine */}
      <motion.div
        whileHover={
          rm
            ? undefined
            : {
                rotateX: 4,
                rotateY: -6,
                y: -4,
                transition: { type: 'spring', stiffness: 180, damping: 16 }
              }
        }
        whileTap={rm ? undefined : { scale: 0.995 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Shine overlay */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 rounded-[38px] opacity-0"
          style={{
            background:
              'radial-gradient(520px circle at 30% 20%, rgba(193,255,114,0.35), transparent 55%), radial-gradient(680px circle at 70% 80%, rgba(0,0,0,0.08), transparent 60%)'
          }}
          whileHover={rm ? undefined : { opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />

        {/* Ring hover */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[1px] rounded-[36px] opacity-0"
          style={{
            boxShadow:
              '0 0 0 1px rgba(0,0,0,0.10), 0 0 0 6px rgba(193,255,114,0.14)'
          }}
          whileHover={rm ? undefined : { opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />

        {/* Contenido real */}
        <motion.div variants={item}>{children}</motion.div>
      </motion.div>
    </motion.div>
  );
}
