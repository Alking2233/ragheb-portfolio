import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import { FaCog, FaShieldAlt, FaRocket, FaCheckCircle } from "react-icons/fa"; 
import { getProjectBySlug } from "../services/strapi";
import { fallbackProjects } from "../data/fallbackProjects";
import TechBadge from "../components/projects/TechBadge";
import ProtectedCodeViewer from "../components/ui/ProtectedCodeViewer";

// جلب رابط السيرفر ديناميكياً
const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || import.meta.env.VITE_STRAPI_URL || 'https://ragheb-strapi-backend.onrender.com';

// دالة تحويل رابط الصورة لـ HTTPS واسم النطاق الكامل
const getImageUrl = (img) => {
  if (!img) return null;
  const url = typeof img === 'string' ? img : (img.url || img.attributes?.url);
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL.replace(/\/$/, '')}${url.startsWith('/') ? '' : '/'}${url}`;
};

// دالة متطورة لاستخراج ID فيديو اليوتيوب (تدعم روابط الجوال، m.youtube، والـ Shorts)
const getYouTubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/)|m\.youtube\.com\/watch\?v=)([\w-]{11})/;
  const match = url.trim().match(regExp);
  return match ? match[1] : null;
};

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      let data = await getProjectBySlug(slug);

      // في حال كان السيرفر نائماً (Cold Start)، نستخدم البيانات المؤقتة
      if (!data) {
        console.warn("Strapi not available, using fallback data for details.");
        data = fallbackProjects.find((p) => p.slug === slug);
      }

      if (data) {
        // معالجة الملاحظات التقنية للووردبريس
        const rawNotes = data.wp_technical_notes;
        let parsedNotes = [];

        if (Array.isArray(rawNotes)) {
          parsedNotes = rawNotes;
        } else if (typeof rawNotes === 'string' && rawNotes.trim() !== '') {
          parsedNotes = rawNotes
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        }

        // معالجة أكواد المصدر (Code Snippets)
        let parsedSnippets = data.codeSnippets;
        if (typeof parsedSnippets === 'string' && parsedSnippets.trim() !== '') {
          try {
            parsedSnippets = JSON.parse(parsedSnippets);
          } catch (e) {
            parsedSnippets = [];
          }
        }

        const formattedProject = {
          id: data.id,
          slug: data.slug,
          title: data.title,
          category: data.category,
          year: data.year,
          summary: data.summary,
          description: data.description || data.summary,
          tech: Array.isArray(data.tech) ? data.tech : JSON.parse(data.tech || "[]"),
          icon: data.icon,
          videoUrl: data.videoUrl,
          gallery: Array.isArray(data.gallery) ? data.gallery : [],
          platform: data.platform || 'custom-code',
          wp_technical_notes: parsedNotes,
          codeSnippets: Array.isArray(parsedSnippets) ? parsedSnippets : [],
        };
        setProject(formattedProject);
      }

      setLoading(false);
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-display text-xl text-gold animate-pulse">
          Loading project details...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container grid min-h-[60vh] place-items-center text-center">
        <div>
          <h2 className="font-display text-3xl font-bold text-white">
            Project Not Found
          </h2>
          <p className="mt-4 text-mist">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/projects"
            className="mt-8 inline-block rounded-full bg-gold px-6 py-2.5 font-semibold text-night transition hover:opacity-90"
          >
            ← Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  const youtubeId = getYouTubeId(project.videoUrl);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container py-20"
    >
      <Link
        to="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-gold"
      >
        <HiArrowLeft className="h-4 w-4" />
        Back to All Projects
      </Link>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          
          {/* حاوية مشغل الفيديو المُحسنة للجوال */}
          {youtubeId ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-coal shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                title={project.title}
                className="absolute inset-0 h-full w-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="grid aspect-video w-full place-items-center rounded-3xl border border-white/10 bg-coal text-mist">
              <p>Video demo coming soon...</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-gold/10 px-3 py-1 font-semibold text-gold">
                {project.category}
              </span>
              <span className="text-mist">{project.year}</span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">
              {project.title}
            </h1>

            <p className="text-lg leading-relaxed text-mist">
              {project.description}
            </p>

            {/* الملاحظات التقنية للووردبريس */}
            {project.platform === 'wordpress' && (
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                  <FaCog className="text-gold" />
                  Technical Implementation & Configurations
                </h3>
                <p className="text-sm text-mist italic">
                  Built with visual builders and optimized configurations for performance and security.
                </p>
                
                {Array.isArray(project.wp_technical_notes) && project.wp_technical_notes.length > 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm">
                    <ul className="space-y-4">
                      {project.wp_technical_notes.map((note, index) => (
                        <li key={index} className="flex items-start gap-3 group/item">
                          <span className="mt-1 shrink-0 text-gold group-hover/item:text-yellow-400 transition-colors">
                            {index % 3 === 0 ? <FaRocket size={16}/> : index % 3 === 1 ? <FaShieldAlt size={16}/> : <FaCheckCircle size={16}/>}
                          </span>
                          <span className="text-gray-300 leading-relaxed text-sm md:text-base">
                            {note}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-mist italic text-sm">No technical notes available for this project.</p>
                )}
              </div>
            )}

            {/* عرض الأكواد */}
            {(project.platform !== 'wordpress') && project.codeSnippets?.length > 0 && (
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-2xl font-bold text-white">
                  Source Code Preview
                </h3>
                <p className="text-sm text-mist">
                  🔒 Protected view — explore the clean architecture and logic behind this project.
                </p>
                <ProtectedCodeViewer snippets={project.codeSnippets} />
              </div>
            )}
          </div>

          {/* معرض الصور */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-white">
                Project Gallery
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((img, idx) => {
                  const imgUrl = getImageUrl(img);
                  if (!imgUrl) return null;
                  return (
                    <img
                      key={idx}
                      src={imgUrl} 
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full rounded-2xl border border-white/5 object-cover hover:border-gold/30 transition-colors"
                      loading="lazy"
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* الشريط الجانبي الأيمن */}
        <div className="space-y-8">
          <div className="rounded-3xl border border-white/5 bg-card p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-white">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <TechBadge key={t}>{t}</TechBadge>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-card p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-white">
              Project Info
            </h3>
            <ul className="space-y-3 text-sm text-mist">
              <li className="flex justify-between">
                <span>Platform:</span>
                <span className="font-semibold text-white capitalize">
                  {project.platform === 'wordpress' ? 'WordPress CMS' : 'Custom Code'}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Category:</span>
                <span className="font-semibold text-white">
                  {project.category}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Year:</span>
                <span className="font-semibold text-white">{project.year}</span>
              </li>
              <li className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold text-gold">Completed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}