import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const cell = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function ProjectsGrid({ projects }) {
  return (
    <motion.div
      variants={grid}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      // auto-rows-fr يجبر كل صف على أخذ ارتفاع أعلى بطاقة فيه تلقائياً
      className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((p) => (
        // h-full + flex لضمان تمدد الخلية بالكامل
        <motion.div key={p.slug} variants={cell} className="flex h-full">
          <ProjectCard project={p} />
        </motion.div>
      ))}
    </motion.div>
  )
}