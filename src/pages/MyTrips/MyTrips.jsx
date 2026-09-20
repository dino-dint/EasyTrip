import { Link } from "react-router-dom";
import {
  Plane,
  MapPin,
  CalendarDays,
  Users,
  Ticket,
  ArrowRight,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import { myTripsData } from "../../data/wishlist";

const MyTrip = () => {
  return (
    <main className="min-h-screen bg-[#071225] text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-96 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            <Plane size={16} />
            Your travel dashboard
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Trip
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
            Manage your upcoming trips, bookings, and travel plans with
            EasyTrip.
          </p>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5.5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <Plane size={21} />
            </div>

            <p className="text-sm text-slate-500">Upcoming Trips</p>

            <p className="mt-1 text-2xl font-bold">{myTripsData.length}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5.5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <Ticket size={21} />
            </div>

            <p className="text-sm text-slate-500">Confirmed Bookings</p>

            <p className="mt-1 text-2xl font-bold">{myTripsData.length}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5.5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <CheckCircle2 size={21} />
            </div>

            <p className="text-sm text-slate-500">Travel Status</p>

            <p className="mt-1 text-2xl font-bold">Ready</p>
          </div>
        </div>

        {/* Trips */}
        <div className="space-y-6">
          {myTripsData.map((trip) => (
            <article
              key={trip.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5.5 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07]"
            >
              <div className="grid lg:grid-cols-[320px_1fr]">
                {/* Trip image */}
                <div className="relative h-64 overflow-hidden lg:h-full">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#071225]/80 via-transparent to-transparent" />

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-[#071225]/70 px-3 py-1.5 text-xs font-semibold text-cyan-300 backdrop-blur-md">
                    <CheckCircle2 size={14} />
                    {trip.status}
                  </div>
                </div>

                {/* Trip information */}
                <div className="p-5 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-cyan-400">
                        Your upcoming journey
                      </p>

                      <h2 className="mt-1 text-2xl font-bold">
                        {trip.destination}
                      </h2>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                        <MapPin size={16} className="text-cyan-400" />
                        {trip.hotel}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-xs text-slate-500">Booking ID</p>

                      <p className="mt-1 font-mono text-sm font-semibold text-cyan-300">
                        {trip.bookingId}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <div className="mb-2 flex items-center gap-2 text-slate-500">
                        <CalendarDays size={16} />
                        <span className="text-xs uppercase tracking-wider">
                          Check In
                        </span>
                      </div>

                      <p className="font-medium">{trip.checkIn}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <div className="mb-2 flex items-center gap-2 text-slate-500">
                        <Clock3 size={16} />
                        <span className="text-xs uppercase tracking-wider">
                          Check Out
                        </span>
                      </div>

                      <p className="font-medium">{trip.checkOut}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <div className="mb-2 flex items-center gap-2 text-slate-500">
                        <Users size={16} />
                        <span className="text-xs uppercase tracking-wider">
                          Guests
                        </span>
                      </div>

                      <p className="font-medium">{trip.guests} Guests</p>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Total trip cost</p>

                      <p className="mt-1 text-2xl font-bold">${trip.total}</p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Link
                        to={`/my-trip/${trip.id}`}
                        className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10"
                      >
                        View Details
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>

                      <Link
                        to="/destination"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#08a9ed] px-5 py-3 text-sm font-semibold shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0799d7]"
                      >
                        Plan Another Trip
                        <Plane size={17} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-cyan-400/20 bg-linear-to-r from-cyan-500/10 to-blue-500/10 p-6 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">
                Ready for your next adventure?
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Discover new destinations and start planning your next trip.
              </p>
            </div>

            <Link
              to="/destination"
              className="group inline-flex w-fit items-center gap-2 rounded-xl bg-[#08a9ed] px-5 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-[#0799d7]"
            >
              Explore Now
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyTrip;
