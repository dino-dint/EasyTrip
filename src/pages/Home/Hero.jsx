import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  ShieldCheck,
  BadgeDollarSign,
  CalendarDays,
  MapPin,
  Users,
  Search,
  Minus,
  Plus,
} from "lucide-react";

const tabs = [
  {
    label: "Hotels",
    value: "hotel",
    icon: MapPin,
  },
  {
    label: "Flights",
    value: "flight",
    icon: Plane,
  },
];

const trustBadges = [
  {
    icon: BadgeDollarSign,
    text: "Best Price Guarantee",
  },
  {
    icon: CalendarDays,
    text: "Free Cancellation",
  },
  {
    icon: ShieldCheck,
    text: "Secure Reservation",
  },
];

export default function Hero() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("hotel");

  const [destination, setDestination] = useState("");

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [guests, setGuests] = useState(2);

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    params.set("type", activeTab);

    if (destination.trim()) {
      params.set("destination", destination.trim());
    }

    if (checkIn) {
      params.set("checkIn", checkIn);
    }

    if (checkOut) {
      params.set("checkOut", checkOut);
    }

    params.set("guests", guests);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Desktop Background */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center md:block"
        style={{
          backgroundImage: "url('/bg-hero.jpg')",
        }}
      />

      {/* Mobile Background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: "url('/phone-bg-hero.jpg')",
        }}
      />

      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-950/80 via-blue-900/60 to-slate-950/95" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md">
            <Plane className="h-4 w-4 text-blue-300" />

            <span>Explore the World with EasyTrip</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Turn Your Stays Into{" "}
            <span className="text-blue-300">Unforgettable Adventures</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-50/90 sm:text-lg">
            Book hotels, flights, tours, transportation, and unforgettable
            experiences around the world with EasyTrip.
          </p>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;

              return (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md sm:text-sm"
                >
                  <Icon className="h-4 w-4 text-blue-300" />

                  {badge.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* Search Card */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 w-full max-w-6xl rounded-3xl border border-white/30 bg-white/95 p-3 shadow-2xl backdrop-blur-xl sm:p-5"
        >
          {/* Tabs */}
          <div className="mb-5 flex gap-1 overflow-x-auto border-b border-slate-200 pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              const isActive = activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-blue-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />

                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Fields */}
          <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            {/* Destination */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-all duration-300 focus-within:border-blue-500">
              <MapPin className="h-5 w-5 shrink-0 text-blue-600" />

              <div className="min-w-0 flex-1">
                <label
                  htmlFor="destination"
                  className="block text-xs font-medium text-slate-400"
                >
                  Destination
                </label>

                <input
                  id="destination"
                  type="text"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  placeholder="Where are you going?"
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Check In */}
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <CalendarDays className="h-5 w-5 shrink-0 text-blue-600" />

              <div>
                <span className="block text-xs font-medium text-slate-400">
                  Check In
                </span>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                />
              </div>
            </label>

            {/* Check Out */}
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <CalendarDays className="h-5 w-5 shrink-0 text-blue-600" />

              <div>
                <span className="block text-xs font-medium text-slate-400">
                  Check Out
                </span>

                <input
                  type="date"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none"
                />
              </div>
            </label>

            {/* Guests */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-600" />

                <div>
                  <p className="text-xs font-medium text-slate-400">Guests</p>

                  <p className="text-sm font-semibold text-slate-800">
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setGuests((current) => Math.max(1, current - 1))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-blue-100 hover:text-blue-600"
                >
                  <Minus className="h-3 w-3" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setGuests((current) => Math.min(10, current + 1))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-blue-100 hover:text-blue-600"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Search */}
            <button
              type="submit"
              className="flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
            >
              <Search className="h-5 w-5" />

              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
