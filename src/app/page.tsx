"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [demoEmail, setDemoEmail] = useState("");

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoEmail) return alert("Please enter your email");
    alert(`Demo request submitted for ${demoEmail}`);
    setDemoEmail("");
  };

  const features = [
    { title: "Feature One", desc: "Short description of feature one.", icon: "⚡" },
    { title: "Feature Two", desc: "Short description of feature two.", icon: "🚀" },
    { title: "Feature Three", desc: "Short description of feature three.", icon: "💡" },
  ];

  const brands = ["BrandA", "BrandB", "BrandC", "BrandD", "BrandE"];

  return (
    <div className="relative min-h-screen font-sans bg-[#F5F8FF] text-[#1A1A1A]">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-0 gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Manage Your Shopify Data Efficiently</h1>
          <p className="text-lg md:text-xl mb-6">
            Access customers, orders, products and reports in one intuitive dashboard. 
            Get insights and streamline your workflow.
          </p>
          <form className="flex gap-2" onSubmit={handleDemoSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={demoEmail}
              onChange={(e) => setDemoEmail(e.target.value)}
              className="px-4 py-2 rounded-l-lg border border-gray-300 focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#0052FF] text-white rounded-r-lg hover:bg-blue-600 transition"
            >
              Get a Demo
            </button>
          </form>
        </div>
        <div className="flex-1">
          {/* Replace with a hero image or mockup */}
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xl">Hero Image / Mockup</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20 grid md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Trusted Brands Section */}
      <section className="max-w-7xl mx-auto px-6 mt-20 text-center">
        <h2 className="text-2xl font-bold mb-6">Trusted by Top Brands</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {brands.map((brand) => (
            <div
              key={brand}
              className="w-24 h-12 bg-gray-200 flex items-center justify-center rounded hover:scale-105 hover:shadow-lg transition"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-20 py-6 text-center text-gray-500">
        © 2025 Shopify Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
