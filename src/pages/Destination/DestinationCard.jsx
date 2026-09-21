import { MapPin, Star, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DestinationCard({ destination }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/destination/${destination.slug}`)}
      className="group cursor-pointer overflow-hidden rounded-3xl border-2 border-black/20 bg-slate-100 transition duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.image}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-white">
          {destination.country}
        </span>
      </div>

      <div className="space-y-4 p-5 text-black">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{destination.title}</h3>
            <p className="flex items-center gap-1 text-sm text-slate-400">
              <MapPin size={15} /> {destination.city}
            </p>
          </div>

          <ArrowUpRight className="transition group-hover:text-cyan-400 group-hover:rotate-45" />
        </div>

        <p className="text-sm text-slate-400">{destination.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Starting From</p>
            <h4 className="text-2xl font-bold text-cyan-400">${destination.price}</h4>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-400/20 px-3 py-1 text-yellow-300">
            <Star size={15} fill="currentColor" />
            {destination.rating}
          </div>
        </div>
      </div>
    </div>
  );
}