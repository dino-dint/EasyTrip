import { useState } from "react";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";

function HotelSearch({ onSearch }) {
  const [value, setValue] = useState("");
  const [place, setPlace] = useState("Anywhere");
  const [guests, setGuests] = useState("2 guests");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      keyword: value.trim(),
      place,
      guests,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-4xl rounded-[32px] border border-white/40 bg-white p-3 shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:p-4"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center">

        {/* Search Input */}
        <label className="flex items-center gap-3 rounded-full bg-slate-100 px-5 py-4 ring-1 ring-slate-200 focus-within:ring-sky-500">
          <Search size={18} className="text-sky-500" />

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search hotels, resorts, guest houses..."
            className="w-full bg-transparent outline-none text-sm"
          />
        </label>

        {/* Location */}
        <label className="flex items-center gap-2 rounded-full bg-slate-100 px-5 py-4 ring-1 ring-slate-200 focus-within:ring-sky-500">
          <MapPin size={16} className="text-sky-500" />

          <select
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="bg-transparent outline-none text-sm cursor-pointer w-full"
          >
            {[
              "Anywhere",
              "Phnom Penh, Cambodia",
              "Siem Reap, Cambodia",
              "Sihanoukville, Cambodia",
              "Koh Kong, Cambodia",
              "Tokyo, Japan",
              "Hakone, Japan",
              "Kyoto, Japan",
              "Seoul, South Korea",
              "Shanghai, China",
              "San Francisco, USA",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        {/* Guests */}
        <label className="flex items-center gap-2 rounded-full bg-slate-100 px-5 py-4 ring-1 ring-slate-200 focus-within:ring-sky-500">
          <Users size={16} className="text-sky-500" />

          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="bg-transparent outline-none text-sm cursor-pointer w-full"
          >
            {["1 guest", "2 guests", "4 guests", "6 guests"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        {/* Button */}
        <button
          type="submit"
          className="rounded-full bg-sky-500 px-7 py-4 text-white text-sm font-semibold hover:bg-sky-400 duration-300"
        >
          Search
        </button>
      </div>

      <p className="mt-3 flex items-center gap-2 px-3 text-xs text-sky-500/50">
        <CalendarDays size={14} />
        Flexible dates · Free cancellation on most stays · 2,000+ verified stays
      </p>
    </form>
  );
}

export default HotelSearch;