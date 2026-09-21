import { useParams, useNavigate } from "react-router-dom";
import { destinations } from "../../data/destination";
import { ArrowLeft, MapPin, Star } from "lucide-react";

export default function DestinationDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const destination = destinations.find((d) => d.slug === slug);

  if (!destination)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Destination not found.
      </div>
    );

  return (
    <main className="bg-slate-950 text-white">
      <section className="relative h-[75vh]">
        <img
          src={destination.image}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-black/40 to-black/20" />

        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 rounded-full bg-black/40 p-3 backdrop-blur-md"
        >
          <ArrowLeft />
        </button>

        <div className="absolute bottom-10 left-6 md:left-20 max-w-3xl">
          <span className="rounded-full bg-cyan-500 px-4 py-2 text-sm">
            {destination.country}
          </span>

          <h1 className="mt-5 text-5xl font-bold">{destination.title}</h1>

          <div className="mt-4 flex gap-5 text-slate-300 flex-wrap">
            <span className="flex items-center gap-2">
              <MapPin size={18} /> {destination.city}
            </span>
            <span className="flex items-center gap-2 text-yellow-400">
              <Star size={18} fill="currentColor" /> {destination.rating}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold">About This Destination</h2>
          <p className="text-slate-300 leading-8">{destination.description}</p>

          <h3 className="text-2xl font-bold">Travel Highlights</h3>

          <ul className="space-y-3 text-slate-300">
            <li>• Famous attractions and historical landmarks.</li>
            <li>• Local food and cultural experiences.</li>
            <li>• Beautiful photography spots.</li>
            <li>• EasyTrip hotel and flight recommendations.</li>
          </ul>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-slate-400">Starting Price</p>
          <h2 className="mt-2 text-5xl font-bold text-cyan-400">
            ${destination.price}
          </h2>

          <button
            onClick={() => navigate("/flight")}
            className="mt-8 w-full rounded-full bg-cyan-500 py-4 font-semibold hover:bg-cyan-400"
          >
            Book Flight
          </button>

          <button
            onClick={() => navigate("/accommodation")}
            className="mt-4 w-full rounded-full border border-cyan-400 py-4 hover:bg-cyan-500/10"
          >
            Find Hotels
          </button>
        </div>
      </section>
    </main>
  );
}