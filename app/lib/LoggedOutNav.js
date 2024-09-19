import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function LoggedOutNav() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
        setExpanded(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeMenu = () => setExpanded(false);

  return (
    <nav className="bg-emerald-800 shadow px-10 py-3 flex justify-between items-center">
      {/* Website Logo (Home Link) */}
      <Link href="/" onClick={closeMenu} className="text-slate-50 text-2xl font-semibold no-underline">
        Support Worker
      </Link>

      {/* Hamburger Menu Button */}
      <button
        className="text-white lg:hidden"
        onClick={() => setExpanded(!expanded)}
        aria-label="Toggle navigation"
      >
        {expanded ? "✕" : "☰"}
      </button>

      {/* Navbar Items */}
      <div className={`lg:flex ${expanded ? "block" : "hidden"}`}>
        <ul className="flex flex-col lg:flex-row lg:space-x-6">
          <li>
            <Link href="/login" onClick={closeMenu} className="text-slate-50 hover:text-green-500 transition no-underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/registeruser" onClick={closeMenu} className="text-slate-50 hover:text-green-500 transition no-underline">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
