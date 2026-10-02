export default function SectionTitle({ kicker, title }) {
    return (
      <div className="space-y-1">
        {kicker && <p className="section-title">{kicker}</p>}
        <h2 className="font-display text-2xl font-bold md:text-3xl">{title}</h2>
      </div>
    )
  }