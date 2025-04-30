"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Hamburger ve X ikonları

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü durumunu tutan state

  return (
    <div className="relative w-full bg-transparent py-4">
      <div className="flex justify-between items-center">
        {/* Hamburger Menü Butonu */}
        <div className="sm:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menü - Mobilde Açılabilir, Büyük Ekranda Sabit */}
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex sm:gap-6 sm:mx-auto sm:w-full sm:justify-center sm:rounded-full sm:bg-white sm:bg-opacity-80 sm:p-3 sm:shadow-md sm:backdrop-blur-lg`}
          onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        >
          {["Anasayfa", "Hizmetler"].map((label) => (
            <Tab key={label} setPosition={setPosition} label={label}>
              {label}
            </Tab>
          ))}
          <Cursor position={position} />
        </ul>
      </div>
    </div>
  );
}

const Tab = ({
  children,
  setPosition,
  label,
}: {
  children: React.ReactNode;
  setPosition: any;
  label: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  // Linkleri özel olarak ele alıyoruz
  const href =
    label === "Anasayfa"
      ? "/"
      : label === "Hizmetler"
      ? "/services"
      : `/${label.toLowerCase()}`;
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 px-5 py-2 text-sm font-medium text-blue-700 cursor-pointer transition-colors duration-200 hover:text-indigo-800"
    >
      <Link href={href} passHref>
        {children}
      </Link>
    </li>
  );
};


const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute z-0 h-1.5 rounded-full bg-indigo-600 " 
    />
  );
};

export default NavHeader;
