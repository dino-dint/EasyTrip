import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BadgePercent,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Gift,
  Headphones,
  Luggage,
  Plane,
  RefreshCcw,
  SlidersHorizontal,
  Star,
  Wifi,
  X,
} from "lucide-react";
import FlightSearch from "./FlightSearch";
import {
  AIRLINES,
  AIRPORTS,
  FLIGHTS,
  ROUTES,
  addDays,
  airlineById,
  airportByCode,
  fmtDay,
  timeToMin,
  today,
} from "../../data/flight";

const FEATURES = [
  {
    icon: BadgePercent,
    title: "Best price guaranteed",
    desc: "We scan 100+ airlines to bring you the lowest fares on every route.",
  },
  {
    icon: RefreshCcw,
    title: "Flexible booking",
    desc: "Change flights and rebook with free cancellation on most fares.",
  },
  {
    icon: Headphones,
    title: "24/7 real support",
    desc: "Day or night, our travel experts are one tap away.",
  },
  {
    icon: Gift,
    title: "Trips reward you",
    desc: "Earn EasyTrip points on every ticket and unlock member discounts.",
  },
];

const SORTS = [
  { id: "recommended", label: "Recommended" },
  { id: "cheapest", label: "Cheapest" },
  { id: "fastest", label: "Fastest" },
  { id: "earliest", label: "Earliest departure" },
];

const STOP_OPTIONS = [
  { id: "direct", label: "Direct" },
  { id: "1stop", label: "1 stop" },
];

const TIME_BANDS = [
  { id: "morning", label: "Morning", min: 300, max: 720 },
  { id: "afternoon", label: "Afternoon", min: 720, max: 1080 },
  { id: "evening", label: "Evening", min: 1080, max: 1320 },
  { id: "night", label: "Night", min: 1320, max: 300 },
];

const PRICE_TIERS = [
  { id: "any", label: "Any price" },
  { id: "low", label: "Under $200" },
  { id: "mid", label: "$200 – $500" },
  { id: "high", label: "Over $500" },
];

const matchesBand = (minutes, min, max) =>
  min <= max ? minutes >= min && minutes < max : minutes >= min || minutes < max;

const toggleItem = (list, id) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

function Flights() {
  const [fromCode, setFromCode] = useState("PNH");
  const [toCode, setToCode] = useState("HKG");
  const [departDate, setDepartDate] = useState(addDays(today, 4));
  const [returnDate, setReturnDate] = useState(addDays(today, 9));
  const [cabin, setCabin] = useState("Economy");
  const [adults, setAdults] = useState(1);

  const [calState, setCalState] = useState(null); // null | "search" | route
  const [airlineId, setAirlineId] = useState("cathay-pacific");
  const [moreOpen, setMoreOpen] = useState(false);

  const [sort, setSort] = useState("recommended");
  const [stopsFilter, setStopsFilter] = useState([]);
  const [bandsFilter, setBandsFilter] = useState([]);
  const [priceTier, setPriceTier] = useState("any");

  const resultsRef = useRef(null);

  const from = airportByCode(fromCode) ?? AIRPORTS[0];
  const to = airportByCode(toCode) ?? AIRPORTS[1];
  const airline = airlineById(airlineId) ?? AIRLINES[0];
  const routeKey = `${fromCode}-${toCode}`;

  const scrollToResults = () =>
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const handleAirport = (side, code) => {
    if (side === "from") setFromCode(code);
    else setToCode(code);
  };

  const openRouteCalendar = (route) => {
    setFromCode(route.fromCode);
    setToCode(route.toCode);
    setDepartDate(route.depart);
    setReturnDate(route.return);
    setCalState(route);
  };

  const applyDates = (dep, ret, shouldScroll) => {
    setDepartDate(dep);
    setReturnDate(ret);
    setCalState(null);
    if (shouldScroll) scrollToResults();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    scrollToResults();
  };

  const results = useMemo(() => {
    let list = FLIGHTS.filter((x) => x.route === routeKey);

    if (stopsFilter.length) {
      list = list.filter(
        (x) =>
          (stopsFilter.includes("direct") && x.stops === 0) ||
          (stopsFilter.includes("1stop") && x.stops === 1),
      );
    }

    if (bandsFilter.length) {
      list = list.filter((x) =>
        bandsFilter.some((id) => {
          const band = TIME_BANDS.find((b) => b.id === id);
          return band && matchesBand(timeToMin(x.departTime), band.min, band.max);
        }),
      );
    }

    if (priceTier !== "any") {
      list = list.filter((x) =>
        priceTier === "low"
          ? x.price < 200
          : priceTier === "mid"
            ? x.price >= 200 && x.price <= 500
            : x.price > 500,
      );
    }

    const sorted = [...list];
    if (sort === "cheapest") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "fastest") sorted.sort((a, b) => a.durationMin - b.durationMin);
    else if (sort === "earliest")
      sorted.sort((a, b) => timeToMin(a.departTime) - timeToMin(b.departTime));
    return sorted;
  }, [routeKey, sort, stopsFilter, bandsFilter, priceTier]);

  const hasActiveFilter =
    stopsFilter.length > 0 || bandsFilter.length > 0 || priceTier !== "any";

  const resetFilters = () => {
    setStopsFilter([]);
    setBandsFilter([]);
    setPriceTier("any");
    setSort("recommended");
  };

  const routes = ROUTES.filter((r) => r.airlineId === airlineId);

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="relative flex min-h-[94vh] items-center justify-center overflow-hidden bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-slate-50" />

        <div className="relative mx-auto flex w-full max-w-[90rem] flex-col justify-center px-6 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-400/20 px-4 py-2 text-sm font-medium tracking-wide text-sky-100 backdrop-blur-md">
              <Plane size={16} />
              Flights & Airlines
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Fly anywhere,
              <span className="block bg-gradient-to-r from-sky-200 via-sky-300 to-blue-200 bg-clip-text text-transparent">
                effortlessly.
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
              Compare fares from 100+ airlines, unlock exclusive deals and book
              your next adventure in just a few taps.
            </p>
          </div>

          <div className="mt-10">
            <FlightSearch
              from={from}
              to={to}
              departDate={departDate}
              returnDate={returnDate}
              cabin={cabin}
              adults={adults}
              onSwap={handleSwap}
              onSelectAirport={handleAirport}
              onSelectCabin={setCabin}
              onSelectAdults={setAdults}
              onOpenCalendar={() => setCalState("search")}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <main className="relative mx-auto w-full max-w-[90rem] overflow-x-clip px-4 py-14 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-32 top-[1200px] h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

        {/* Features */}
        <section id="features" className="relative scroll-mt-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Why book flights with EasyTrip
              <span className="text-sky-500">.</span>
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Everything you need for a smooth journey — all in one place.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1   hover:shadow-[0_10px_25px_rgba(0,0,0,0.20)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border text-sky-600 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular airline routes */}
        <section className="relative mt-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AirlineMark airline={airline} size={52} />
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Now featuring
                </p>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {airline.name}
                  <span className="text-sky-500">.</span>
                </h2>
              </div>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((o) => !o)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-400 hover:text-sky-600"
              >
                More
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>

              {moreOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20 cursor-default"
                    onClick={() => setMoreOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-30 mt-3 w-[22rem] rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
                    <div className="flex items-center justify-between px-1">
                      <div>
                        <p className="text-base font-bold text-slate-900">
                          More airlines
                        </p>
                        <p className="text-xs text-slate-400">
                          Categories & partner carriers
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Close airlines menu"
                        onClick={() => setMoreOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="no-scrollbar mt-3 max-h-80 space-y-1.5 overflow-y-auto">
                      {AIRLINES.map((a) => {
                        const active = a.id === airlineId;
                        return (
                          <button
                            key={a.id}
                            type="button"
                            onClick={() => {
                              setAirlineId(a.id);
                              setMoreOpen(false);
                            }}
                            className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all duration-300 ${
                              active
                                ? "border-sky-500 bg-sky-50 ring-1 ring-sky-400/40"
                                : "border-transparent hover:border-sky-200 hover:bg-slate-50"
                            }`}
                          >
                            <AirlineMark airline={a} size={38} />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-slate-900">
                                {a.name}
                              </span>
                              <span className="block truncate text-xs text-slate-400">
                                {a.base} · IATA {a.iata}
                              </span>
                            </span>
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                                active
                                  ? "border-sky-500 bg-sky-500 text-white"
                                  : "border-slate-300 text-transparent"
                              }`}
                            >
                              <Check size={12} />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Popular {airline.name} Flight Routes
              <span className="text-sky-500">.</span>
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Whether you&rsquo;re planning a romantic getaway, a family
              vacation, or a solo adventure, browse and book your flight
              tickets with {airline.name} and explore the world&rsquo;s most
              sought-after locations today.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  airline={airline}
                  onClick={() => openRouteCalendar(route)}
                />
              ))}

              {routes.length === 0 && (
                <p className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white py-16 text-center text-sm text-slate-500">
                  More flight routes with {airline.name} are coming soon...
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Search results */}
        <section
          id="results"
          ref={resultsRef}
          className="relative mt-20 scroll-mt-28"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Flight Search Results
                <span className="text-sky-500">.</span>
              </h2>

              <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
                <span>
                  {from.city} ({from.code})
                </span>
                <span className="flex items-center gap-1 text-sky-500">
                  <Plane size={15} className="rotate-90" />
                </span>
                <span>
                  {to.city} ({to.code})
                </span>
                <span className="mx-1 text-slate-300">·</span>
                <span className="font-semibold text-slate-900">
                  {results.length}
                </span>
                <span>
                  flight{results.length === 1 ? "" : "s"} ·{" "}
                  {cabin} · {adults} adult{adults > 1 ? "s" : ""} (
                  {fmtDay(departDate)} → {fmtDay(returnDate)})
                </span>
              </p>
            </div>

            <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <SlidersHorizontal size={15} className="text-sky-500" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="cursor-pointer bg-transparent text-sm text-slate-700 outline-none [&>option]:text-slate-900"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Filters */}
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <FilterGroup
                label="Stops"
                options={STOP_OPTIONS}
                selected={stopsFilter}
                onToggle={(id) => setStopsFilter((l) => toggleItem(l, id))}
              />
              <FilterGroup
                label="Departure"
                options={TIME_BANDS.map(({ id, label }) => ({ id, label }))}
                selected={bandsFilter}
                onToggle={(id) => setBandsFilter((l) => toggleItem(l, id))}
              />
              <FilterGroup
                label="Price"
                options={PRICE_TIERS}
                selected={priceTier === "any" ? [] : [priceTier]}
                onToggle={(id) =>
                  setPriceTier((prev) => (prev === id ? "any" : id))
                }
              />
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-2 shrink-0 self-start rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-500 transition hover:border-sky-400 hover:text-sky-600 lg:ml-auto lg:mt-0"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Results list */}
          <div className="mt-6 space-y-4">
            {results.length ? (
              results.map((flight) => (
                <FlightResultRow key={flight.id} flight={flight} />
              ))
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/10 text-sky-500">
                  <Plane size={28} />
                </div>
                <p className="mt-5 text-lg font-semibold text-slate-900">
                  No flights found for this route
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try adjusting your filters or search for another destination.
                </p>
                {hasActiveFilter && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-6 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Big calendar */}
      {calState !== null && (
        <CalendarModal
          start={departDate}
          end={returnDate}
          onApply={(dep, ret) => applyDates(dep, ret, calState !== "search")}
          onClose={() => setCalState(null)}
        />
      )}
    </div>
  );
}

/* ---------- Airline mark ---------- */

function AirlineMark({ airline, size = 40 }) {
  return (
    <span
      style={{ backgroundColor: airline.color }}
      className="flex shrink-0 items-center justify-center rounded-full text-white shadow-sm"
      aria-label={airline.name}
    >
      <span
        style={{ fontSize: size * 0.34, lineHeight: `${size}px` }}
        className="font-extrabold tracking-wide"
      >
        {airline.iata}
      </span>
    </span>
  );
}

/* ---------- Route card ---------- */

function RouteCard({ route, airline, onClick }) {
  const fromA = airportByCode(route.fromCode) ?? AIRPORTS[0];
  const toA = airportByCode(route.toCode) ?? AIRPORTS[1];

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-md shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_22px_50px_rgba(56,189,248,0.22)]"
    >
      {/* Gradient header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${airline.color}, rgba(0,0,0,0.45))`,
        }}
        className="relative h-28 shrink-0 overflow-hidden px-5 py-4"
      >
        <Plane
          size={130}
          className="absolute -bottom-9 -right-7 -rotate-12 text-white/10"
        />
        <span className="relative rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md">
          {airline.name}
        </span>

        <div className="relative mt-3 flex items-center justify-between">
          <div className="text-white">
            <p className="text-xl font-bold tracking-wider">{route.fromCode}</p>
            <p className="text-[11px] text-white/75">{fromA.city}</p>
          </div>
          <div className="flex flex-1 items-center px-2">
            <span className="h-px flex-1 bg-white/40" />
            <Plane
              size={16}
              className="mx-2 shrink-0 rotate-90 text-white drop-shadow"
            />
            <span className="h-px flex-1 bg-white/40" />
          </div>
          <div className="text-right text-white">
            <p className="text-xl font-bold tracking-wider">{route.toCode}</p>
            <p className="text-[11px] text-white/75">{toA.city}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 text-lg font-bold text-slate-900">
          {fromA.city}
          <Plane
            size={18}
            className="-rotate-12 shrink-0 text-sky-500 transition-transform duration-300 group-hover:translate-x-1"
          />
          {toA.city}
        </p>

        <div className="mt-2.5 flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={14} className="shrink-0 text-sky-500" />
          {fmtDay(route.depart)} – {fmtDay(route.return)}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {route.cabin}
          </span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
            {route.stopsLabel}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
          <span className="text-xs text-slate-400">From</span>
          <span className="text-xl font-bold text-slate-900">
            US${route.price}
          </span>
        </div>

        <span className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-sky-500/30 bg-sky-50 py-2.5 text-sm font-semibold text-sky-600 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white">
          <CalendarDays size={15} />
          Choose dates
        </span>
      </div>
    </button>
  );
}

/* ---------- Result row ---------- */

export function FlightResultRow({ flight }) {
  const airline = airlineById(flight.airlineId);
  const fromA = airportByCode(flight.fromCode) ?? AIRPORTS[0];
  const toA = airportByCode(flight.toCode) ?? AIRPORTS[1];
  const stopColor = flight.stops === 0 ? "bg-emerald-500" : "bg-amber-500";

  return (
    <Link
      to={`/flight/${flight.id}`}
      className="group block rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.20)] sm:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr_auto] lg:items-center">
        {/* Schedule */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {airline && <AirlineMark airline={airline} size={30} />}
            <span className="text-sm font-semibold text-slate-900">
              {flight.airline}
            </span>
            <span className="text-xs text-slate-400">· {flight.flightNo}</span>
            <span
              className={`ml-auto rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white ${stopColor}`}
            >
              {flight.stopsLabel}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {flight.departTime}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {fromA.city} ({flight.fromCode})
              </p>
            </div>

            <div className="flex flex-col items-center px-2">
              <span
                className={`text-xs font-medium ${
                  flight.stops === 0 ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {flight.duration}
              </span>
              <div className="mt-1 flex items-center">
                <span className="h-px w-10 border-t border-dashed border-slate-300 sm:w-16" />
                <Plane
                  size={16}
                  className="mx-1 shrink-0 rotate-90 text-sky-500 transition-transform duration-300 group-hover:translate-x-1"
                />
                <span className="h-px w-10 border-t border-dashed border-slate-300 sm:w-16" />
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900">
                {flight.arriveTime}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {toA.city} ({flight.toCode})
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-sky-500" />
              {fmtDay(flight.departDate)} → {fmtDay(flight.returnDate)}
            </span>
            <span>· {flight.cabin}</span>
            <span>· {flight.aircraft}</span>
            <span className="flex items-center gap-1.5">
              <Luggage size={13} className="text-sky-500" />
              {flight.baggage}
            </span>
            {flight.refundable && (
              <span className="flex items-center gap-1.5 text-emerald-600">
                <RefreshCcw size={13} />
                Free cancellation
              </span>
            )}
          </div>
        </div>

        {/* Perks */}
        <div className="hidden flex-col gap-2 border-l border-slate-100 pl-6 lg:flex">
          {flight.amenities.slice(0, 3).map((a) => (
            <span
              key={a}
              className="flex items-center gap-2 text-xs text-slate-600"
            >
              <Check size={14} className="shrink-0 text-sky-500" />
              {a}
            </span>
          ))}
          <span className="flex items-center gap-2 text-xs text-slate-600">
            <Wifi size={14} className="shrink-0 text-sky-500" />
            {flight.wifi ? "In-flight WiFi" : "No WiFi available"}
          </span>
          <span className="flex items-center gap-2 text-xs text-slate-600">
            <Star size={14} className="shrink-0 text-amber-400" fill="currentColor" />
            {flight.rating} · {flight.reviews.toLocaleString()} reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 lg:flex-col lg:items-end lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="text-right">
            <div className="text-xs text-slate-400">
              was{" "}
              <span className="line-through">${flight.oldPrice}</span>
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900">
              ${flight.price}
            </div>
            <div className="text-[11px] text-slate-400">
              per person · taxes included
            </div>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 group-hover:bg-sky-400 group-hover:shadow-sky-400/40">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------- Filter group ---------- */

function FilterGroup({ label, options, selected, onToggle }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </span>
      {options.map((opt) => {
        const active = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onToggle(opt.id)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
              active
                ? "border-sky-500 bg-sky-500 text-white shadow-md shadow-sky-500/30"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-sky-300 hover:text-sky-600"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Big calendar ---------- */

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function CalendarModal({ start: initialStart, end: initialEnd, onApply, onClose }) {
  const minDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const [viewMonth, setViewMonth] = useState(
    () => new Date(initialStart.getFullYear(), initialStart.getMonth(), 1),
  );
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);

  const pick = (d) => {
    if (d < minDay) return;
    if (!start || (start && end)) {
      setStart(d);
      setEnd(null);
      return;
    }
    if (d < start) {
      setStart(d);
      return;
    }
    setEnd(d);
  };

  const presets = [
    { label: "This weekend", dep: addDays(minDay, 2), ret: addDays(minDay, 4) },
    { label: "Next weekend", dep: addDays(minDay, 7), ret: addDays(minDay, 9) },
    { label: "3-day trip", dep: addDays(minDay, 2), ret: addDays(minDay, 5) },
    { label: "1 week", dep: addDays(minDay, 3), ret: addDays(minDay, 10) },
  ];

  const months = [0, 1].map((i) =>
    new Date(viewMonth.getFullYear(), viewMonth.getMonth() + i, 1),
  );

  const ready = start && end;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Choose your dates</h3>
            <p className="mt-0.5 text-xs text-slate-400">
              Pick a departure and return day for your trip
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Before"
              onClick={() =>
                setViewMonth(
                  (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1),
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-sky-500 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="After"
              onClick={() =>
                setViewMonth(
                  (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1),
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-sky-500 hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              aria-label="Close calendar"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Quick presets */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-slate-100 px-6 py-3">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setStart(p.dep);
                setEnd(p.ret);
              }}
              className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-medium text-slate-600 transition hover:border-sky-300 hover:text-sky-600"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Months */}
        <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-5">
          <div className="grid gap-8 sm:grid-cols-2">
            {months.map((month) => (
              <MonthPanel
                key={month.toISOString().slice(0, 7)}
                month={month}
                start={start}
                end={end}
                minDay={minDay}
                onPick={pick}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <div className="text-sm">
            {ready ? (
              <p className="text-slate-600">
                <span className="font-semibold text-slate-900">{fmtDay(start)}</span>
                {" → "}
                <span className="font-semibold text-slate-900">{fmtDay(end)}</span>
                {"  ·  "}
                {Math.round((end - start) / 86400000)} nights
              </p>
            ) : (
              <p className="text-slate-400">
                Select your departure and return dates
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setStart(null);
                setEnd(null);
              }}
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:border-sky-400 hover:text-sky-600"
            >
              Clear
            </button>
            <button
              type="button"
              disabled={!ready}
              onClick={() => ready && onApply(start, end)}
              className="rounded-full bg-sky-500 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Apply dates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthPanel({ month, start, end, minDay, onPick }) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const first = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = [];

  for (let i = 0; i < first.getDay(); i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(year, monthIndex, d));

  const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();

  return (
    <div>
      <p className="text-center text-sm font-bold text-slate-900">
        {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} className="text-[11px] font-semibold text-slate-400">
            {w}
          </span>
        ))}

        {cells.map((d, i) => {
          if (!d) return <span key={`empty-${i}`} />;

          const disabled = d < minDay;
          const isStart = sameDay(d, start);
          const isEnd = sameDay(d, end);
          const inRange =
            start && end && d > start && d < end &&
            !sameDay(d, start) &&
            !sameDay(d, end);
          const isToday = sameDay(d, new Date());

          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onPick(d)}
              className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all duration-200 sm:h-10 sm:w-10 ${
                disabled
                  ? "cursor-not-allowed text-slate-300"
                  : isStart || isEnd
                    ? "bg-sky-500 font-bold text-white shadow-md shadow-sky-500/40"
                    : inRange
                      ? "bg-sky-100 font-semibold text-sky-700 hover:bg-sky-200"
                      : "text-slate-700 hover:bg-slate-100"
              } ${isToday && !isStart && !isEnd ? "ring-1 ring-sky-400" : ""}`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Flights;