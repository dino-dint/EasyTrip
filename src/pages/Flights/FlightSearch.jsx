import {
  Armchair,
  ArrowRightLeft,
  CalendarDays,
  PlaneTakeoff,
  PlaneLanding,
  Search,
  Users,
} from "lucide-react";
import { AIRPORTS, fmtDay } from "../../data/flight";

function FlightSearch({
  from,
  to,
  departDate,
  returnDate,
  cabin,
  adults,
  onSwap,
  onSelectAirport,
  onSelectCabin,
  onSelectAdults,
  onOpenCalendar,
  onSubmit,
}) {
  const fieldClass =
    "flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3.5 ring-1 ring-slate-200 transition focus-within:ring-sky-500";

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-5xl rounded-[32px] border border-white/40 bg-white p-3 shadow-[0_25px_70px_rgba(0,0,0,0.35)] sm:p-4"
    >
      {/* Primary row */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center lg:grid-cols-[1fr_auto_1fr_1.9fr]">
        <label className={fieldClass}>
          <PlaneTakeoff size={18} className="shrink-0 text-sky-500" />
          <span className="flex w-full flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              From
            </span>
            <select
              value={from.code}
              onChange={(e) => onSelectAirport("from", e.target.value)}
              className="w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-900 outline-none [&>option]:text-slate-900"
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </span>
        </label>

        <div className="flex justify-center">
          <button
            type="button"
            aria-label="Swap destinations"
            onClick={onSwap}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-sky-500 shadow-sm transition hover:bg-sky-500 hover:text-white"
          >
            <ArrowRightLeft size={17} className="rotate-90 md:rotate-0" />
          </button>
        </div>

        <label className={fieldClass}>
          <PlaneLanding size={18} className="shrink-0 text-sky-500" />
          <span className="flex w-full flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              To
            </span>
            <select
              value={to.code}
              onChange={(e) => onSelectAirport("to", e.target.value)}
              className="w-full cursor-pointer bg-transparent text-sm font-semibold text-slate-900 outline-none [&>option]:text-slate-900"
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </span>
        </label>

        <button
          type="button"
          onClick={() => onOpenCalendar()}
          className={`${fieldClass} w-full text-left`}
        >
          <CalendarDays size={18} className="shrink-0 text-sky-500" />
          <span className="flex w-full flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Depart — Return
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {fmtDay(departDate)} → {fmtDay(returnDate)}
            </span>
          </span>
        </button>
      </div>

      {/* Secondary row */}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className={fieldClass}>
          <Armchair size={18} className="shrink-0 text-sky-500" />
          <select
            value={cabin}
            onChange={(e) => onSelectCabin(e.target.value)}
            className="w-full cursor-pointer bg-transparent text-sm text-slate-800 outline-none [&>option]:text-slate-900"
          >
            {["Economy", "Premium Economy", "Business"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className={fieldClass}>
          <Users size={18} className="shrink-0 text-sky-500" />
          <select
            value={adults}
            onChange={(e) => onSelectAdults(Number(e.target.value))}
            className="w-full cursor-pointer bg-transparent text-sm text-slate-800 outline-none [&>option]:text-slate-900"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} Adult{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
        

        {/* <button
          type="submit"
          className="rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-400/40"
        >
          <span className="inline-flex items-center gap-2">
            <Search size={16} />
            Search Flights
            
          </span>
        </button> */}

        <p className="flex items-center gap-2 px-2 text-xs text-slate-400 sm:ml-auto">
          <CalendarDays size={14} className="shrink-0 text-sky-500" />
          Flexible dates · 100+ airlines · 24/7 support
        </p>
      </div>
    </form>
  );
}

export default FlightSearch;