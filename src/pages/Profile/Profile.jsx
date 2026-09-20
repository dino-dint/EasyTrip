import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Plane,
  Heart,
  Settings,
  Edit3,
  ArrowLeft,
} from "lucide-react";

import { profileData } from "../../data/wishlist";

const Profile = () => {
  return (
    <main className="min-h-screen bg-[#071225] text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-10 top-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              <User size={16} />
              Account
            </div>

            <h1 className="text-3xl font-bold sm:text-4xl">My Profile</h1>

            <p className="mt-2 text-slate-400">
              Manage your EasyTrip account and travel information.
            </p>
          </div>

          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-300 backdrop-blur-md transition hover:bg-white/10 sm:flex"
          >
            <Settings size={17} />
            Settings
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile card */}
          <div className="rounded-3xl border border-white/10 bg-white/5.5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl lg:col-span-1">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-4xl font-bold shadow-xl shadow-cyan-500/20">
                  {profileData.firstName.charAt(0)}
                </div>

                <button
                  type="button"
                  aria-label="Edit profile picture"
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#071225] bg-[#08a9ed] transition hover:scale-110"
                >
                  <Edit3 size={15} />
                </button>
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {profileData.firstName} {profileData.lastName}
              </h2>

              <p className="mt-1 text-sm text-slate-400">EasyTrip Member</p>

              <div className="mt-4 flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                <CalendarDays size={15} />
                Member since {profileData.memberSince}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <Plane className="mx-auto mb-2 text-cyan-400" size={21} />
                <p className="text-xl font-bold">
                  {profileData.tripsCompleted}
                </p>
                <p className="text-xs text-slate-500">Trips</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <Heart className="mx-auto mb-2 text-cyan-400" size={21} />
                <p className="text-xl font-bold">{profileData.wishlistCount}</p>
                <p className="text-xs text-slate-500">Wishlist</p>
              </div>
            </div>
          </div>

          {/* Personal information */}
          <div className="rounded-3xl border border-white/10 bg-white/5.5 p-6 shadow-xl shadow-black/20 backdrop-blur-xl lg:col-span-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <h2 className="text-xl font-bold">Personal Information</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your account details
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
              >
                <Edit3 size={16} />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* First name */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-400/20">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <User size={17} />
                  <span className="text-xs uppercase tracking-wider">
                    First Name
                  </span>
                </div>

                <p className="font-medium">{profileData.firstName}</p>
              </div>

              {/* Last name */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-400/20">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <User size={17} />
                  <span className="text-xs uppercase tracking-wider">
                    Last Name
                  </span>
                </div>

                <p className="font-medium">{profileData.lastName}</p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-400/20">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <Mail size={17} />
                  <span className="text-xs uppercase tracking-wider">
                    Email
                  </span>
                </div>

                <p className="break-all font-medium">{profileData.email}</p>
              </div>

              {/* Phone */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-400/20">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <Phone size={17} />
                  <span className="text-xs uppercase tracking-wider">
                    Phone
                  </span>
                </div>

                <p className="font-medium">{profileData.phone}</p>
              </div>

              {/* Country */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-400/20">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <MapPin size={17} />
                  <span className="text-xs uppercase tracking-wider">
                    Country
                  </span>
                </div>

                <p className="font-medium">{profileData.country}</p>
              </div>

              {/* Member */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-400/20">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <CalendarDays size={17} />
                  <span className="text-xs uppercase tracking-wider">
                    Member Since
                  </span>
                </div>

                <p className="font-medium">{profileData.memberSince}</p>
              </div>
            </div>

            {/* Bottom links */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                to="/my-trip"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/5"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-400/10 p-2.5 text-cyan-400">
                    <Plane size={19} />
                  </div>

                  <span className="font-medium">View My Trips</span>
                </div>

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/wishlist"
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/5"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-400/10 p-2.5 text-cyan-400">
                    <Heart size={19} />
                  </div>

                  <span className="font-medium">View Wishlist</span>
                </div>

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
