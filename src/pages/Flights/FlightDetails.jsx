import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Armchair,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Luggage,
  Minus,
  Plane,
  Plus,
  RefreshCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Wifi,
  X,
} from "lucide-react";
import {
  FLIGHTS,
  airlineById,
  airportByCode,
  flightById,
  fmtDay,
  fmtFullDay,
} from "../../data/flight";
import { FlightResultRow } from "./Flight";

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "aba", label: "ABA Pay", icon: Smartphone },
  { id: "acleda", label: "ACLEDA", icon: Smartphone },
  { id: "cash", label: "Pay at Counter", icon: CheckCircle2 },
];

const methodFields = {
  card: [
    { key: "holder", label: "Cardholder name", type: "text", placeholder: "John Smith" },
    { key: "number", label: "Card number", type: "text", placeholder: "1234 5678 9012 3456" },
    { key: "expiry", label: "Expiry date", type: "text", placeholder: "MM/YY" },
    { key: "cvv", label: "CVV", type: "password", placeholder: "123" },
  ],
  aba: [{ key: "phone", label: "ABA account phone number", type: "tel", placeholder: "+855 12 345 678" }],
  acleda: [{ key: "phone", label: "ACLEDA account phone number", type: "tel", placeholder: "+855 12 345 678" }],
  cash: [],
};

function FlightDetails() {
  const { id } = useParams();
  const flight = flightById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!flight) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-6 text-center text-slate-900">
        <h1 className="text-3xl font-bold">Flight not found</h1>
        <p className="mt-3 text-slate-500">
          The flight you are looking for is unavailable.
        </p>
        <Link
          to="/flight"
          className="mt-8 rounded-full bg-sky-500 px-8 py-3 font-semibold text-white transition hover:bg-sky-400"
        >
          Browse flights
        </Link>
      </div>
    );
  }

  return <FlightDetailsInner key={flight.id} flight={flight} />;
}

function FlightDetailsInner({ flight }) {
  const navigate = useNavigate();
  const [cabinId, setCabinId] = useState("economy");
  const [adults, setAdults] = useState(1);
  const [payOpen, setPayOpen] = useState(false);

  const airline = airlineById(flight.airlineId);
  const fromA = airportByCode(flight.fromCode);
  const toA = airportByCode(flight.toCode);
  const cabin = flight.cabins.find((c) => c.id === cabinId) ?? flight.cabins[0];

  const total = cabin.price * adults;
  const saving = Math.max(0, adults * (flight.oldPrice - flight.price));

  const similar = useMemo(
    () =>
      FLIGHTS.filter(
        (x) =>
          x.id !== flight.id &&
          (x.route === flight.route || x.airlineId === flight.airlineId),
      ).slice(0, 4),
    [flight],
  );

  const cabinIcons = { economy: Armchair, premium: Users, business: Sparkles };

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900">
      {/* Hero banner */}
      <section className="relative flex h-[340px] items-end overflow-hidden bg-cover bg-center sm:h-[420px]">
        <img
          src={flight.image}
          alt={`${flight.airline} flight`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://picsum.photos/seed/${flight.id}/1600/900`;
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-900/40 to-black/40" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-32 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-sky-500"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {airline && (
              <span
                style={{ backgroundColor: airline.color }}
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold text-white"
              >
                {airline.iata}
              </span>
            )}
            <span className="rounded-full bg-sky-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              {flight.airline} · {flight.flightNo}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-md ${
                flight.stops === 0 ? "bg-emerald-600/90" : "bg-amber-600/90"
              }`}
            >
              {flight.stopsLabel}
            </span>
          </div>

          <h1 className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {fromA.city} ({flight.fromCode})
            <Plane size={32} className="rotate-90 text-sky-400" />
            {toA.city} ({flight.toCode})
          </h1>

          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/85">
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-sky-400" />
              {fmtFullDay(flight.departDate)} → {fmtDay(flight.returnDate)}
            </span>
            <span className="flex items-center gap-1">
              <Star size={15} className="text-amber-400" fill="currentColor" />
              {flight.rating} · {flight.reviews.toLocaleString()} reviews
            </span>
          </p>
        </div>
      </section>

      {/* Body */}
      <main className="relative mx-auto max-w-7xl overflow-x-clip px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          {/* Left column */}
          <div className="space-y-12">
            {/* Flight overview */}
            <section>
              <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                Flight overview
                <span className="text-sky-500">.</span>
              </h2>

              <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div>
                    <p className="text-3xl font-bold text-slate-900 sm:text-4xl">
                      {flight.departTime}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {fromA.city} ({flight.fromCode})
                    </p>
                    <p className="text-xs text-slate-400">{fromA.country}</p>
                  </div>

                  <div className="flex flex-col items-center px-2">
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
                      {flight.duration}
                    </span>
                    <div className="mt-2 flex items-center">
                      <span className="h-px w-12 border-t border-dashed border-slate-300 sm:w-24" />
                      <Plane
                        size={18}
                        className="mx-2 rotate-90 text-sky-500"
                      />
                      <span className="h-px w-12 border-t border-dashed border-slate-300 sm:w-24" />
                    </div>
                    <span className="mt-2 text-[11px] uppercase tracking-widest text-slate-400">
                      {flight.aircraft}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold text-slate-900 sm:text-4xl">
                      {flight.arriveTime}
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {toA.city} ({flight.toCode})
                    </p>
                    <p className="text-xs text-slate-400">{toA.country}</p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-4">
                  <OverviewStat label="Stops" value={flight.stopsLabel} />
                  <OverviewStat label="Cabin" value={flight.cabin} />
                  <OverviewStat label="Baggage" value={flight.baggage} />
                  <OverviewStat label="Aircraft" value={flight.aircraft} />
                </div>
              </div>
            </section>

            {/* What's included */}
            <section>
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                What&rsquo;s included in this fare
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {flight.amenities.map((a) => (
                  <IncludedChip key={a} text={a} />
                ))}
                <IncludedChip text={flight.wifi ? "In-flight WiFi" : "No WiFi"} icon={Wifi} />
                <IncludedChip text={flight.refundable ? "Free cancellation" : "Non-refundable"} icon={RefreshCcw} />
                <IncludedChip text={`${flight.baggage}`} icon={Luggage} />
              </div>
            </section>

            {/* Cabin selection */}
            <section>
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Choose your cabin class
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {flight.cabins.map((c) => {
                  const Icon = cabinIcons[c.id] ?? Armchair;
                  const active = c.id === cabinId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCabinId(c.id)}
                      className={`group flex flex-col rounded-3xl border p-5 text-left transition-all duration-300 ${
                        active
                          ? "border-sky-500 bg-sky-50 ring-1 ring-sky-400/40"
                          : "border-slate-200 bg-white hover:border-sky-300"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${
                          active
                            ? "border-sky-500/40 bg-sky-500/10 text-sky-600"
                            : "border-slate-200 bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      <span className="mt-4 text-base font-bold text-slate-900">
                        {c.label}
                      </span>
                      <span className="mt-1 text-sm font-bold text-sky-600">
                        ${c.price}
                        <span className="font-normal text-slate-400">
                          {" "}
                          / person
                        </span>
                      </span>
                      <ul className="mt-3 space-y-1.5">
                        {c.perks.map((p) => (
                          <li
                            key={p}
                            className="flex items-center gap-2 text-xs text-slate-500"
                          >
                            <Check size={13} className="shrink-0 text-sky-500" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right column — booking card */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    {flight.airline} · {flight.flightNo}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-lg font-bold text-slate-900">
                    {fromA.city} ({flight.fromCode})
                    <ArrowRight size={16} className="text-sky-500" />
                    {toA.city} ({flight.toCode})
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400 line-through">
                    ${flight.oldPrice}
                  </p>
                  <p className="text-xs font-semibold text-emerald-600">
                    Save ${flight.oldPrice - flight.price}
                  </p>
                </div>
              </div>

              {/* Passengers */}
              <div className="mt-7">
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                  Travellers
                </p>
                <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <button
                    type="button"
                    aria-label="Fewer travellers"
                    onClick={() => setAdults((n) => Math.max(1, n - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">{adults}</p>
                    <p className="text-xs text-slate-500">
                      {adults === 1 ? "adult" : "adults"}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="More travellers"
                    onClick={() => setAdults((n) => Math.min(6, n + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Fare summary */}
              <div className="mt-7 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>
                    {cabin.label} × {adults} traveller{adults > 1 ? "s" : ""}
                  </span>
                  <span>${cabin.price * adults}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & fees</span>
                  <span className="text-emerald-600">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Instant discount</span>
                  <span className="text-emerald-600">-${saving}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPayOpen(true)}
                className="mt-6 w-full rounded-full bg-sky-500 py-4 text-base font-bold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-400/40"
              >
                Book ${total}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck size={14} className="text-sky-500" />
                Secure checkout · Price locked for 24 hours
              </p>
            </div>
          </aside>
        </div>

        {/* Similar flights */}
        {similar.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Similar flights
              <span className="text-sky-500">.</span>
            </h2>
            <div className="mt-7 space-y-4">
              {similar.map((x) => (
                <FlightResultRow key={x.id} flight={x} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Payment modal */}
      {payOpen && (
        <BookingPayment
          flight={flight}
          airline={airline}
          cabin={cabin}
          adults={adults}
          total={total}
          onClose={() => setPayOpen(false)}
        />
      )}
    </div>
  );
}

function OverviewStat({ label, value }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function IncludedChip({ text, icon: Icon }) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
      {Icon ? (
        <Icon size={15} className="text-sky-500" />
      ) : (
        <Check size={15} className="text-sky-500" />
      )}
      {text}
    </span>
  );
}

/* ---------- Payment modal ---------- */

function BookingPayment({ flight, cabin, adults, total, onClose }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [values, setValues] = useState({});
  const [done, setDone] = useState(false);
  const [bookingRef] = useState(
    () => `ET-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
  );

  const setField = (key, val) => setValues((v) => ({ ...v, [key]: val }));
  const fields = methodFields[method];

  const handleConfirm = (e) => {
    e.preventDefault();
    if (method === "cash") {
      setDone(true);
      return;
    }
    if (fields.some((f) => !values[f.key]?.trim())) return;
    setDone(true);
  };

  const toA = airportByCode(flight.toCode);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="no-scrollbar relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close payment"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={18} />
        </button>

        {done ? (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
              <CheckCircle2 size={40} />
            </span>
            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Flight booked!
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
              Your {flight.airline} flight to{" "}
              <span className="font-semibold text-sky-600">
                {toA.city} ({flight.toCode})
              </span>{" "}
              is confirmed. A confirmation has been sent to your email.
            </p>

            <div className="mt-6 w-full space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <Row label="Booking ref" value={bookingRef} bold />
              <Row label="Flight" value={`${flight.flightNo} · ${flight.airline}`} />
              <Row
                label="Route"
                value={`${flight.fromCode} → ${flight.toCode}`}
              />
              <Row label="Date" value={fmtDay(flight.departDate)} />
              <Row label="Cabin" value={cabin.label} />
              <Row label="Travellers" value={String(adults)} />
              <Row label="Total paid" value={`$${total}`} accent />
            </div>

            <button
              type="button"
              onClick={() => {
                setDone(false);
                onClose();
                navigate("/flight");
              }}
              className="mt-6 w-full rounded-full bg-sky-500 py-3.5 font-semibold text-white transition hover:bg-sky-400"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-slate-900">Payment method</h3>
            <p className="mt-1 text-sm text-slate-500">
              {flight.airline} · {flight.fromCode} → {flight.toCode} ·{" "}
              {cabin.label}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {paymentMethods.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                    method === id
                      ? "border-sky-500 bg-sky-50 ring-1 ring-sky-400/40"
                      : "border-slate-200 bg-white hover:border-sky-300"
                  }`}
                >
                  <Icon
                    size={18}
                    className={method === id ? "text-sky-600" : "text-slate-400"}
                  />
                  <span className="text-sm font-medium text-slate-800">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            <form onSubmit={handleConfirm} className="mt-6">
              {fields.length > 0 && (
                <div className="space-y-4">
                  {fields.map((f) => (
                    <label key={f.key} className="block">
                      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-500">
                        {f.label}
                      </span>
                      <input
                        type={f.type}
                        required
                        placeholder={f.placeholder}
                        value={values[f.key] ?? ""}
                        onChange={(e) => setField(f.key, e.target.value)}
                        autoComplete="off"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-400/30"
                      />
                    </label>
                  ))}
                </div>
              )}

              {method === "cash" && (
                <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  No prepayment needed. You can pay directly at the airline
                  counter at the airport.
                </p>
              )}

              <div className="mt-6 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>
                    {cabin.label} × {adults} traveller{adults > 1 ? "s" : ""}
                  </span>
                  <span>${cabin.price * adults}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-sky-500 py-4 text-base font-bold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              >
                Confirm booking ${total}
              </button>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <ShieldCheck size={14} className="text-sky-500" />
                Payments are encrypted and securely processed by EasyTrip.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, bold, accent }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span
        className={
          accent ? "font-bold text-sky-600" : bold ? "font-bold text-slate-900" : "text-slate-900"
        }
      >
        {value}
      </span>
    </div>
  );
}

export default FlightDetails;