import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
// استيراد الأيقونات لعرض النقاط التقنية بشكل جذاب
import { FaCog, FaShieldAlt, FaRocket, FaCheckCircle } from "react-icons/fa"; 
import { getProjectBySlug } from "../services/strapi";
import { fallbackProjects } from "../data/fallbackProjects";
import TechBadge from "../components/projects/TechBadge";
import ProtectedCodeViewer from "../components/ui/ProtectedCodeViewer";

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      // محاولة جلب البيانات من Strapi أولاً
      let data = await getProjectBySlug(slug);

      // إذا فشل Strapi، ابحث في البيانات المؤقتة (Fallback)
      if (!data) {
        console.warn("Strapi not available, using fallback data for details.");
        data = fallbackProjects.find((p) => p.slug === slug);
      }

      if (data) {
        // ✅ المعالجة الذكية لبيانات wp_technical_notes
        // الهدف: ضمان أن تكون دائماً مصفوفة (Array) حتى لو جاءت كنص (String)
        const rawNotes = data.wp_technical_notes;
        let parsedNotes = [];

        if (Array.isArray(rawNotes)) {
          parsedNotes = rawNotes;
        } else if (typeof rawNotes === 'string' && rawNotes.trim() !== '') {
          // تقسيم النص على الأسطر الجديدة وإزالة الفراغات والسطور الفارغة
          parsedNotes = rawNotes
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
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
          gallery: data.gallery || [],
          
          // الحقول الخاصة بالووردبريس والمشاريع المخصصة
          platform: data.platform || 'custom-code', // افتراض أنه كود مخصص إذا لم يحدد
          wp_technical_notes: parsedNotes, // <-- هنا نضع المصفوفة الآمنة
          
          codeSnippets: Array.isArray(data.codeSnippets) ? data.codeSnippets : [],
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

  // دالة لاستخراج ID يوتيوب
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = getYouTubeId(project.videoUrl);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container py-20"
    >
      {/* زر العودة */}
      <Link
        to="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-gold"
      >
        <HiArrowLeft className="h-4 w-4" />
        Back to All Projects
      </Link>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* العمود الأيسر: الفيديو والمعلومات الرئيسية */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* حاوية الفيديو الكبيرة */}
          {youtubeId ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-coal shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                title={project.title}
                className="absolute inset-0 h-full w-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="grid aspect-video w-full place-items-center rounded-3xl border border-white/10 bg-coal text-mist">
              <p>Video demo coming soon...</p>
            </div>
          )}

          {/* العنوان والوصف */}
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

            {/* ================= قسم المحتوى التقني (ذكي) ================= */}
            
            {/* حالة 1: مشاريع الووردبريس - عرض النقاط التقنية */}
            {project.platform === 'wordpress' && (
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                  <FaCog className="text-gold" />
                  Technical Implementation & Configurations
                </h3>
                <p className="text-sm text-mist italic">
                  Built with visual builders and optimized configurations for performance and security.
                </p>
                
                {/* التحقق من وجود المصفوفة قبل الخريطة */}
                {Array.isArray(project.wp_technical_notes) && project.wp_technical_notes.length > 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm">
                    <ul className="space-y-4">
                      {project.wp_technical_notes.map((note, index) => (
                        <li key={index} className="flex items-start gap-3 group/item">
                          {/* تنويع الأيقونات حسب ترتيب النقطة لإعطاء حيوية بصرية */}
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

            {/* حالة 2: المشاريع البرمجية (React/Vanilla JS) - عرض عارض الكود المحمي */}
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

            {/* ================= نهاية القسم التقني ================= */}

          </div>

          {/* معرض الصور (Gallery) */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-white">
                Project Gallery
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    // دعم كلا النوعين: رابط نصي بسيط أو كائن media كامل من Strapi
                    src={typeof img === 'string' ? img : img.url} 
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full rounded-2xl border border-white/5 object-cover hover:border-gold/30 transition-colors"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* العمود الأيمن: الشريط الجانبي (التقنيات والتفاصيل) */}
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