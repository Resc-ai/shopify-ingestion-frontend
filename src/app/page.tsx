"use client";

import { useState } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DashboardPage() {
  const [demoEmail, setDemoEmail] = useState("");

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoEmail) return alert("Please enter your email");
    alert(`Demo request submitted for ${demoEmail}`);
    setDemoEmail("");
  };

  return (
    <div className="relative min-h-screen font-sans bg-gradient-to-br from-[#F5F8FF] via-[#ECF3FF] to-[#E8EDFF] text-[#1A1A1A] overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#0052FF]/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px] -z-10"></div>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-0 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-[#0052FF] via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Manage Your Shopify Tenant Data Efficiently
          </h1>
          <p className="text-lg md:text-xl mb-6 text-gray-700">
            Access customers, orders, products and reports in one intuitive
            dashboard. Get insights and streamline your workflow.
          </p>
          <form
            className="flex gap-2 shadow-lg rounded-lg overflow-hidden"
            onSubmit={handleDemoSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={demoEmail}
              onChange={(e) => setDemoEmail(e.target.value)}
              className="px-4 py-3 flex-1 border-none focus:outline-none focus:ring-2 focus:ring-[#0052FF] bg-white/70 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#0052FF] to-blue-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Get a Demo
            </button>
          </form>
        </motion.div>

        {/* Hero Mockup */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="flex-1"
>
  <div className="w-full h-72 md:h-96 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 rounded-2xl flex items-center justify-center shadow-2xl border border-gray-200">
    <Image
  src="/ChatGPT Image Sep 12, 2025, 06_29_03 PM.png" // Place your image in the public/ folder
  alt="Hero Mockup"
  width={800} // Adjust width as needed
  height={600} // Adjust height as needed
  className="w-full h-full object-cover rounded-2xl"
/>
  </div>
</motion.div>

      </section>

      {/* Features Section */}
<section className="max-w-7xl mx-auto px-6 mt-28">
  <h2 className="text-4xl font-extrabold text-center mb-16 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
    Powerful Features
  </h2>
  <div className="grid md:grid-cols-3 gap-10">
    {[
      {
        title: "Centralized Data Management",
        desc: "Access customers, products, and orders in one secure dashboard."
      },
      {
        title: "Smart Reporting & Forecasting",
        desc: "AI-powered insights to forecast revenue and track growth trends."
      },
      {
        title: "Customer Insights",
        desc: "Identify high-value and at-risk customers with real-time analytics."
      },
      {
        title: "Multi-Tenant Support",
        desc: "Manage multiple Shopify tenants effortlessly in one platform."
      },
      {
        title: "Seamless Integration",
        desc: "Easily sync with Shopify APIs without complex setup."
      },
      {
        title: "Scalable Infrastructure",
        desc: "Built on Supabase & Node.js for speed, reliability, and growth."
      }
    ].map((feature) => (
      <motion.div
        key={feature.title}
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ type: "spring", stiffness: 250 }}
        className="relative group bg-white/80 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden"
      >
        {/* Gradient ring glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0052FF]/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
        
        {/* Minimal placeholder icon */}
        <div className="mx-auto mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#0052FF]/10 to-purple-400/10 border border-gray-200 shadow-inner">
          <div className="w-6 h-6 border-2 border-[#0052FF] rounded-md"></div>
        </div>

        <h3 className="text-xl font-bold mb-3 text-gray-800 relative z-10">
          {feature.title}
        </h3>
        <p className="text-gray-600 relative z-10">{feature.desc}</p>
      </motion.div>
    ))}
  </div>
</section>

{/* Trusted Brands Section */}
<section className="max-w-7xl mx-auto px-6 mt-28 text-center mb-16">
  <h2 className="text-3xl md:text-4xl font-extrabold mb-10">
    Trusted by{" "}
    <span className="bg-gradient-to-r from-[#0052FF] via-purple-600 to-pink-500 bg-clip-text text-transparent">
      Leading Brands
    </span>
  </h2>
  <Marquee
    gradient={false}
    speed={50}
    pauseOnHover
    className="overflow-hidden p-12"
  >
    {[
      "Gymshark",
      "Heinz",
      "Kylie Cosmetics",
      "Allbirds",
      "Red Bull",
      "Fashion Nova",
      "Staples",
      "Sephora",
    ].map((brand) => (
      <motion.div
        key={brand}
        whileHover={{ scale: 1.12, rotate: -1 }}
        className="mx-6 px-10 py-6 bg-white/70 backdrop-blur-md rounded-full shadow-md hover:shadow-xl transition border border-gray-200 relative group"
      >
        {/* Glow border effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0052FF]/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-md transition"></div>
        
        {/* Glossy reflection */}
        <div className="absolute top-0 left-0 w-full h-1/2 rounded-t-full bg-white/30 opacity-0 group-hover:opacity-60 transition"></div>

        <span className="relative z-10 text-lg font-semibold text-gray-800">
          {brand}
        </span>
      </motion.div>
    ))}
  </Marquee>
</section>


    </div>
  );
}
