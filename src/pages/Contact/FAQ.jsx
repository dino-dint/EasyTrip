import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqItems } from "../../data/contactData";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            FREQUENTLY ASKED QUESTIONS
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Need Help? We've Got Answers.
          </h2>

          <p className="mt-5 text-slate-600">
            Find answers to common questions before contacting support.
          </p>
        </div>

        <div className="mt-14 space-y-5">
          {faqItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-3xl bg-white shadow-md"
              >
                <button
                  onClick={() => setOpen(open === index ? -1 : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                      <Icon size={22} />
                    </div>

                    <h3 className="font-semibold text-slate-800">
                      {item.question}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`transition ${
                      open === index ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {open === index && (
                  <div className="px-6 pb-6 text-slate-600">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}