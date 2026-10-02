import { motion } from 'framer-motion'

const swatches = [
  { name: 'Gradient Blob', value: '#7B2FF7 → #F107A3', className: 'bg-blob' },
  { name: 'Gold Accent', value: '#C9A24B', className: 'bg-gold' },
  { name: 'Pure White', value: '#FFFFFF', className: 'bg-white' },
]

export default function PaletteSection() {
  return (
    <section className="container pb-24 pt-4">
      <div className="flex items-center justify-center gap-10 md:gap-16">
        {swatches.map((s, i) => (
          <motion.button
            key={s.name}
            type="button"
            title={`${s.name} · ${s.value}`}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.15, y: -6 }}
            className={`h-20 w-20 rounded-full md:h-24 md:w-24 ${s.className}`}
          />
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-mist">Brand palette — hover a swatch to feel the spring.</p>
    </section>
  )
}