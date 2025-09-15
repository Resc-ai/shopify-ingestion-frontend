"use client";

import { useState, useEffect, useMemo } from "react";
import api from "../../../utils/api";
import Link from "next/link";
import ProtectedRoute from "../components/ProtectedRoute";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchOrderNo, setSearchOrderNo] = useState("");

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

  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.order_number.toString().includes(searchOrderNo.trim())
    );
  }, [orders, searchOrderNo]);

  const totalOrders = filteredOrders.length;
  const topOrders = [...filteredOrders]
    .sort((a, b) => b.total_price - a.total_price)
    .slice(0, 3);

  const productSalesMap = {};
  filteredOrders.forEach(order => {
    order.order_items.forEach(item => {
      const key = item.products?.title || "N/A";
      productSalesMap[key] = (productSalesMap[key] || 0) + item.quantity;
    });
  });

  const topProducts = Object.entries(productSalesMap)
    .sort(([, qtyA], [, qtyB]) => qtyB - qtyA)
    .slice(0, 3);

  return (
    <ProtectedRoute>
      <div className="pt-24 max-w-7xl mx-auto px-6 md:px-8 mb-16">

        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Orders</h1>
            <p className="text-gray-600 mt-2">
              View and manage your Shopify orders. Expand each order to see item details and sync data easily.
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

        {/* Search Filter */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-8 flex items-center space-x-4">
          <input
            type="text"
            placeholder="🔍 Search by Order Number"
            value={searchOrderNo}
            onChange={e => setSearchOrderNo(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-black"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-gray-700">Total Orders</h3>
            <p className="text-3xl font-bold text-[#1A1A1A]">{totalOrders}</p>
          </div>

          {topOrders.map((order) => (
            <div key={order.id} className="bg-white shadow rounded-lg p-6">
              <h3 className="text-md font-medium text-gray-700">Top Order #{order.order_number}</h3>
              <p>Total: <span className="font-semibold text-black">Rs.{order.total_price}</span></p>
            </div>
          ))}
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Top Selling Products</h2>
          {topProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topProducts.map(([title, qty], idx) => (
                <div key={idx} className="bg-blue-50 p-4 rounded-lg shadow hover:shadow-lg transition">
                  <h3 className="text-lg font-medium text-gray-800">{title}</h3>
                  <p className="mt-2 text-gray-600">Sold Quantity: <span className="font-semibold">{qty}</span></p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products sold yet.</p>
          )}
        </div>
        {/* Checkout Link Section */}
        <div className="flex justify-end mb-8">
          <Link
            href="/checkouts"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition"
          >
            <span>🛒 View Checkouts</span>
          </Link>
        </div>
        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white shadow-md rounded-xl p-4 transition hover:shadow-lg">

              {/* Order Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setExpanded(prev => ({ ...prev, [order.id]: !prev[order.id] }))
                }
              >
                <div className="font-semibold text-lg text-black">
                  Order #{order.order_number} | Total: Rs.{order.total_price}
                </div>
                <div className="text-gray-500 text-xl">{expanded[order.id] ? "▼" : "▶"}</div>
              </div>

              {/* Order Items */}
              {expanded[order.id] && (
                <div className="mt-4 overflow-x-auto">
                  {order.order_items.length > 0 ? (
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
                            <td className="px-4 py-2 text-gray-800">{item.products?.title || "N/A"}</td>
                            <td className="px-4 py-2 text-gray-800">{item.quantity}</td>
                            <td className="px-4 py-2 text-gray-800">Rs.{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500 mt-2">No items for this order.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
