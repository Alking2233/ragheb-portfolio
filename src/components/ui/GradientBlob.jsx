export default function GradientBlob({ className = '' }) {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute rounded-full bg-blob opacity-25 blur-3xl ${className}`}
      />
    )
  }