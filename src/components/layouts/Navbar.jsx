import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { name: "Home", path: "/" },
  { name: "Destination", path: "/destination" },
  { name: "Hotels & Resorts", path: "/accommodation" },
  { name: "Flights", path: "/flight" },
  { name: "Contact", path: "/contact" },
];

const DestinationDropdown = [
  { name: "Cambodia", path: "/destination/cambodia" },
  { name: "Japan", path: "/destination/japan" },
  { name: "South Korea", path: "/destination/korea" },
  { name: "USA", path: "/destination/america" },
  { name: "China", path: "/destination/china" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
      isActive ? "text-white" : "text-white/80 hover:text-white"
    }`;

  const underlineClass = ({ isActive }) =>
    `absolute left-0 -bottom-1 h-[2px] w-full rounded-full bg-white origin-left transition-all duration-300 ${
      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
    }`;

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="text-white px-4 py-3 relative z-40 max-w-7xl mx-auto">
        <div className="flex justify-between items-center bg-white/20 backdrop-blur-md h-14 px-6 rounded-3xl shadow-2xl border border-white/10">
          
          {/* Logo */}
          <div className="text-xl font-bold text-white flex items-center gap-3">
            <Link to="/" className="hover:text-slate-200 transition-colors">
              <span>EasyTrip</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              if (item.name === "Destination") {
                return (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setDestinationOpen(true)}
                    onMouseLeave={() => setDestinationOpen(false)}
                  >
                    <NavLink to={item.path} className={navLinkClass}>
                      {({ isActive }) => (
                        <span className="group inline-flex items-center gap-1">
                          {item.name}
                          <span className={underlineClass({ isActive })} />
                        </span>
                      )}
                    </NavLink>

                    {/* Dropdown Menu */}
                    {destinationOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-slate-900/90 backdrop-blur-lg border border-white/10 p-2 shadow-xl flex flex-col gap-1">
                        {DestinationDropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            className="px-3 py-2 text-sm rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
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
                <NavLink key={item.name} to={item.path} className={navLinkClass}>
                  {({ isActive }) => (
                    <span className="group relative">
                      {item.name}
                      <span className={underlineClass({ isActive })} />
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white"
            aria-label="Toggle Navigation"
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="md:hidden mt-3 rounded-2xl bg-slate-900/95 backdrop-blur-md p-4 border border-white/10 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white py-1 px-2 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;