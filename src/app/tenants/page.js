'use client';
import { useState } from "react";
import api from "../../../utils/api";

export default function TenantOnboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shopUrl, setShopUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await api.post("/tenants/onboard", { 
        name, 
        email,
        shopUrl,
        accessToken 
      });
      setMessage(`✅ Tenant onboarded. API Key: ${res.data.api_key}`);
      localStorage.setItem("apiKey", res.data.api_key);
    } catch (err) {
      setMessage("❌ Error onboarding tenant");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Tenant Onboarding
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-400 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-400 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <input
            type="text"
            placeholder="Shopify Store URL (e.g. mystore.myshopify.com)"
            value={shopUrl}
            onChange={(e) => setShopUrl(e.target.value)}
            className="w-full p-3 border border-gray-400 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <input
            type="text"
            placeholder="Shopify Access Token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="w-full p-3 border border-gray-400 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            🚀 Onboard Tenant
          </button>
        </form>
        {message && (
          <p
            className={`mt-5 text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
