import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BedDouble,
  Check,
  CheckCircle2,
  Coffee,
  CreditCard,
  Dumbbell,
  Landmark,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
  UtensilsCrossed,
  Wallet,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import { fallbackImg, HOTELS } from "../../data/hotels";
import HotelCard from "./HotelCard";

const amenityIcons = {
  "Free WiFi": Wifi,
  "Wifi": Wifi,
  "Infinity Pool": Waves,
  "Spa & Sauna": Dumbbell,
  "Sky Bar": Coffee,
  "Fine Dining": UtensilsCrossed,
  "Fitness Centre": Dumbbell,
  "Outdoor Pool": Waves,
  "Private Beach": Waves,
  "Christie Spa": Dumbbell,
};

const paymentMethods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "aba", label: "ABA Pay", icon: Smartphone },
  { id: "acleda", label: "ACLEDA", icon: Landmark },
  { id: "paypal", label: "PayPal", icon: Wallet },
  { id: "cash", label: "Pay at Property", icon: CheckCircle2 },
];

const defaultRoomIcons = { bed1: "1 Bed", bed2: "2 Beds", bed3: "3 Beds" };

function HotelDetails() {
  const { id } = useParams();
  const hotel = HOTELS.find((h) => h.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!hotel) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-6 text-center text-slate-900">
        <h1 className="text-3xl font-bold">Hotel not found</h1>
        <p className="mt-3 text-slate-500">
          The stay you are looking for is unavailable.
        </p>
        <Link
          to="/accommodation"
          className="mt-8 rounded-full bg-sky-500 px-8 py-3 font-semibold text-white transition hover:bg-sky-400"
        >
          Browse hotels
        </Link>
      </div>
    );
  }

  return <HotelDetailsInner key={hotel.id} hotel={hotel} />;
}

function HotelDetailsInner({ hotel }) {
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [roomId, setRoomId] = useState(
    () => hotel.rooms[0]?.id ?? "bed1",
  );
  const [nights, setNights] = useState(1);
  const [payOpen, setPayOpen] = useState(false);

  const room = useMemo(
    () => hotel.rooms.find((r) => r.id === roomId) ?? hotel.rooms[0],
    [hotel, roomId],
  );

  const subtotal = room.price * nights;
  const saving = Math.max(0, (room.price + 20) * nights - subtotal);
  const similar = HOTELS.filter(
    (h) => h.id !== hotel.id && h.country === hotel.country,
  ).slice(0, 4);
  const fallback = [...HOTELS.filter((h) => h.id !== hotel.id)].slice(0, 4);

  const similarHotels = similar.length ? similar : fallback;

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900">
      {/* Hero banner */}
      <section className="relative flex h-[320px] items-end overflow-hidden bg-cover bg-center sm:h-[420px]">
        <img
          src={hotel.image}
          alt={hotel.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImg(hotel.id, 1600, 900);
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
            <span className="rounded-full bg-sky-500/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              {hotel.type}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
              <Star size={12} fill="currentColor" className="text-amber-400" />
              {hotel.rating} · {hotel.reviews.toLocaleString()} reviews
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {hotel.name}
          </h1>

          <p className="mt-3 flex items-center gap-2 text-white/85">
            <MapPin size={16} className="text-sky-400" />
            {hotel.location}
            <span className="mx-1 text-white/45">·</span>
            {"★".repeat(hotel.star)}
            <span className="text-white/45">({hotel.star} star)</span>
          </p>
        </div>
      </section>

      {/* Body */}
      <main className="relative mx-auto max-w-7xl overflow-x-clip px-4 py-12 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-start">
          {/* Left column */}
          <div className="space-y-12">
            {/* Gallery */}
            <section>
              <div className="relative overflow-hidden rounded-[28px] border border-slate-200 shadow-lg shadow-slate-200/60">
                <img
                  src={hotel.images[activeImg]}
                  alt={`${hotel.name} photo ${activeImg + 1}`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImg(`${hotel.id}-${activeImg}`, 1400, 900);
                  }}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="absolute bottom-4 right-4 rounded-full bg-black/55 px-4 py-1.5 text-xs text-white backdrop-blur-md">
                  {activeImg + 1} / {hotel.images.length}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-5 gap-3">
                {hotel.images.map((imgSrc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    aria-label={`Show photo ${i + 1}`}
                    className={`relative aspect-[4/3] overflow-hidden rounded-2xl border transition-all duration-300 ${
                      i === activeImg
                        ? "border-sky-500 ring-2 ring-sky-400/50"
                        : "border-slate-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImg(`${hotel.id}-thumb-${i}`, 400, 300);
                      }}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* About / summary */}
            <section>
              <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 sm:text-3xl">
                About this stay
                <span className="text-sky-500">.</span>
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                {hotel.summary}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { icon: BedDouble, label: `${hotel.rooms.length} room styles` },
                  { icon: Users, label: `Up to ${hotel.rooms[hotel.rooms.length - 1].guests} guests` },
                  { icon: ShieldCheck, label: "Free cancellation" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <Icon size={18} className="shrink-0 text-sky-500" />
                    <span className="text-sm text-slate-600">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">Amenities</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {hotel.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] ?? Check;
                  return (
                    <span
                      key={amenity}
                      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
                    >
                      <Icon size={15} className="text-sky-500" />
                      {amenity}
                    </span>
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
                    Starts from
                  </p>
                  <p className="mt-1 text-3xl font-bold text-slate-900">
                    ${room.price}
                    <span className="ml-1 text-sm font-normal text-slate-400">/ night</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400 line-through">${hotel.oldPrice}</p>
                  <p className="text-xs font-semibold text-emerald-600">
                    Save ${hotel.oldPrice - room.price}
                  </p>
                </div>
              </div>

              {/* Room selection */}
              <div className="mt-7">
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                  Choose your room
                </p>
                <div className="mt-3 space-y-3">
                  {hotel.rooms.map((r) => {
                    const active = roomId === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRoomId(r.id)}
                        className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
                          active
                            ? "border-sky-500 bg-sky-50 ring-1 ring-sky-400/40"
                            : "border-slate-200 bg-white hover:border-sky-300"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                              active
                                ? "border-sky-500/40 bg-sky-500/10 text-sky-600"
                                : "border-slate-200 bg-slate-100 text-slate-500"
                            }`}
                          >
                            <BedDouble size={17} />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-slate-900">
                              {defaultRoomIcons[r.id] ?? r.label}
                            </span>
                            <span className="block text-xs text-slate-500">
                              {r.guests} guests · {r.beds} bed{r.beds > 1 ? "s" : ""}
                            </span>
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">
                            ${r.price}
                          </span>
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                              active
                                ? "border-sky-500 bg-sky-500 text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {active && <Check size={12} />}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Nights */}
              <div className="mt-7">
                <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                  How many nights?
                </p>
                <div className="mt-3 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <button
                    type="button"
                    aria-label="Fewer nights"
                    onClick={() => setNights((n) => Math.max(1, n - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">{nights}</p>
                    <p className="text-xs text-slate-500">
                      {nights === 1 ? "night" : "nights"}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="More nights"
                    onClick={() => setNights((n) => Math.min(30, n + 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-sky-500 hover:border-sky-500 hover:text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-7 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>
                    {defaultRoomIcons[room.id] ?? room.label} × {nights}{" "}
                    {nights === 1 ? "night" : "nights"}
                  </span>
                  <span>${subtotal}</span>
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
                  <span>${subtotal}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPayOpen(true)}
                className="mt-6 w-full rounded-full bg-sky-500 py-4 text-base font-bold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-400/40"
              >
                Pay ${subtotal}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck size={14} className="text-sky-500" />
                Secure checkout · No prepayment hotels available
              </p>
            </div>
          </aside>
        </div>

        {/* Similar hotels */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            You may also like
            <span className="text-sky-500">.</span>
          </h2>
          <div className="no-scrollbar -mx-4 mt-7 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
            {similarHotels.map((h) => (
              <div key={h.id} className="w-[75vw] max-w-[320px] shrink-0 snap-start sm:w-[300px]">
                <HotelCard hotel={h} />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Payment modal */}
      {payOpen && (
        <PaymentModal
          hotel={hotel}
          room={room}
          nights={nights}
          subtotal={subtotal}
          onClose={() => setPayOpen(false)}
        />
      )}
    </div>
  );
}

/* ---------- Payment modal ---------- */

const methodFields = {
  card: [
    { key: "holder", label: "Cardholder name", type: "text", placeholder: "John Smith" },
    { key: "number", label: "Card number", type: "text", placeholder: "1234 5678 9012 3456" },
    { key: "expiry", label: "Expiry date", type: "text", placeholder: "MM/YY" },
    { key: "cvv", label: "CVV", type: "password", placeholder: "123" },
  ],
  aba: [{ key: "phone", label: "ABA account phone number", type: "tel", placeholder: "+855 12 345 678" }],
  acleda: [{ key: "phone", label: "ACLEDA account phone number", type: "tel", placeholder: "+855 12 345 678" }],
  paypal: [{ key: "email", label: "PayPal email", type: "email", placeholder: "you@email.com" }],
  cash: [],
};

function PaymentModal({ hotel, room, nights, subtotal, onClose }) {
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
    const requiredValues = fields.map((f) => values[f.key]?.trim());
    if (requiredValues.some((v) => !v)) return;
    setDone(true);
  };

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
              Booking confirmed!
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
              Your stay at{" "}
              <span className="font-semibold text-sky-600">{hotel.name}</span> is
              all set. A confirmation has been sent to your email.
            </p>

            <div className="mt-6 w-full space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Booking ref</span>
                <span className="font-bold text-slate-900">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Room</span>
                <span className="text-slate-900">{room.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nights</span>
                <span className="text-slate-900">{nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total paid</span>
                <span className="font-bold text-sky-600">${subtotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-sky-500 py-3.5 font-semibold text-white transition hover:bg-sky-400"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-slate-900">Payment method</h3>
            <p className="mt-1 text-sm text-slate-500">
              {hotel.name} · {room.label} · {nights} {nights === 1 ? "night" : "nights"}
            </p>

            {/* Method picker */}
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
                  <span className="text-sm font-medium text-slate-800">{label}</span>
                </button>
              ))}
            </div>

            {/* Method form */}
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
                  No prepayment needed. You can pay directly at the property in
                  cash or choose another method at check-in.
                </p>
              )}

              <div className="mt-6 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>
                    {room.label} × {nights} {nights === 1 ? "night" : "nights"}
                  </span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>${subtotal}</span>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-sky-500 py-4 text-base font-bold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
              >
                Confirm & pay ${subtotal}
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

export default HotelDetails;