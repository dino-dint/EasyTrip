import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";
import { destinations } from "../../data/homeData";

export default function PopularDestination() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-bold tracking-widest text-blue-600">
              POPULAR DESTINATIONS
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Explore Top Places Around the World
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-500">
            Discover popular destinations loved by EasyTrip travelers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article
              key={destination.id}
              className="group overflow-hidden rounded-3xl border border-zinc-950  bg-white shadow-lg shadow-slate-200/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={`${destination.city}, ${destination.country}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent" />

                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-slate-800 shadow-lg">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                  {destination.rating}
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm font-medium text-blue-600">
                  {destination.country}
                </p>

                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  {destination.city}
                </h3>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Starting from</p>

                    <p className="text-xl font-bold text-slate-900">
                      {destination.price}

                      <span className="text-sm font-normal text-slate-400">
                        {" "}
                        / night
                      </span>
                    </p>
                  </div>

                  <Link
                    to={destination.path}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700"
                    aria-label={`Explore ${destination.city}`}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
