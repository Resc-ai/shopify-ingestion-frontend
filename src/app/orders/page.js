"use client";
import { useState, useEffect } from "react";
import api from "../../../utils/api";
import ProtectedRoute from "../components/ProtectedRoute";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track expanded orders
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/shopify/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSync = async () => {
    setLoading(true);
    try {
      await api.post("/shopify/sync");
      await fetchOrders();
      alert("✅ Shopify data synced!");
    } catch (err) {
      console.error(err);
      alert("❌ Sync failed!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <ProtectedRoute>
      <div className="pt-24 max-w-7xl mx-auto px-6 md:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Orders</h1>
            <p className="text-gray-600 mt-2">
              View and manage all your Shopify orders. Expand each order to see item details.
            </p>
          </div>

          <button
            onClick={handleSync}
            disabled={loading}
            className="mt-4 md:mt-0 bg-[#0052FF] text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            {loading ? "Syncing..." : "Sync Shopify"}
          </button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white shadow-md rounded-xl p-4">
              {/* Order Header */}
              <div
                className="flex justify-between cursor-pointer"
                onClick={() =>
                  setExpanded(prev => ({ ...prev, [order.id]: !prev[order.id] }))
                }
              >
                <div className="font-semibold text-[#1A1A1A]">
                  Order #{order.order_number} | Total: ${order.total_price}
                </div>
                <div className="text-gray-500">{expanded[order.id] ? "▼" : "▶"}</div>
              </div>

              {/* Order Items */}
              {expanded[order.id] && order.order_items.length > 0 && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-[#F5F8FF]">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">Product</th>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">Quantity</th>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.order_items.map(item => (
                        <tr key={item.id} className="border-b bg-white">
                          <td className="px-4 py-2 text-gray-800">{item.product?.title || "N/A"}</td>
                          <td className="px-4 py-2 text-gray-800">{item.quantity}</td>
                          <td className="px-4 py-2 text-gray-800">${item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {expanded[order.id] && order.order_items.length === 0 && (
                <p className="mt-2 text-gray-500">No items for this order.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
