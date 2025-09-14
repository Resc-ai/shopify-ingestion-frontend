"use client";

import { useState } from "react";
import api from "../../../utils/api";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer
} from "recharts";
export default function ReportsPage() {
  const [summary, setSummary] = useState({});
  const [ordersOverTime, setOrdersOverTime] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasApplied, setHasApplied] = useState(false);
  const [forecastData, setForecastData] = useState([]);

async function fetchForecast() {
  try {
    const res = await api.get("/shopify/reports/revenue-forecast");
    setForecastData(res.data.forecast);
  } catch (err) {
    console.error("❌ Error fetching forecast:", err);
  }
}

  async function fetchData() {
    try {
      const params = {};
      if (filterType === "last7") {
        params.start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        params.end = new Date().toISOString().slice(0, 10);
      } else if (filterType === "last30") {
        params.start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
        params.end = new Date().toISOString().slice(0, 10);
      } else if (filterType === "thisMonth") {
        const now = new Date();
        params.start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
        params.end = new Date().toISOString().slice(0, 10);
      } else if (filterType === "custom") {
        params.start = startDate || undefined;
        params.end = endDate || undefined;
      }

      const summaryRes = await api.get("/shopify/reports/summary", { params });
      setSummary(summaryRes.data);

      const ordersRes = await api.get("/shopify/reports/orders-over-time", { params });
      setOrdersOverTime(ordersRes.data);

      const topCustRes = await api.get("/shopify/reports/top-customers", { params });
      setTopCustomers(topCustRes.data);

      const topProdRes = await api.get("/shopify/reports/top-products", { params });
      setTopProducts(topProdRes.data);

      setHasApplied(true);
      fetchForecast();
    } catch (err) {
      console.error("❌ Error fetching reports:", err);
    }
  }

  return (
    <ProtectedRoute>
      <div className="pt-24 max-w-7xl mx-auto px-6 md:px-8 space-y-6 mb-16">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Reports Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Analyze your Shopify data with insights, trends, and top performers.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-[#F5F8FF] p-4 rounded-lg">
          <select
  value={filterType}
  onChange={(e) => setFilterType(e.target.value)}
  className="
    p-3
    border
    border-gray-300
    rounded-lg
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-blue-500
    bg-white
    text-gray-900
    text-base
    transition
    duration-200
    ease-in-out
    cursor-pointer
  "
>
  <option value="">-- Select Date Range --</option>
  <option value="last7">Last 7 Days</option>
  <option value="last30">Last 30 Days</option>
  <option value="thisMonth">This Month</option>
  <option value="custom">Custom Range</option>
</select>

          {filterType === "custom" && (
  <div className="flex gap-3 items-center">
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="
        p-3
        border
        border-gray-300
        rounded-lg
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        bg-white
        text-gray-900
        text-base
        transition
        duration-200
        ease-in-out
        cursor-pointer
      "
    />
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="
        p-3
        border
        border-gray-300
        rounded-lg
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        bg-white
        text-gray-900
        text-base
        transition
        duration-200
        ease-in-out
        cursor-pointer
      "
    />
  </div>
)}

<button
  onClick={fetchData}
  className="
    px-6
    py-2.5
    bg-[#0052FF]
    text-white
    rounded-lg
    font-semibold
    hover:bg-blue-600
    shadow-md
    hover:shadow-lg
    transition
    duration-200
    ease-in-out
  "
>
  Apply
</button>

        </div>

        {!hasApplied ? (
          <div className="text-center text-gray-500 mt-10">
            Please select a date range to view reports.
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white shadow-md rounded-xl p-6 text-center">
                <p className="text-gray-500">Total Customers</p>
                <p className="text-2xl font-bold text-[#0052FF]">{summary.totalCustomers}</p>
              </div>
              <div className="bg-white shadow-md rounded-xl p-6 text-center">
                <p className="text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-[#0052FF]">{summary.totalOrders}</p>
              </div>
              <div className="bg-white shadow-md rounded-xl p-6 text-center">
                <p className="text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-[#0052FF]">
                  Rs.{summary.totalRevenue?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Orders & Revenue Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-md rounded-xl p-4">
                <h2 className="text-xl font-semibold mb-2 text-black">Orders Over Time</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={ordersOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="order_count" stroke="#0052FF" strokeWidth={2}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white shadow-md rounded-xl p-4">
                <h2 className="text-xl font-semibold mb-2 text-black">Revenue Over Time</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={ordersOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(v) => `Rs.${v.toFixed(2)}`} />
                    <Legend />
                    <Line type="monotone" dataKey="total_revenue" stroke="#00C49F" strokeWidth={2}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Customers & Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-md rounded-xl p-4">
                <h2 className="text-xl font-semibold mb-2 text-black">Top 5 Customers by Spend</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={topCustomers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      interval={0}          // show all labels
                      tick={{ fontSize: 12 }} // shrink font a bit
                      angle={0}           // tilt labels to prevent overlap
                      textAnchor="end" 
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total_spent" fill="#0052FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white shadow-md rounded-xl p-4">
                <h2 className="text-xl font-semibold mb-2 text-black">Top 5 Products by Sales</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={topProducts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="title" 
                      interval={0}          // show all labels
                      tick={{ fontSize: 10 }} // shrink font a bit
                      angle={-10}           // tilt labels to prevent overlap
                      textAnchor="end" 
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="qty" fill="#FFC658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
        {/* Revenue Forecast */}
<div className="bg-white shadow-md rounded-xl p-6">
  <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">
    Revenue Forecast <span className="text-sm text-gray-500">(Next 7 Days)</span>
  </h2>
  <ResponsiveContainer width="100%" height={280}>
    <LineChart data={forecastData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
      <XAxis dataKey="date" stroke="#6B7280" />
      <YAxis stroke="#6B7280" />
      <Tooltip formatter={(v) => `Rs.${v.toFixed(2)}`} />
      <Legend />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#0052FF"
        strokeWidth={2.5}
        dot={{ r: 3 }}
        name="Actual"
        data={forecastData.slice(0, -7)}
      />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#FF5733"
        strokeDasharray="6 4"
        strokeWidth={2.5}
        dot={false}
        name="Forecast"
        data={forecastData.slice(-7)}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

{/* Insights Row */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
  <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
    <p className="text-gray-500 text-sm">Returning vs New</p>
    <p className="text-2xl font-bold text-[#0052FF] mt-2">
      {summary.returningRate}% <span className="text-gray-600 text-base">Returning</span>
    </p>
  </div>

  <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
    <p className="text-gray-500 text-sm">High-Value Customers</p>
    <p className="text-2xl font-bold text-[#0052FF] mt-2">
      {summary.highValueCount}
    </p>
  </div>

  <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center">
    <p className="text-gray-500 text-sm">At Risk of Churn</p>
    <p className="text-2xl font-bold text-red-500 mt-2">{summary.churnRisk}</p>
  </div>

  <div className="bg-gradient-to-r from-[#0052FF] to-[#00C49F] p-6 rounded-xl text-white shadow-lg flex flex-col items-center relative overflow-hidden">
    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-2xl"></div>
    <p className="text-sm opacity-90">Projected ARR</p>
    <p className="text-3xl font-bold mt-2">
      Rs.{summary.projectedARR?.toLocaleString()}
    </p>
    <p className="text-xs mt-1 opacity-80">Based on current trends</p>
  </div>
</div>

      </div>
    </ProtectedRoute>
  );
}
