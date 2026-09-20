import { Link } from "react-router-dom";
import { ArrowRightLeft, Clock, Plane, Star } from "lucide-react";
import { fallbackImg } from "../../data/flight";

function FlightCard({ flight }) {
  return (
    <Link
      to={`/flight/${flight.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_20px_50px_rgba(56,189,248,0.25)]"
    >
      <div className="relative h-40 shrink-0 overflow-hidden">
        <img
          src={flight.image}
          alt={`${flight.fromCity} to ${flight.toCity}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImg(flight.id, 900, 560);
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-700 backdrop-blur-md">
          {flight.airline}
        </span>

        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white shadow-md ${
            flight.stops === 0 ? "bg-emerald-500" : "bg-amber-500"
          }`}
        >
          {flight.stopsLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">{flight.fromCode}</span>
          <span className="flex-1 px-2 text-center">
            <Plane
              size={18}
              className="mx-auto rotate-90 text-sky-500 transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
          <span className="text-xl font-bold text-slate-900">{flight.toCode}</span>
        </div>

        <div className="mt-1 flex items-center justify-between text-sm text-slate-500">
          <span className="truncate">{flight.fromCity}</span>
          <span className="truncate">{flight.toCity}</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-sky-500" />
            {flight.duration}
          </span>
          <span>
            {flight.departure} - {flight.arrival}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
            <Star size={11} fill="currentColor" className="text-amber-400" />
            {flight.rating}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <span className="text-xl font-bold text-slate-900">
              ${flight.price}
            </span>
            <span className="ml-1 text-xs text-slate-400">/ person</span>
            <div className="text-xs text-slate-400">
              <span className="mr-2">
                was <span className="line-through">${flight.oldPrice}</span>
              </span>
            </div>
          </div>

          <span className="flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-600 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white">
            <ArrowRightLeft size={13} />
            View fare
          </span>
        </div>
      </div>
    </Link>
  );
}

export default FlightCard;