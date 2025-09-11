"use client";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Table from "../components/Table";
import ProtectedRoute from "../components/ProtectedRoute";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/shopify/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ProtectedRoute>
      <div className="pt-24 max-w-7xl mx-auto px-6 md:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Products</h1>
          <p className="text-gray-600 mt-2">
            Browse all your Shopify products. Add, edit, and manage product details easily.
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white shadow-md rounded-xl overflow-x-auto p-4">
          <Table data={products} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
