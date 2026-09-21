import { useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Flame,
  Sparkles,
  Waves,
} from "lucide-react";

import HotelCard from "./HotelCard";
import HotelSearch from "./HotelSearch";
import { HOTELS } from "../../data/hotels";

// Hotel Section
const sections = [
  {
    title: "Recently viewed",
    subtitle: "The stays travellers have been opening the most right now",
    icon: Eye,
    hotels: [...HOTELS].sort((a, b) => b.viewCount - a.viewCount),
  },
  {
    title: "Top luxury 5-star hotels & resorts",
    subtitle: "Signature suites, skyline pools and five-star pampering",
    icon: Sparkles,
    hotels: HOTELS.filter((hotel) => hotel.star === 5),
  },
  {
    title: "Trending guest houses worldwide",
    subtitle: "Cosy, characterful and buzzing with good vibes",
    icon: Flame,
    hotels: HOTELS.filter((hotel) =>
      hotel.type.toLowerCase().includes("guest house")
    ),
  },
  {
    title: "Beach & resort escapes",
    subtitle: "Pools, palm trees and picture-perfect sunsets",
    icon: Waves,
    hotels: HOTELS.filter((hotel) =>
      hotel.type.toLowerCase().includes("resort")
    ),
  },
];

// Hotel Page
function Hotels() {
  // Search filters from HotelSearch component
  const [query, setQuery] = useState({
    keyword: "",
    place: "Anywhere",
    guests: "2 guests",
  });

  // Search filter
  const results = useMemo(() => {
    const keyword = query.keyword.toLowerCase().trim();
    const guestCount = Number(query.guests.split(" ")[0]);

    return HOTELS.filter((hotel) => {
      // Search keyword
      const matchKeyword =
        keyword === "" ||
        hotel.name.toLowerCase().includes(keyword) ||
        hotel.location.toLowerCase().includes(keyword) ||
        hotel.country.toLowerCase().includes(keyword) ||
        hotel.type.toLowerCase().includes(keyword);

      // Search location
      const matchPlace =
        query.place === "Anywhere" || hotel.location === query.place;

      // Search guests
      const matchGuests =
        !hotel.guests || hotel.guests >= guestCount;

      return matchKeyword && matchPlace && matchGuests;
    });
  }, [query]);

  const hasSearch =
    query.keyword !== "" || query.place !== "Anywhere";

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900">
      {/* HERO*/}
      <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/55 to-slate-50" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-400/20 px-4 py-2 text-sm font-medium tracking-wide text-sky-100 backdrop-blur-md">
              <Sparkles size={16} />
              Hotels & Stays
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Find your perfect
              <span className="block bg-linear-to-r from-sky-200 via-sky-300 to-blue-200 bg-clip-text text-transparent">
                place to stay.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              From five-star icons to cosy guest houses worldwide — browse
              thousands of verified stays and book in a few taps.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-10">
            <HotelSearch onSearch={setQuery} />
          </div>
        </div>
      </section>

      {/* BODY  */}
      <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {hasSearch ? (
          <section>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Results for{" "}
                  <span className="text-sky-600">
                    “{query.keyword || query.place}”
                  </span>
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {results.length} stay
                  {results.length === 1 ? "" : "s"} found
                </p>
              </div>

              <button
                onClick={() =>
                  setQuery({
                    keyword: "",
                    place: "Anywhere",
                    guests: "2 guests",
                  })
                }
                className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-600 transition hover:bg-sky-500 hover:text-white"
              >
                Clear Search
              </button>
            </div>

            {results.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {results.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <p className="text-lg font-semibold text-slate-900">
                  No stays found for “{query.keyword || query.place}”.
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Try searching another hotel, city, or destination.
                </p>
              </div>
            )}
          </section>
        ) : (
          <div className="space-y-16">
            {sections.map((section) => (
              <HotelRow key={section.title} {...section} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ============================
// Horizontal Hotel Row
// ============================
function HotelRow({ title, subtitle, icon: Icon, hotels }) {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: direction * (rowRef.current.clientWidth - 140),
      behavior: "smooth",
    });
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-600">
            <Icon size={20} />
          </span>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {title}
              <span className="text-sky-500">.</span>
            </h2>

            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden gap-2 md:flex">
          <button
            onClick={() => scrollRow(-1)}
            className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-sky-500 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scrollRow(1)}
            className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-sky-500 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Hotel Cards */}
      <div
        ref={rowRef}
        className="no-scrollbar -mx-4 mt-7 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6"
      >
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="w-[75vw] max-w-[320px] shrink-0 snap-start sm:w-75"
          >
            <HotelCard hotel={hotel} />
          </div>
        ))}

        {hotels.length === 0 && (
          <p className="py-16 text-center text-slate-500">
            More stays coming soon...
          </p>
        )}
      </div>
    </section>
  );
}

export default Hotels;