"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../../utils/api";

export default function ProfilePage() {
  const [tenant, setTenant] = useState({});
  const router = useRouter();

  useEffect(() => {
    async function fetchTenant() {
      try {
        const res = await api.get("/shopify/profile");
        setTenant(res.data);
      } catch (err) {
        console.error("Error fetching tenant:", err);
      }
    }
    fetchTenant();
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("apiKey");
  window.dispatchEvent(new Event("loginChange")); // dispatch event
  router.push("/login");
};


  return (
    <div className="pt-24 p-6 max-w-3xl mx-auto  mb-16">
      <h1 className="text-3xl font-bold mb-6 text-[#0052FF]">Tenant Profile</h1>

      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        {/* Name */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <span className="font-semibold w-32 text-gray-700">Name:</span>
          <span className="text-gray-900">{tenant.name || "-"}</span>
        </div>

        {/* Created At */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <span className="font-semibold w-32 text-gray-700">Created At:</span>
          <span className="text-gray-900">
            {tenant.created_at ? new Date(tenant.created_at).toLocaleString() : "-"}
          </span>
        </div>

        {/* API Key */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <span className="font-semibold w-32 text-gray-700">API Key:</span>
          <input
            type="text"
            value={tenant.api_key || ""}
            readOnly
            className="
              mt-1 md:mt-0
              w-full md:w-auto
              border border-gray-300
              rounded-lg
              px-3 py-2
              text-gray-900
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
              shadow-sm
              transition
              duration-200
            "
          />
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="
              px-6 py-2
              bg-red-500
              text-white
              font-semibold
              rounded-lg
              shadow-md
              hover:bg-red-600
              transition
              duration-200
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
