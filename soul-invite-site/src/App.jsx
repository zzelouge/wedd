import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
const dates = [17, 18, 19, 20, 21, 22, 23]

function polarToCartesian(cx, cy, r, angle) {
  const a = (angle - 90) * (Math.PI / 180)
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  }
}

function CircularTrack({ items, radius, offset = 0, duration = 28, className = '' }) {
  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration, ease: 'linear', repeat: Infinity }}
      aria-hidden
    >
      <svg viewBox="0 0 500 500" className="h-full w-full overflow-visible">
        {items.map((item, i) => {
          const angle = offset + (360 / items.length) * i
          const p = polarToCartesian(250, 250, radius, angle)
          return (
            <g key={`${item}-${i}`} transform={`translate(${p.x}, ${p.y}) rotate(${-angle})`}>
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-stone-500"
                style={{
                  fontSize: item.toString().length > 2 ? 18 : 22,
                  letterSpacing: '0.22em',
                  fontFamily: 'Cormorant Garamond, serif',
                }}
              >
                {item}
              </text>
            </g>
          )
        })}
      </svg>
    </motion.div>
  )
}

function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(0,0,0,.28) 0 0.6px, transparent 0.7px), radial-gradient(circle at 80% 30%, rgba(0,0,0,.18) 0 0.8px, transparent 0.9px), radial-gradient(circle at 40% 70%, rgba(0,0,0,.22) 0 0.7px, transparent 0.8px)',
        backgroundSize: '18px 18px, 24px 24px, 28px 28px',
      }}
    />
  )
}

function SectionCard({ eyebrow, title, children }) {
  return (
    <div className="rounded-[32px] border border-stone-200/80 bg-white/40 p-8 backdrop-blur-sm">
      <p className="mb-2 text-xs uppercase tracking-[0.45em] text-stone-500">{eyebrow}</p>
      <h2 className="font-serif text-3xl text-stone-700">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-stone-600">{children}</div>
    </div>
  )
}

export default function App() {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOpened(true), 250)
    return () => clearTimeout(t)
  }, [])

  const floatingPetals = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: 8 + i * 9,
        top: 12 + (i % 5) * 14,
        delay: i * 0.35,
        duration: 5 + (i % 3),
      })),
    [],
  )

  const scrollToInfo = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen w-full bg-[#f6f0e8] text-stone-700">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
        <Grain />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.55),transparent_42%),linear-gradient(to_bottom,rgba(255,255,255,0.28),rgba(0,0,0,0))]" />

        {floatingPetals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute h-2.5 w-6 rounded-full border border-stone-300/70 bg-white/50 blur-[0.2px]"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{
              y: [0, -10, 8, 0],
              x: [0, 6, -5, 0],
              rotate: [0, 18, -14, 0],
              opacity: [0.25, 0.5, 0.35, 0.25],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-hidden
          />
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={opened ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex w-full max-w-[430px] flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={opened ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.25 }}
            className="relative mb-10 aspect-square w-full max-w-[390px]"
          >
            <div className="absolute inset-[4%] rounded-full border border-stone-300/70" />
            <div className="absolute inset-[13%] rounded-full border border-stone-200/80" />
            <div className="absolute inset-[22%] rounded-full border border-stone-200/60" />

            <CircularTrack items={days} radius={205} offset={-6} duration={34} />
            <CircularTrack items={dates} radius={155} offset={20} duration={24} className="opacity-90" />

            <div className="absolute inset-[24%] flex flex-col items-center justify-center rounded-full bg-[#f8f4ee]/85 shadow-soft backdrop-blur-[1.5px]">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={opened ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="mb-3 text-[12px] uppercase tracking-[0.55em] text-stone-500"
              >
                Август, 2026
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={opened ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.9 }}
                className="px-8 text-center font-serif text-5xl leading-[1.05] text-stone-700 sm:text-6xl"
              >
                Кирилл <span className="text-stone-400">и</span> Настя
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0.7 }}
                animate={opened ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ delay: 0.85, duration: 0.8 }}
                className="my-5 h-px w-24 bg-stone-300"
              />

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={opened ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.8 }}
                className="max-w-[210px] text-center text-sm leading-6 text-stone-500"
              >
                Приглашаем вас стать частью нашей свадьбы
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={opened ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="flex flex-col items-center gap-3"
          >
            <button
              onClick={scrollToInfo}
              className="rounded-full border border-stone-300 bg-white/50 px-6 py-3 text-xs uppercase tracking-[0.35em] text-stone-600 backdrop-blur transition hover:bg-white/75"
            >
              открыть
            </button>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-stone-400"
            >
              <ChevronDown size={18} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section id="details" className="mx-auto flex max-w-[430px] flex-col gap-6 px-6 pb-20 text-center">
        <SectionCard eyebrow="Сбор гостей" title="16:30">
          Наше торжество состоится по адресу: с. Восход, Калужская обл., PineRiver.
        </SectionCard>

        <SectionCard eyebrow="Программа" title="17 августа 2026">
          <p>16:30 — welcome</p>
          <p>17:00 — церемония</p>
          <p>18:00 — ужин и вечерняя программа</p>
        </SectionCard>

        <SectionCard eyebrow="Дресс-код" title="Нежные оттенки">
          Будем рады, если вы поддержите эстетику вечера и выберете спокойные, светлые и природные тона.
        </SectionCard>
      </section>
    </div>
  )
}
