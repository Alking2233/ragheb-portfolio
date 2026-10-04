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

const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'https://ragheb-strapi-backend.onrender.com';

const icons = {
  bolt: FaBolt, bookOpen: FaBookOpen, school: FaSchool, cloud: FaCloudSun,
  mosque: FaMosque, graduation: FaGraduationCap, building: FaBuilding,
  figma: SiFigma, utensils: FaUtensils, gem: FaGem, pen: FaPenNib,
  news: FaNewspaper, mobile: FaMobileAlt, code: FaCode,
}

// دالة ذكية وشاملة لاستخراج ID فيديو اليوتيوب
const getYouTubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = url.trim().match(regExp);
  return match ? match[1] : null;
};

// دالة بناء رابط الصورة لـ Strapi
const getImageUrl = (img) => {
  if (!img) return null;
  const url = typeof img === 'string' ? img : (img.url || img.attributes?.url);
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
};

export default function ProjectCard({ project }) {
  const Icon = icons[project.icon] || FaCode;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const youtubeId = getYouTubeId(project.videoUrl);
  const thumbnailUrl = youtubeId 
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` 
    : getImageUrl(project.cover || project.image);

  const parsedTech = Array.isArray(project.tech) 
    ? project.tech 
    : typeof project.tech === 'string' 
      ? JSON.parse(project.tech || '[]') 
      : [];

  return (
    <>
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-card"
      >
        <div className="relative grid h-44 shrink-0 place-items-center overflow-hidden bg-coal">
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={project.title} 
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
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

        <div className="flex flex-1 flex-col space-y-3 p-6">
          <div className="flex items-center justify-between text-xs text-mist">
            <span className="font-semibold text-gold">{project.category}</span>
            <span>{project.year}</span>
          </div>
          
          <h3 className="font-display text-xl font-bold leading-tight transition-colors group-hover:text-gold line-clamp-2 min-h-3.5rem">
            {project.title}
          </h3>
          
          <p className="flex-1 text-sm leading-relaxed text-mist line-clamp-3">
            {project.summary}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {parsedTech.map((t) => (
              <TechBadge key={t}>{t}</TechBadge>
            ))}
          </div>

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