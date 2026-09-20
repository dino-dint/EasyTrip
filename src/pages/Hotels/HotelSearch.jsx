import { useState } from "react";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";

function HotelSearch({ onSearch }) {
  const [value, setValue] = useState("");
  const [place, setPlace] = useState("Anywhere");
  const [guests, setGuests] = useState("2 guests");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === "function") onSearch(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-4xl rounded-[32px] border border-white/40 bg-white p-3 shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:p-4"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
        <label className="flex items-center gap-3 rounded-full bg-slate-100 px-5 py-4 ring-1 ring-slate-200 transition focus-within:ring-sky-500">
          <Search size={18} className="shrink-0 text-sky-500" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search hotels, resorts, guest houses..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
        </label>

        <label className="flex items-center gap-2 rounded-full bg-slate-100 px-5 py-4 ring-1 ring-slate-200 transition focus-within:ring-sky-500">
          <MapPin size={16} className="shrink-0 text-sky-500" />
          <select
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-full cursor-pointer bg-transparent text-sm text-slate-800 outline-none [&>option]:text-slate-900"
          >
            {[
              "Anywhere",
              "Phnom Penh, Cambodia",
              "Siem Reap, Cambodia",
              "Sihanoukville, Cambodia",
              "Tokyo, Japan",
              "Seoul, South Korea",
              "Singapore",
              "Bangkok, Thailand",
              "London, UK",
            ].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 rounded-full bg-slate-100 px-5 py-4 ring-1 ring-slate-200 transition focus-within:ring-sky-500">
          <Users size={16} className="shrink-0 text-sky-500" />
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full cursor-pointer bg-transparent text-sm text-slate-800 outline-none [&>option]:text-slate-900"
          >
            {["1 guest", "2 guests", "4 guests", "6 guests"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="rounded-full bg-sky-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-400/40"
        >
          Search
        </button>
      </div>

      <p className="mt-3 flex items-center gap-2 px-3 text-xs text-white/75">
        <CalendarDays size={14} className="text-sky-300" />
        Flexible dates · Free cancellation on most stays · 2,000+ verified stays
      </p>
    </form>
  );
}

export default HotelSearch;