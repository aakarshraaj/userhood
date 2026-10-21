export default function Hero() {
  return (
    <section className="bg-[#070707] px-5 pb-10 pt-28 md:px-8 md:pb-14 md:pt-36 lg:pt-40">
      <div className="brand-intro-hero-content mx-auto w-full max-w-[1440px]">
        <h1 className="max-w-[1200px] text-[clamp(3.5rem,9vw,8.5rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white">
          <span className="block">Dreaming </span>
          <span className="block text-white/65">as a Service.</span>
        </h1>
        <p className="mt-6 max-w-[42rem] text-xl leading-relaxed text-white/90 sm:text-2xl md:mt-8">
          <span className="block sm:inline">Hire us for the thinking. </span>
          <span className="block sm:inline">Keep us for what we make.</span>
        </p>
        <p className="mt-3 max-w-[42rem] text-base leading-relaxed text-white/55 md:text-lg">
          Product strategy, design and engineering for founders and product teams.
        </p>
      </div>
    </section>
  );
}
