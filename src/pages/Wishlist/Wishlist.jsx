import { Link } from "react-router-dom";
import { Heart, MapPin, Star, ArrowRight, Trash2 } from "lucide-react";

import { wishlistData } from "../../data/wishlist";

const Wishlist = () => {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -right-32 top-80 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <Heart size={16} fill="currentColor" />
              Your saved places
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Wishlist
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
              Keep your favorite hotels, resorts, and destinations in one place
              for your next EasyTrip.
            </p>
          </div>

          <Link
            to="/destination"
            className="group inline-flex w-fit items-center gap-2 rounded-xl bg-[#08a9ed] px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0799d7]"
          >
            Explore destinations
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Wishlist cards */}
        {wishlistData.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistData.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5.5 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/8"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#071225]/80 via-transparent to-transparent" />

                  {/* Wishlist button */}
                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from wishlist`}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#071225]/70 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-red-500/80"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>

                  {/* Type */}
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#071225]/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {item.type}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-lg font-semibold">
                    {item.name}
                  </h2>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
                    <MapPin size={15} className="text-cyan-400" />
                    <span>{item.location}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="font-medium">{item.rating}</span>
                      <span className="text-xs text-slate-500">
                        ({item.reviews})
                      </span>
                    </div>

                    <div>
                      <span className="text-xl font-bold">${item.price}</span>
                      <span className="text-xs text-slate-500">/night</span>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Link
                      to={`/hotels/${item.id}`}
                      className="flex flex-1 items-center justify-center rounded-xl bg-[#08a9ed] px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-[#0799d7] hover:shadow-lg hover:shadow-cyan-500/20"
                    >
                      View Hotel
                    </Link>

                    <button
                      type="button"
                      aria-label="Remove from wishlist"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty wishlist */
          <div className="rounded-3xl border border-white/10 bg-white/4 px-6 py-20 text-center backdrop-blur-xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
              <Heart size={30} />
            </div>

            <h2 className="text-2xl font-bold">Your wishlist is empty</h2>

            <p className="mx-auto mt-2 max-w-md text-slate-400">
              Start exploring destinations and save your favorite places for
              your next trip.
            </p>

            <Link
              to="/destination"
              className="mt-6 inline-flex rounded-xl bg-[#08a9ed] px-6 py-3 font-semibold transition hover:bg-[#0799d7]"
            >
              Explore Now
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default Wishlist;
