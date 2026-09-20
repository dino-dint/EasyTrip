import { MapPin, ArrowUpRight } from "lucide-react";

export default function OfficeLocation() {
  const googleMapLink =
    "https://maps.app.goo.gl/HqDkxYWTQR3t8uhP6";

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            VISIT OUR OFFICE
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Phnom Penh, Cambodia
          </h2>

          <p className="mt-6 leading-relaxed text-slate-600">
            Our EasyTrip headquarters is located in Phnom Penh, where our travel
            consultants help customers with bookings, travel planning, and
            support for hotels, flights, tours, and transportation.
          </p>

          {/* Address Card */}
          <div className="mt-8 flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="rounded-2xl bg-blue-100 p-3 text-blue-600">
              <MapPin size={24} />
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-900">
                EasyTrip Office
              </h4>

              <p className="mt-1 text-slate-600">
                Russian Boulevard,
                <br />
                Phnom Penh, Cambodia
              </p>
            </div>
          </div>

          {/* Get Directions Button */}
          <a
            href={googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
          >
            <MapPin size={18} />
            Get Directions
          </a>
        </div>

        {/* Clickable Google Map Preview */}
        <a
          href={googleMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-4xl shadow-xl"
        >
          <img
            src="/contact/map.png"
            alt="EasyTrip Office Location"
            className="h-87.5 w-full object-cover transition-all duration-500 group-hover:scale-105 lg:h-112.5"
          />

          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 via-blue-900/20 to-transparent transition-all duration-300 group-hover:from-blue-900/70 group-hover:via-blue-900/40" />

          {/* Floating Glass Button */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/30 bg-white/80 px-5 py-3 text-slate-900 backdrop-blur-md transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
            <MapPin size={18} />
            <span className="font-medium">Open in Google Maps</span>
            <ArrowUpRight size={16} />
          </div>
        </a>
      </div>
    </section>
  );
}