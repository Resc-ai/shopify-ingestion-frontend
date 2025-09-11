"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [apiKey, setApiKey] = useState("");
  const router = useRouter();

  const handleLogin = () => {
  if (!apiKey) return alert("Please enter your API key");
  localStorage.setItem("apiKey", apiKey);

  // Trigger Navbar update
  window.dispatchEvent(new Event("loginChange"));

  router.push("/customers");
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        {/* Logo / Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Shopify Dashboard
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Enter your <span className="font-medium text-gray-700">API Key</span>{" "}
          to securely access your data.
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full px-4 py-3 mb-5 rounded-lg border border-gray-300 text-gray-900 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all 
          text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg"
        >
          Sign In
        </button>

        {/* Footer note */}
        <p className="text-xs text-gray-400 mt-6">
          Don’t have an API key?{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Contact your admin
          </span>
        </p>
      </div>
    </div>
  );
}
