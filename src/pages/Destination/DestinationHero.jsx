import { Search, MapPin, Plane } from "lucide-react";

export default function DestinationHero({ search, setSearch }) {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/destinations/HeroDestination.jpg"
          alt="Beautiful travel destination"
          className="h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Bottom Gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-[#020617]" />

        {/* Blue Glow */}
        <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center text-white">
          {/* Small Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-slate-200 shadow-lg backdrop-blur-xl">
            <Plane size={16} className="text-cyan-400" />
            <span>Explore the world with EasyTrip</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Discover Your
            <span className="block bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Next Destination
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Explore amazing places across Cambodia, Japan, South Korea, China,
            and the USA. Find your next adventure and make unforgettable
            memories with EasyTrip.
          </p>

          {/* Search Box */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="group flex items-center rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-xl transition duration-300 focus-within:border-cyan-400/50 focus-within:bg-white/15">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                <Search className="text-cyan-400" size={21} />
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destination, city or country..."
                className="h-12 w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-400 sm:text-base"
              />

              <button
                type="button"
                className="hidden rounded-xl bg-cyan-500 px-6 py-3 font-medium text-white transition hover:bg-cyan-400 sm:block"
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin size={17} className="text-cyan-400" />
              <span>5 Countries</span>
            </div>

            <div className="h-1 w-1 rounded-full bg-slate-500" />

            <div className="flex items-center gap-2">
              <Plane size={17} className="text-cyan-400" />
              <span>Beautiful Experiences</span>
            </div>

            <div className="h-1 w-1 rounded-full bg-slate-500" />

            <span>Travel Made Simple</span>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#020617] to-transparent" />
    </section>
  );
}