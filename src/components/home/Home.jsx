const Home = () => {
  return (
    <section className="grid min-h-[calc(100vh-4rem)] place-items-center">
    <div className="relative">
      <div className="h-72 w-72 rounded-full bg-blob shadow-glow" />
      <h1 className="absolute inset-0 grid place-items-center px-6">
        <span className="font-display text-2xl text-center">
          I am a <span className="text-gold mx-2">creative</span> frontend developer
        </span>
      </h1>
    </div>
    </section>
  )
}

export default Home