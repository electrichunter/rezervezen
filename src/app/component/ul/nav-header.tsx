"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetler", href: "/services" },
  { label: "Giriş", href: "/services/login" },
];

function NavHeader() {
  const [cursorPos, setCursorPos] = useState({ left: 0, width: 0, opacity: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/80 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-bold text-blue-700">ReserveZen</div>

        {/* Mobil Menü Butonu */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü Aç/Kapat"
            className="text-gray-700 dark:text-white"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menü */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } sm:flex sm:gap-6 absolute sm:static top-full left-0 w-full sm:w-auto bg-white dark:bg-gray-900 sm:bg-transparent sm:dark:bg-transparent sm:backdrop-blur-none p-4 sm:p-0`}
        >
          <ul
            className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
            onMouseLeave={() => setCursorPos((prev) => ({ ...prev, opacity: 0 }))}
          >
            {navLinks.map(({ label, href }) => (
              <Tab key={label} label={label} href={href} setPosition={setCursorPos} />
            ))}
            <Cursor position={cursorPos} />
          </ul>
        </nav>
      </div>
    </header>
  );
}

const Tab = ({
  label,
  href,
  setPosition,
}: {
  label: string;
  href: string;
  setPosition: (pos: { left: number; width: number; opacity: number }) => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (ref.current) {
          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            width,
            opacity: 1,
            left: ref.current.offsetLeft,
          });
        }
      }}
      className="relative px-4 py-2 text-base font-medium text-gray-800 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
    >
      <Link href={href}>{label}</Link>
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.div
      className="absolute bottom-0 h-[2px] bg-blue-600 rounded-full"
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
};

export default NavHeader;
