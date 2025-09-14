"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
  const checkLogin = () => {
    const key = localStorage.getItem("apiKey");
    setIsLoggedIn(!!key);
  };

  checkLogin();

  window.addEventListener("loginChange", checkLogin);

  return () => window.removeEventListener("loginChange", checkLogin);
}, []);


  const handleProfileClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push("/profile");
    }
  };

  const navLinks = [
    { name: "Customers", href: "/customers" },
    { name: "Orders", href: "/orders" },
    { name: "Products", href: "/products" },
    { name: "Reports", href: "/reports" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-4">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold text-[#0052FF] hover:text-blue-600 transition">
          SHIPIT
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-lg font-medium text-[#1A1A1A]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md transition ${
                pathname === link.href
                  ? " text-[#1A1A1A]"
                  : "hover:text-[#0052FF]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Profile/Login Buttons */}
        <div className="hidden md:flex gap-4">
          <button
            onClick={handleProfileClick}
            className="px-4 py-2 border border-[#0052FF] text-[#0052FF] rounded hover:bg-[#0052FF] hover:text-white transition font-semibold"
          >
            {isLoggedIn ? "Profile" : "Login"}
          </button>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          {/* TODO: Add burger menu toggle */}
          <button className="text-[#0052FF] font-bold text-xl">☰</button>
        </div>
      </div>
    </header>
  );
}
