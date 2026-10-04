import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/home/Hero'
import AboutSection from '../components/home/AboutSection'
import PaletteSection from '../components/home/PaletteSection'
import ProjectsGrid from '../components/projects/ProjectsGrid'
import SectionTitle from '../components/ui/SectionTitle'
import { fallbackProjects } from '../data/fallbackProjects'
import { getProjects } from '../services/strapi'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        // جلب كل المشاريع من Strapi
        const data = await getProjects()

        let list = []

        if (data && Array.isArray(data) && data.length > 0) {
          // توحيد شكل البيانات (يدعم Strapi v4 و v5)
          list = data.map((item) => {
            const p = item.attributes || item
            return {
              id: item.id || p.id,
              slug: p.slug,
              title: p.title,
              category: p.category,
              year: p.year,
              summary: p.summary,
              tech: Array.isArray(p.tech) ? p.tech : JSON.parse(p.tech || '[]'),
              icon: p.icon,
              // مهم جداً: تمرير رابط الفيديو ليظهر الغلاف بدل الأيقونة
              videoUrl: p.videoUrl || p.video_url || null,
              isFeatured: Boolean(p.isFeatured),
              order: p.order ?? 0,
            }
          })

          // المشاريع المميزة فقط، مرتبة
          list = list
            .filter((p) => p.isFeatured)
            .sort((a, b) => a.order - b.order)
            .slice(0, 3)
        }

        // إذا لم تأتِ بيانات حية، استخدم الـ Fallback
        if (!list || list.length === 0) {
          console.warn('Strapi featured not available, using fallback.')
          const featuredFallback = fallbackProjects.filter((p) => p.isFeatured)
          list =
            featuredFallback.length > 0
              ? featuredFallback.slice(0, 3)
              : fallbackProjects.slice(0, 3)
        }

        setProjects(list)
      } catch (err) {
        console.error('Home featured fetch error:', err)
        const featuredFallback = fallbackProjects.filter((p) => p.isFeatured)
        setProjects(
          featuredFallback.length > 0
            ? featuredFallback.slice(0, 3)
            : fallbackProjects.slice(0, 3)
        )
      } finally {
        setLoading(false)
      }
    }

    loadFeatured()
  }, [])

  return (
    <>
      <Hero />
      <AboutSection />

      <section className="container py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <SectionTitle kicker="Selected work" title="Featured projects" />
          <Link to="/projects" className="text-sm text-gold hover:underline">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <p className="font-display text-lg text-gold animate-pulse">
              Loading featured projects...
            </p>
          </div>
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </section>

      <PaletteSection />
    </>
  )
}