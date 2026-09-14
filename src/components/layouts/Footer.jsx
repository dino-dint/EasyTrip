import {
  ArrowRight,
  ShieldCheck,
  Plane,
  MapPinned,
  Phone,
  Mail,
  Heart,
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa6";

function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("EasyTrip Newsletter");
  };

  // Main Glass Card
  const glassCard =
    "rounded-[32px] border border-white/10 bg-white/6 backdrop-blur-3xl p-8 md:p-12 shadow-[0_0px_100px_rgba(0,0,0,0.7)]";

  // Glass Button
  const glassButton =
    "bg-white/15 backdrop-blur-xl border border-white/20 rounded-full hover:bg-blue-500/20 hover:border-blue-300/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300";

  // Newsletter Input
  const glassInput =
    "flex-1 rounded-full bg-white/8 border border-white/20 px-6 py-4 text-white placeholder:text-white-500 backdrop-blur-xl focus:border-slate-400 outline-none";

  return (
    <footer className="relative overflow-hidden bg-black text-white">

      {/* Background img */}
      <div className="absolute inset-0 pointer-events-none">
        <img src="/footer-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65">
          {/* blue atmospheric glow */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/30 via-slate-950/70 to-black/90">
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">

        {/*  Newsletter CTA */}
        <section className={`${glassCard} relative overflow-hidden p-8 md:p-12`}>

          <div className="absolute -top-10 right-0 h-52 w-52 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">

            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-400/20 px-4 py-2 text-sm tracking-wide text-sky-100">
                <Plane size={16} />
                EasyTrip Newsletter
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Your next unforgettable journey starts here.
              </h2>

              <p className="mt-5 max-w-xl text-lg text-blue-100 leading-8">
                Subscribe to EasyTrip and receive exclusive travel deals,
                destination guides, seasonal promotions, and personalized trip
                inspiration delivered directly to your inbox.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-blue-100">
                <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                   Flight Deals
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                  Hidden Destinations
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                   Member Discounts
                </span>
              </div>
            </div>

            {/* Right */}
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row">

                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className={`${glassInput} flex-1 px-6 py-4`}
                  />

                  <button
                    type="submit"
                    className={`${glassButton} flex items-center justify-center gap-3 px-7 py-4 font-medium`}
                  >
                    Subscribe

                    <ArrowRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-blue-100">
                  <ShieldCheck size={18} />
                  No spam. Travel inspiration only. Unsubscribe anytime.
                </div>

              </form>
            </div>

          </div>
        </section>

        {/* Footer Content */}

        <div className="mt-20 grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>

            <h2 className="text-4xl font-bold tracking-tight">
              EasyTrip
              <span className="text-sky-300">.</span>
            </h2>

            <p className="mt-6 max-w-sm text-blue-100 leading-8">
              Discover beautiful destinations, book memorable stays,
              and travel with confidence. EasyTrip helps you explore
              Cambodia and the world with ease.
            </p>

            <div className="mt-8 space-y-3 text-blue-100 text-sm">

              <div className="flex items-center gap-3">
                <MapPinned size={18} />
                Phnom Penh, Cambodia
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                teamdev@easytrip.com
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                +855 12 345 678
              </div>

            </div>

            {/* Socials */}

            <div className="mt-8 flex gap-4">

              {[FaInstagram, FaFacebookF, FaTiktok].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className={`${glassButton} flex h-12 w-12 items-center justify-center`}
                >
                  <Icon size={20} />
                </a>
              ))}

            </div>

          </div>

          <FooterColumn
            title="Explore"
            links={[
              "Destinations",
              "Hotels & Resorts",
              "Flights",
              "Travel Packages",
              "Popular Places",
            ]}
          />

          <FooterColumn
            title="Travel Guide"
            links={[
              "Travel Tips",
              "Visa Information",
              "Things To Do",
              "Best Time To Visit",
              "Safety Guide",
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              "About EasyTrip",
              "Contact Us",
              "Careers",
              "Partner With Us",
              "Blog",
            ]}
          />

          <FooterColumn
            title="Support"
            links={[
              "Help Center",
              "FAQs",
              "Privacy Policy",
              "Terms & Conditions",
              "Refund Policy",
            ]}
          />

        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-white/15 pt-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <p className="text-sm text-blue-100">
              © 2026 EasyTrip. 
              Crafted with love for travelers around the world.
            </p>

            <div className="flex flex-wrap items-center gap-3">

              {["Visa", "Mastercard", "PayPal", "ABA", "ACLEDA"].map((item) => (
                <div
                  key={item}
                  className={`${glassButton} px-4 py-2 text-sm font-medium`}
                >
                  {item}
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>

      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <ul className="mt-5 space-y-4">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-blue-100 transition duration-300 hover:text-white hover:translate-x-1 inline-block"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Footer;