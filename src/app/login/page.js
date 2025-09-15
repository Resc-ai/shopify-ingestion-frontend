"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";

export default function LoginPage() {
  const [apiKey, setApiKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("apikey"); 
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (mode === "apikey") {
        if (!apiKey) return alert("Please enter your API key");
        const res = await api.post("/tenants/login", { apiKey });
        localStorage.setItem("apiKey", res.data.tenant.api_key);
      } else {
        if (!email || !password) return alert("Please enter email and password");
        const res = await api.post("/tenants/login", { email, password });
        localStorage.setItem("apiKey", res.data.tenant.api_key || res.data.tenant.apiKey);
      }

      // Trigger Navbar update
      window.dispatchEvent(new Event("loginChange"));
      router.push("/customers");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mb-16">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Shopify Dashboard
        </h1>

        {/* Mode Toggle */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setMode("apikey")}
            className={`flex-1 py-2 rounded-lg font-semibold ${
              mode === "apikey" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            API Key
          </button>
          <button
            onClick={() => setMode("email")}
            className={`flex-1 py-2 rounded-lg font-semibold ${
              mode === "email" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            Email/Password
          </button>
        </div>

        {mode === "apikey" ? (
          <>
            <input
              type="text"
              placeholder="Enter API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 mb-5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mb-5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mb-5 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg"
        >
          Sign In
        </button>

        <p className="text-xs text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Contact your admin
          </span>
        </p>
      </div>
    </div>
  );
}
