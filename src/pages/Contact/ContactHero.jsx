import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/contact/contact.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-blue-900/50 to-slate-950" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center text-white">
          <span className="rounded-full border border-blue-300/30 bg-white/10 px-5 py-2 backdrop-blur-md">
             We're Here to Help You Travel Better
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
            Contact{" "}
            <span className="bg-linear-to-r from-blue-300 to-sky-500 bg-clip-text text-transparent">
              EasyTrip
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-slate-200 md:text-lg">
            Whether you're planning your next vacation, managing an existing
            booking, or simply have a question, our travel experts are available
            24/7 to assist you.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-700">
              Contact Support
              <ArrowRight size={18} />
            </button>

            <button className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md transition hover:bg-white/20">
              <MessageCircle size={18} />
              Live Chat
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-5 text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-300" />
              Secure Assistance
            </div>

            <div className="flex items-center gap-2">
              <MessageCircle size={18} className="text-blue-300" />
              24/7 Customer Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}