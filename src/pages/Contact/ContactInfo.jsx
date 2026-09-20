import { contactCards } from "../../data/contactData";

export default function ContactInfo() {
  return (
    <section className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            CONTACT INFORMATION
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            We're Always Ready to Help
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Reach out through your preferred communication channel anytime,
            anywhere.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-white bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-slate-500">{item.description}</p>

                <p className="mt-6 font-medium text-blue-600">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}