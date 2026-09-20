import { features } from "../../data/homeData";

export default function Features() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold tracking-widest text-blue-600">
            WHY CHOOSE EASYTRIP
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Travel Smarter, Travel Easier
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
            Everything you need to make your journey simple, secure, and
            unforgettable.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-zinc-950 shadow-xl bg-white p-7 shadow-slate-200/40 transition-all duration-300 hover:-translate-y-2 hover:bg-blue-600 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-white">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-500 transition-colors duration-300 group-hover:text-blue-50">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
