import { ChevronDown, Heart, Map, User, X, Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Destination", path: "/destination" },
  { name: "Hotels & Resorts", path: "/accommodation" },
  { name: "Flights", path: "/flight" },
  { name: "Contact", path: "/contact" },
];


const destinationDropdown = [
  { name: "Cambodia", path: "/destination/cambodia" },
  { name: "Japan", path: "/destination/japan" },
  { name: "South Korea", path: "/destination/korea" },
  { name: "USA", path: "/destination/usa" },
  { name: "China", path: "/destination/china" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const location = useLocation();

  const closeDropdown = () => setDestinationOpen(false);
  const closeSidebar = () => {
    setIsOpen(false);
    setDestinationOpen(false);
  };

  // Close sidebar automatically on route change
  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  // Prevent background scrolling when sidebar drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
      isActive ? "text-white" : "text-slate-300 hover:text-white"
    }`;

  const underlineClass = (isActive) =>
    `absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-sky-400 origin-left transition-transform duration-300 ${
      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
    }`;

  const iconButtonClass =
    "relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-200 border border-slate-700 transition-all duration-300 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-lg hover:shadow-sky-500/30 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";

  return (
    <>
      {/* Floating Header Bar */}
      <header className="fixed inset-x-0 top-3 sm:top-5 z-40 flex justify-center px-3 sm:px-5 lg:px-8">
        <div className="w-full max-w-7xl rounded-full border border-slate-700/80 bg-slate-900/90 backdrop-blur-3xl   shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
          <div className="flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-10">
            {/* Logo */}
            <Link
              to="/"
              onClick={closeDropdown}
              className="flex items-center gap-2 shrink-0"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-white transition hover:text-sky-400">
                EasyTrip
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navItems.map((item) => {
                if (item.name === "Destination") {
                  return (
                    <div key={item.name} className="relative">
                      <div className="flex items-center gap-1">
                        <NavLink
                          to={item.path}
                          className={navLinkClass}
                          onClick={closeDropdown}
                        >
                          {({ isActive }) => (
                            <span className="group relative inline-block">
                              {item.name}
                              <span className={underlineClass(isActive)} />
                            </span>
                          )}
                        </NavLink>

                        <button
                          type="button"
                          onClick={() => setDestinationOpen(!destinationOpen)}
                          className="text-slate-300 hover:text-white transition"
                        >
                          <ChevronDown
                            size={18}
                            className={`transition duration-300 ${
                              destinationOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* Dropdown */}
                      {destinationOpen && (
                        <div className="absolute left-0 top-full mt-3 w-52 rounded-2xl border border-slate-700 bg-slate-900/95 backdrop-blur-xl p-2 shadow-2xl z-50">
                          {destinationDropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              onClick={closeDropdown}
                              className="block rounded-xl px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={navLinkClass}
                    onClick={closeDropdown}
                  >
                    {({ isActive }) => (
                      <span className="group relative inline-block">
                        {item.name}
                        <span className={underlineClass(isActive)} />
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link to="/wishlist" className={iconButtonClass}>
                <Heart size={18} />
              </Link>

              <Link to="/login" className={iconButtonClass}>
                <User size={18} />
              </Link>

              <Link
                to="/my-trip"
                className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400 shadow-lg hover:shadow-sky-500/30"
              >
                My Trip
              </Link>
            </div>

            {/* Tablet Icons & Toggle */}
            <div className="hidden sm:flex lg:hidden items-center gap-2">
              <Link to="/trip" className={iconButtonClass}>
                <Map size={18} />
              </Link>

              <Link to="/login" className={iconButtonClass}>
                <User size={18} />
              </Link>

              <button
                onClick={() => setIsOpen(true)}
                className={iconButtonClass}
                aria-label="Open sidebar menu"
              >
                <Menu size={20} />
              </button>
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex sm:hidden h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-200 backdrop-blur-md hover:bg-slate-700 transition"
              aria-label="Open sidebar menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* --- SIDEBAR DRAWER & BACKDROP OVERLAY --- */}

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* Off-canvas Mobile/Tablet Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm border-l border-slate-700 bg-slate-900/95 backdrop-blur-2xl shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between p-6 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Drawer Top Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <span className="text-xl font-bold tracking-wide text-white">
              EasyTrip
            </span>
            <button
              onClick={closeSidebar}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Items List */}
          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.name === "Destination" ? (
                  <>
                    <button
                      onClick={() => setDestinationOpen(!destinationOpen)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-slate-200 hover:bg-slate-800 transition"
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          destinationOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Destination Sub-menu */}
                    {destinationOpen && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-sky-500/40 pl-3">
                        {destinationDropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            onClick={closeSidebar}
                            className="block rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-base font-medium transition ${
                        isActive
                          ? "bg-sky-500/20 text-sky-400 font-semibold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Drawer Footer */}
        <div className="border-t border-slate-800 pt-6 space-y-4">
          <div className="flex items-center justify-around gap-3">
            <Link
              to="/wishlist"
              onClick={closeSidebar}
              className={iconButtonClass}
            >
              <Heart size={18} />
            </Link>

            <Link to="/login" onClick={closeSidebar} className={iconButtonClass}>
              <User size={18} />
            </Link>

            <Link
              to="/trip"
              onClick={closeSidebar}
              className={iconButtonClass}
            >
              <Map size={18} />
            </Link>
          </div>

          <Link
            to="/my-trip"
            onClick={closeSidebar}
            className="block w-full text-center rounded-full bg-sky-500 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 shadow-lg shadow-sky-500/20"
          >
            My Trip
          </Link>
        </div>
      </aside>
    </>
  );
}

export default Navbar;