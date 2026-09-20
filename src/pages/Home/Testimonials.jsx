import { Star } from "lucide-react";
import { testimonials } from "../../data/homeData";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-black px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute left-1/4 top-20 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center text-white">
          <p className="mb-3 text-sm font-bold tracking-widest text-blue-300">
            TESTIMONIALS
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Loved by Travelers Worldwide
          </h2>

          <p className="mt-5 leading-7 text-slate-300">
            See what travelers are saying about their EasyTrip experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-3xl border border-white/10 bg-white/10 p-7 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/15"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 min-h-28 leading-7 text-slate-200">
                "{testimonial.review}"
              </p>

              <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white/10"
                />

                <div>
                  <h3 className="font-bold text-white">{testimonial.name}</h3>

                  <p className="text-sm text-slate-400">
                    {testimonial.country}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
