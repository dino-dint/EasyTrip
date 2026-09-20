import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="bg-linear-to-b from-slate-100 to-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* Left */}
        <div>
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            SEND US A MESSAGE
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            We'd Love to Hear From You
          </h2>

          <p className="mt-6 text-slate-600">
            Have questions about flights, hotels, tours, or transportation?
            Complete the form and our EasyTrip support team will get back to you.
          </p>

          <img
            src="contact/office.jpg"
            alt="EasyTrip Office"
            className="mt-10 rounded-3xl shadow-xl"
          />
        </div>

        {/* Form */}
        <div className="rounded-4xl border border-white/40 bg-white/60 p-8 shadow-2xl backdrop-blur-xl">
          <form className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                placeholder="First Name"
                className="rounded-2xl border border-slate-200 bg-white/70 p-4 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                placeholder="Last Name"
                className="rounded-2xl border border-slate-200 bg-white/70 p-4 outline-none focus:border-blue-500"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-2xl border border-slate-200 bg-white/70 p-4 outline-none focus:border-blue-500"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-2xl border border-slate-200 bg-white/70 p-4 outline-none focus:border-blue-500"
            />

            <select className="w-full rounded-2xl border border-slate-200 bg-white/70 p-4 outline-none focus:border-blue-500">
              <option>Choose a Topic</option>
              <option>Hotel Booking</option>
              <option>Flight Booking</option>
              <option>Tours & Tickets</option>
              <option>Transportation</option>
              <option>Payment Issue</option>
            </select>

            <textarea
              rows="6"
              placeholder="Write your message..."
              className="w-full rounded-2xl border border-slate-200 bg-white/70 p-4 outline-none focus:border-blue-500"
            />

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-medium text-white transition hover:bg-blue-700">
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}