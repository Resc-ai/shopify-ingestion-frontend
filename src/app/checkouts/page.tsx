"use client";

import { useState, useEffect, useMemo } from "react";
import api from "../../../utils/api";
import ProtectedRoute from "../components/ProtectedRoute";

// Define Checkout type
interface CheckoutItem {
  title: string;
  quantity: number;
}

interface Checkout {
  id: number;
  checkout_id: string;
  email: string | null;
  total_price: string;
  items: CheckoutItem[];
}

export default function CheckoutsPage() {
  const [checkouts, setCheckouts] = useState<Checkout[]>([]);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [abandonedCheckouts, setAbandonedCheckouts] = useState<Checkout[]>([]);
  const [searchEmail, setSearchEmail] = useState("");

  const fetchCheckouts = async () => {
    try {
      const res = await api.get("/shopify/checkouts");
      setCheckouts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCheckouts();
  }, []);

  const filteredCheckouts = useMemo(() => {
    return checkouts.filter(c =>
      (c.email || "").toLowerCase().includes(searchEmail.toLowerCase())
    );
  }, [checkouts, searchEmail]);

  const fetchAbandoned = async () => {
  try {
    const res = await api.get("/shopify/checkouts/abandoned");
    setAbandonedCheckouts(res.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchCheckouts();
  fetchAbandoned();
}, []);

  return (
    <ProtectedRoute>
      <div className="pt-24 max-w-7xl mx-auto px-6 md:px-8 mb-16">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Checkouts</h1>
            <p className="text-gray-600 mt-2">
              View and track customer checkouts before they become orders.
            </p>
          </div>
        </div>

        {/* Search by Email */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-8 flex items-center space-x-4">
          <input
            type="text"
            placeholder="🔍 Search by Email"
            value={searchEmail}
            onChange={e => setSearchEmail(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-black"
          />
        </div>

        {/* Checkouts List */}
        <div className="space-y-4">
          {filteredCheckouts.map(c => (
            <div
              key={c.id}
              className="bg-white shadow-md rounded-xl p-4 transition hover:shadow-lg"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setExpanded(prev => ({ ...prev, [c.id]: !prev[c.id] }))
                }
              >
                <div className="font-semibold text-lg text-black">
                  Checkout #{c.checkout_id} | Rs.{c.total_price}
                </div>
                <div className="text-gray-500 text-xl">
                  {expanded[c.id] ? "▼" : "▶"}
                </div>
              </div>

              {/* Items */}
              {expanded[c.id] && (
                <div className="mt-4 overflow-x-auto">
                  {c.items && c.items.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse">
                      <thead className="bg-[#F5F8FF]">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-700 font-medium">Product</th>
                          <th className="px-4 py-2 text-left text-gray-700 font-medium">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {c.items.map((item, idx) => (
                          <tr key={idx} className="border-b bg-white">
                            <td className="px-4 py-2 text-gray-800">
                              {item.title || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-gray-800">{item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500 mt-2">No items in this checkout.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mt-10 text-black">Abandoned Checkouts</h2>
<div className="space-y-4">
  {abandonedCheckouts.map(c => (
    <div key={c.id} className="bg-red-50 shadow-md rounded-xl p-4">
      <div className="font-semibold text-lg text-black">
        Abandoned #{c.checkout_id} | Rs.{c.total_price}
      </div>
    </div>
  ))}
</div>

      </div>
    </ProtectedRoute>
  );
}
