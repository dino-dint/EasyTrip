import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { locations } from "../../data/homeData";

export default function Locations() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold tracking-widest text-blue-600">
            EXPLORE DESTINATIONS
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Discover Your Next Adventure
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
            Explore amazing destinations and start planning your next
            unforgettable journey.
          </p>
        </div>

        {/* Country Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location, index) => (
            <article
              key={location.id}
              className={`group flex flex-col h-full bg-white border border-zinc-950 shadow-xl overflow-hidden rounded-3xl  shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "h-72 sm:h-80" : "h-72"
                }`}
              >
                <img
                  src={location.image}
                  alt={location.country}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

                {/* Country Badge */}
                <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                  {location.flag} {location.country}
                </div>

                {/* Image Text */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="max-w-xl text-sm leading-6 text-white/90">
                    {location.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Popular Cities
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {location.cities.map((city) => (
                      <span
                        key={city}
                        className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={location.path}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700"
                >
                  Explore Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}