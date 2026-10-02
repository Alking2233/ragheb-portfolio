import { Link } from 'react-router-dom'
import Hero from '../components/home/Hero'
import AboutSection from '../components/home/AboutSection'
import PaletteSection from '../components/home/PaletteSection'
import ProjectsGrid from '../components/projects/ProjectsGrid'
import SectionTitle from '../components/ui/SectionTitle'
import { fallbackProjects } from '../data/fallbackProjects'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />

      <section className="container py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <SectionTitle kicker="Selected work" title="Featured projects" />
          <Link to="/projects" className="text-sm text-gold hover:underline">View all →</Link>
        </div>
        <ProjectsGrid projects={fallbackProjects.slice(0, 3)} />
      </section>

      <PaletteSection />
    </>
  )
}