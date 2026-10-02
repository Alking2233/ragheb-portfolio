import { useEffect, useState } from 'react';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import SectionTitle from '../components/ui/SectionTitle';
import { getProjects } from '../services/strapi';
import { fallbackProjects } from '../data/fallbackProjects'; // كخطة احتياطية

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      
      // إذا نجح الاتصال بـ Strapi، استخدم بياناته، وإلا استخدم البيانات المؤقتة
      if (data && data.length > 0) {
        // تنسيق بيانات Strapi لتطابق شكل مكون ProjectCard
        const formattedProjects = data.map(item => ({
          id: item.id,
          slug: item.slug,
          title: item.title,
          category: item.category,
          year: item.year,
          summary: item.summary,
          tech: Array.isArray(item.tech) ? item.tech : JSON.parse(item.tech || '[]'),
          icon: item.icon,
          videoUrl: item.videoUrl,
          isFeatured: item.isFeatured,
          order: item.order
        }));
        
        // ترتيب المشاريع حسب حقل order
        formattedProjects.sort((a, b) => a.order - b.order);
        setProjects(formattedProjects);
      } else {
        console.warn('Strapi not available, using fallback data.');
        setProjects(fallbackProjects);
      }
      
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <p className="font-display text-xl text-gold animate-pulse">Loading projects from CMS...</p>
      </div>
    );
  }

  return (
    <section className="container py-20">
      <SectionTitle kicker="Portfolio" title="All Projects" />
      <p className="mt-3 mb-10 max-w-xl text-mist">
        {projects.length} professional builds from my journey — served live from Strapi Headless CMS.
      </p>
      <ProjectsGrid projects={projects} />
    </section>
  );
}