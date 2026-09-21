import { Link } from "react-router-dom";
import { BedDouble, MapPin, Star } from "lucide-react";
import { fallbackImg } from "../../data/hotels";

function HotelCard({ hotel }) {
  return (
    <Link
      to={`/accommodation/${hotel.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1  hover:shadow-[0_20px_50px_rgba(56,189,248,0.25)]"
    >
      <div className="relative h-52 shrink-0 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImg(hotel.id, 900, 600);
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5" />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-700 backdrop-blur-md">
          {hotel.type}
        </span>

        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-sky-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
          <Star size={12} fill="currentColor" />
          {hotel.rating}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-lg font-semibold text-slate-900 transition-colors group-hover:text-sky-600">
            {hotel.name}
          </h3>
        </div>

        <div className="mt-1.5 flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5 truncate">
            <MapPin size={14} className="shrink-0 text-sky-500" />
            {hotel.location}
          </span>
          <span className="flex shrink-0 items-center gap-1.5">
            <BedDouble size={14} className="shrink-0 text-sky-500" />
            {hotel.rooms[0]?.guests} guests max
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          ({hotel.reviews.toLocaleString()} reviews)
        </p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <span className="text-xl font-bold text-slate-900">
              ${hotel.pricePerNight}
            </span>
            <span className="ml-1 text-xs text-slate-400">/ night</span>
            <div className="text-xs text-slate-400">
              <span className="mr-2">
                from <span className="line-through">${hotel.oldPrice}</span>
              </span>
            </div>
          </div>

          <span className="rounded-full border   bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-600 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white">
            View Stay
          </span>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;