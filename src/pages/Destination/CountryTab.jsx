export default function CountryTabs({ countries, selected, setSelected }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar">
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => setSelected(country)}
          className={`whitespace-nowrap rounded-full px-5 py-2 text-sm transition-all ${
            selected === country
              ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
              : "bg-slate-100 text-black hover:bg-cyan-500"
          }`}
        >
          {country}
        </button>
      ))}
    </div>
  );
}