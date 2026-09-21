import { useMemo, useState } from "react";
import { destinations, countries } from "../../data/destination";
import DestinationHero from "./DestinationHero";
import CountryTabs from "./CountryTab";
import DestinationCard from "./DestinationCard";
import { Sparkles, Globe2 } from "lucide-react";

export default function Destination() {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");

  const filteredDestinations = useMemo(() => {
    return destinations.filter((item) => {
      const matchesCountry =
        selectedCountry === "All" || item.country === selectedCountry;

      const keyword = search.toLowerCase();

      const matchesSearch =
        item.country.toLowerCase().includes(keyword) ||
        item.city.toLowerCase().includes(keyword) ||
        item.title.toLowerCase().includes(keyword);

      return matchesCountry && matchesSearch;
    });
  }, [search, selectedCountry]);

  const featured = destinations.filter((item) => item.featured);

  return (
    <main className="bg-[#020617] text-white">
      <DestinationHero search={search} setSearch={setSearch} />

      <section className="mx-auto max-w-7xl px-5 py-16 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold">Choose Your Destination</h2>
            <p className="text-slate-400 mt-2">
              Explore the most loved destinations in Asia and America.
            </p>
          </div>

          <Globe2 className="text-cyan-400" size={34} />
        </div>

        <CountryTabs
          countries={countries}
          selected={selectedCountry}
          setSelected={setSelectedCountry}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 flex items-center gap-3">
            <Sparkles className="text-cyan-400" />
            <h2 className="text-3xl font-bold">Featured Adventures</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featured.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-4xl group"
              >
                <img
                  src={item.image}
                  className="h-95 w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

                <div className="absolute bottom-0 p-8">
                  <span className="rounded-full bg-cyan-500 px-3 py-1 text-sm">
                    {item.country}
                  </span>

                  <h3 className="mt-4 text-3xl font-bold">{item.title}</h3>
                  <p className="mt-2 max-w-md text-slate-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}