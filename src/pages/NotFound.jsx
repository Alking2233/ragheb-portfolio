import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="font-display text-7xl text-gold">404</p>
        <p className="mt-2 text-mist">This page wandered off the gradient.</p>
        <Link to="/" className="mt-6 inline-block rounded-full border border-gold/60 px-5 py-2 text-gold transition hover:bg-gold hover:text-night">
          Back home
        </Link>
      </div>
    </section>
  )
}