import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'

export default function AboutSection() {
  return (
    <section className="container py-20">
      <SectionTitle kicker="Context" title="About project" />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mt-4 max-w-3xl leading-relaxed text-mist"
      >
        This portfolio is a living case study: a React SPA styled with Tailwind v4 and Sass,
        content delivered from a Strapi headless CMS running on SQLite, project demos shown as
        cover images plus short screen-recorded videos, and source code presented in a
        read-only protected viewer. Every pixel here is built step by step with clean,
        documented commits on GitHub.
      </motion.p>
    </section>
  )
}