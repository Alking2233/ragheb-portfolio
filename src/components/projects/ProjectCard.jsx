import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FaBolt, FaBookOpen, FaSchool, FaCloudSun, FaMosque, 
  FaGraduationCap, FaBuilding, FaUtensils, FaGem, 
  FaPenNib, FaNewspaper, FaMobileAlt, FaCode, FaPlay 
} from 'react-icons/fa'
import { SiFigma } from 'react-icons/si'
import TechBadge from './TechBadge'
import VideoModal from '../ui/VideoModal'

const icons = {
  bolt: FaBolt, bookOpen: FaBookOpen, school: FaSchool, cloud: FaCloudSun,
  mosque: FaMosque, graduation: FaGraduationCap, building: FaBuilding,
  figma: SiFigma, utensils: FaUtensils, gem: FaGem, pen: FaPenNib,
  news: FaNewspaper, mobile: FaMobileAlt, code: FaCode,
}

const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function ProjectCard({ project }) {
  const Icon = icons[project.icon] || FaCode
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const youtubeId = getYouTubeId(project.videoUrl)
  const thumbnailUrl = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null

  return (
    <>
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        // h-full + w-full + flex flex-col: هذا هو السر لتمدد البطاقة بالكامل
        className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-card"
      >
        <div className="relative grid h-44 shrink-0 place-items-center overflow-hidden bg-coal">
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={project.title} 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-blob opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
              <Icon className="text-5xl text-white/25 transition-all duration-500 group-hover:scale-110 group-hover:text-gold/70" />
            </>
          )}
          
          {project.isFeatured && (
            <span className="absolute top-3 right-3 z-10 rounded-full bg-gold/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-night shadow-md">
              Featured
            </span>
          )}

          {project.videoUrl && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute inset-0 z-10 grid place-items-center bg-black/30 transition-all duration-300 group-hover:bg-black/50"
              aria-label="Watch demo"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-night shadow-lg transition-transform duration-300 group-hover:scale-110">
                <FaPlay className="ml-1 h-6 w-6" />
              </span>
            </button>
          )}
        </div>

        {/* المحتوى الداخلي: flex-1 يجعله يأخذ كل المساحة المتبقية */}
        <div className="flex flex-1 flex-col space-y-3 p-6">
          <div className="flex items-center justify-between text-xs text-mist">
            <span className="font-semibold text-gold">{project.category}</span>
            <span>{project.year}</span>
          </div>
          
          {/* min-h-[3.5rem] يحجز مساحة ثابتة للعنوان (سطرين) لتوحيد الارتفاع من الأعلى */}
          <h3 className="font-display text-xl font-bold leading-tight transition-colors group-hover:text-gold line-clamp-2 min-h-3.5rem">
            {project.title}
          </h3>
          
          {/* flex-1 على الفقرة يدفع كل ما تحتها (الشارات والرابط) للأسفل دائماً */}
          <p className="flex-1 text-sm leading-relaxed text-mist line-clamp-3">
            {project.summary}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <TechBadge key={t}>{t}</TechBadge>
            ))}
          </div>

          {/* mt-auto يدفع الرابط للأسفل بقوة إذا لم يكفِ flex-1 */}
          <Link 
            to={`/projects/${project.slug}`} 
            className="mt-auto inline-block pt-2 text-sm font-semibold text-gold hover:underline"
          >
            View Case Study →
          </Link>
        </div>
      </motion.article>

      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videoUrl={project.videoUrl} 
        title={project.title} 
      />
    </>
  )
}