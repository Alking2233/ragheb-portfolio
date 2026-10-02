import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import GradientBlob from '../ui/GradientBlob'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* بقع زخرفية على الأطراف كما في المرجع */}
      <GradientBlob className="-top-24 -left-24 h-72 w-72" />
      <GradientBlob className="top-1/3 -right-32 h-96 w-96 opacity-20" />

      <div className="container grid min-h-[calc(100vh-4rem)] items-center gap-14 py-16 md:grid-cols-2">
        {/* الدائرة المتدرجة + صورتك */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto w-fit"
        >
          <div className="relative h-72 w-72 md:h-96 md:w-96">
            <div className="absolute inset-0 rounded-full bg-blob shadow-glow" />
            {/* Monogram احتياطي إن لم توجد صورة */}
            <div className="absolute inset-0 grid place-items-center font-display text-6xl text-white/90">
              RY
            </div>
            <img
              src="/profile.jpg"
              alt="Ragheb Yossof"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
              className="absolute inset-0 h-full w-full rounded-full object-cover object-top grayscale contrast-125"
            />
          </div>
        </motion.div>

        {/* العنوان بتتابع حروف مدروس */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="section-title">
            WordPress & Front-End Developer
          </motion.p>
          <motion.h1 variants={item} className="mt-3 font-display text-4xl font-bold leading-tight md:text-6xl">
            I am a <span className="text-gold">creative</span>
            <br />
            frontend developer
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-md text-mist">
            IT Engineering graduate crafting responsive interfaces with React, Tailwind and
            WordPress — powered by Strapi headless CMS.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/projects" className="rounded-full bg-blob px-6 py-2.5 font-semibold transition hover:opacity-90">
              View projects
            </Link>
            <Link to="/contact" className="rounded-full border border-gold/60 px-6 py-2.5 text-gold transition hover:bg-gold hover:text-night">
              Hire me
            </Link>
            <a href="https://github.com/technotart" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-xl text-mist transition hover:text-gold"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/ragheb-y-333453265" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-xl text-mist transition hover:text-gold"><FaLinkedinIn /></a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}