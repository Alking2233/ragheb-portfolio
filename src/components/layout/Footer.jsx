import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-coal">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-8 text-sm text-mist">
        <p>© {new Date().getFullYear()} Ragheb Yossof — WordPress & Front-End Developer</p>

        <div className="flex items-center gap-5 text-lg">
          <a href="https://github.com/technotart" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-gold"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/ragheb-y-333453265" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-gold"><FaLinkedinIn /></a>
          <a href="mailto:ragheb.yossof@gmail.com" aria-label="Email" className="transition-colors hover:text-gold"><FaEnvelope /></a>
        </div>

        <p className="text-xs">Built with React + Tailwind v4 · CMS by Strapi</p>
      </div>
    </footer>
  )
}