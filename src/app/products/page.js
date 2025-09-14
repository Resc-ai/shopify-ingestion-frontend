"use client";

import { useEffect, useState, useMemo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from "react-csv";
import ProtectedRoute from "../components/ProtectedRoute";
import api from "../../../utils/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");

  useEffect(() => {
    api.get("/shopify/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const columns = useMemo(() => [
    { field: 'title', headerName: 'Product Name', flex: 1, minWidth: 200 },
    { field: 'sku', headerName: 'SKU', flex: 1, minWidth: 120 },
    { field: 'vendor', headerName: 'Vendor', flex: 1, minWidth: 150 },
    { field: 'price', headerName: 'Price (Rs)', type: 'number', flex: 1, minWidth: 120 },
    // { field: 'inventory', headerName: 'Inventory', type: 'number', flex: 1, minWidth: 120 },
    { field: 'is_active', headerName: 'Status', flex: 1, minWidth: 120, renderCell: (params) => (
        <span className={`px-3 py-1 text-sm rounded-full ${
          params.value ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
        }`}>
          {params.value ? "Active" : "Inactive"}
        </span>
      )
    },
    { field: 'created_at', headerName: 'Created At', flex: 1, minWidth: 180 },
    { field: 'updated_at', headerName: 'Updated At', flex: 1, minWidth: 180 },
  ], []);

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      p.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter === "" || (statusFilter === "active" ? p.is_active : !p.is_active)) &&
      (minPrice === "" || p.price >= parseFloat(minPrice))
    );
  }, [products, searchText, statusFilter, minPrice]);

  return (
    <ProtectedRoute>
      <div className="pt-24 max-w-7xl mx-auto px-6 md:px-8 mb-16">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Products</h1>
          <p className="text-gray-600 mt-2">
            Browse and manage your Shopify products. Apply filters and export data as needed.
          </p>
        </div>

        {/* Filter + Export */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-black w-full md:w-64"
            />

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-black"
            >
              <option value="">Filter by Status (All)</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <input
              type="number"
              placeholder="Min Price (Rs)"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-black w-full md:w-32"
            />

            <CSVLink
              data={filteredProducts}
              filename="products_export.csv"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Export CSV
            </CSVLink>
          </div>
        </div>

        {/* Data Grid */}
        <div style={{ height: '100%', width: '100%' }} className=" shadow-md rounded-xl p-4 text-black">
          <DataGrid
            rows={filteredProducts.map((row) => ({ id: row.id, ...row }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            pagination
            loading={loading}
            autoHeight
            disableSelectionOnClick
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
