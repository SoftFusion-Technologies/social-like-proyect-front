/*
 * Programador: Benjamin Orellana
 * Fecha Creación: 2026-02-13
 * Versión: 1.0
 *
 * Descripción:
 * Sección "Contacto" premium para Social Like: formulario orientado a conversión + accesos rápidos
 * (mail/WhatsApp/Instagram). Diseño glass con aurora suave gobernado por tokens CSS.
 */

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiSend,
  FiArrowUpRight,
  FiInstagram
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

function ActionButton({ href, icon: Icon, title, subtitle }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between gap-3 rounded-3xl px-4 py-4 border border-black/10 bg-white/70 backdrop-blur-xl hover:bg-white/85 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div
          className="h-11 w-11 rounded-2xl flex items-center justify-center"
          style={{
            background: 'rgba(193,255,114,0.30)',
            border: '1px solid rgba(0,0,0,0.10)'
          }}
        >
          <Icon className="text-[18px]" style={{ color: 'rgba(0,0,0,0.80)' }} />
        </div>

        <div>
          <div className="text-[13px] font-extrabold text-sl-negro">
            {title}
          </div>
          <div className="text-[12px] font-semibold text-black/60">
            {subtitle}
          </div>
        </div>
      </div>

      <FiArrowUpRight className="text-[18px] text-black/50 group-hover:text-black transition-colors" />
    </a>
  );
}

export default function Contact() {
  const contacts = useMemo(
    () => ({
      email: 'sociallikeagencia@gmail.com',
      phone1: '+543813681571',
      phone2: '+543816403177',
      instagram: 'social.Like2026'
    }),
    []
  );

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    mensaje: ''
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  // UX: por ahora no enviamos a backend (para no romper). Abrimos mailto con el texto.
  const onSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent('Contacto desde Social Like');
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\n\nMensaje:\n${form.mensaje}`
    );

    window.location.href = `mailto:${contacts.email}?subject=${subject}&body=${body}`;
  };

  const waLink = (phone, text) => {
    const p = String(phone).replace(/[^\d]/g, '');
    const t = encodeURIComponent(text || 'Hola! Quiero pedir una cotización.');
    return `https://wa.me/${p}?text=${t}`;
  };

  return (
    <section id="contacto" className="relative overflow-hidden">
      {/* Background aurora */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-10 h-[520px] w-[520px] rounded-full blur-[85px] opacity-60"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(193,255,114,0.38), rgba(255,255,255,0) 62%)'
          }}
        />
        <div
          className="absolute -bottom-40 right-10 h-[560px] w-[560px] rounded-full blur-[90px] opacity-60"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgba(255,246,239,0.55), rgba(255,255,255,0) 64%)'
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
          <motion.div variants={fadeUp} custom={0}>
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
              Contacto
            </div>

            <h2 className="mt-5 font-display text-[28px] sm:text-[34px] md:text-[40px] leading-tight font-extrabold text-sl-negro max-w-3xl">
              Contanos qué necesitás y te respondemos con una propuesta clara.
            </h2>

            <p className="mt-3 text-[15px] sm:text-[16px] text-black/70 font-semibold max-w-2xl">
              En menos de 24–48hs te devolvemos recomendaciones y el plan ideal
              según tu objetivo y presupuesto.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Left: Form */}
            <motion.div variants={fadeUp} custom={1} className="lg:col-span-7">
              <div
                className="rounded-[34px] p-5 sm:p-7 border border-black/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.12)]"
                style={{
                  WebkitBackdropFilter: 'blur(22px)',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.84), rgba(255,255,255,0.62))'
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[12px] font-extrabold text-black/55">
                      Formulario
                    </div>
                    <div className="font-display text-[18px] sm:text-[20px] font-extrabold text-sl-negro">
                      Pedir cotización
                    </div>
                  </div>

                  <div
                    className="rounded-2xl px-3 py-2 text-[12px] font-extrabold"
                    style={{
                      background: 'rgba(193,255,114,0.35)',
                      border: '1px solid rgba(0,0,0,0.10)'
                    }}
                  >
                    Respuesta 24–48h
                  </div>
                </div>

                <form
                  onSubmit={onSubmit}
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <div className="sm:col-span-1">
                    <label className="text-[12px] font-extrabold text-black/60">
                      Nombre
                    </label>
                    <input
                      name="nombre"
                      value={form.nombre}
                      onChange={onChange}
                      className="mt-2 sl-input"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="text-[12px] font-extrabold text-black/60">
                      Email
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="mt-2 sl-input"
                      placeholder="tu@email.com"
                      type="email"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[12px] font-extrabold text-black/60">
                      WhatsApp
                    </label>
                    <input
                      name="whatsapp"
                      value={form.whatsapp}
                      onChange={onChange}
                      className="mt-2 sl-input"
                      placeholder="+54 ..."
                      inputMode="tel"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[12px] font-extrabold text-black/60">
                      Mensaje
                    </label>
                    <textarea
                      name="mensaje"
                      value={form.mensaje}
                      onChange={onChange}
                      className="mt-2 sl-input min-h-[120px] resize-none"
                      placeholder="Contanos tu rubro, objetivo (consultas/ventas/branding) y si ya tenés redes activas."
                      required
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-extrabold"
                      style={{
                        background: 'var(--color-sl-negro)',
                        color: 'white',
                        boxShadow: '0 14px 40px rgba(0,0,0,0.16)'
                      }}
                    >
                      Enviar <FiSend className="text-lg" />
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: 'var(--color-sl-lima)' }}
                      />
                    </button>

                    <div className="text-[12px] text-black/55 font-semibold">
                      Al enviar, se abrirá tu app de correo con el mensaje
                      listo.
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Right: Quick actions */}
            <motion.div variants={fadeUp} custom={2} className="lg:col-span-5">
              <div className="grid gap-3">
                <ActionButton
                  href={`mailto:${contacts.email}`}
                  icon={FiMail}
                  title="Email"
                  subtitle={contacts.email}
                />

                <ActionButton
                  href={waLink(
                    contacts.phone1,
                    'Hola! Quiero pedir una cotización para redes y contenido.'
                  )}
                  icon={FiPhone}
                  title="WhatsApp 1"
                  subtitle={contacts.phone1}
                />

                <ActionButton
                  href={waLink(
                    contacts.phone2,
                    'Hola! Quiero consultar por planes de Social Like.'
                  )}
                  icon={FiPhone}
                  title="WhatsApp 2"
                  subtitle={contacts.phone2}
                />

                <ActionButton
                  href={`https://instagram.com/${contacts.instagram}`}
                  icon={FiInstagram}
                  title="Instagram"
                  subtitle={contacts.instagram}
                />

                <div
                  className="rounded-[34px] p-5 border border-black/10 bg-white/70 backdrop-blur-xl"
                  style={{
                    WebkitBackdropFilter: 'blur(22px)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.62))'
                  }}
                >
                  <div className="text-[12px] font-extrabold text-black/55">
                    Tip rápido
                  </div>
                  <div className="mt-1 font-display text-[18px] font-extrabold text-sl-negro">
                    Para una propuesta más exacta
                  </div>
                  <p className="mt-2 text-[13px] text-black/70 font-semibold leading-snug">
                    Contanos tu rubro, objetivo principal y si ya tenés material
                    (fotos/videos). Así te armamos el plan ideal desde el primer
                    mensaje.
                  </p>

                  <button
                    type="button"
                    onClick={() => scrollToId('planes')}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-extrabold w-full"
                    style={{
                      background: 'var(--color-sl-lima)',
                      color: 'var(--color-sl-negro)',
                      border: '1px solid rgba(0,0,0,0.10)'
                    }}
                  >
                    Ver planes <FiArrowUpRight className="text-lg" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
