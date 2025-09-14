"use client";

import { useEffect, useState, useMemo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { CSVLink } from "react-csv";
import ProtectedRoute from "../components/ProtectedRoute";
import api from "../../../utils/api";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    api.get("/shopify/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const columns = useMemo(() => [
    { field: 'first_name', headerName: 'First Name', flex: 1, minWidth: 150 },
    { field: 'last_name', headerName: 'Last Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 200 },
    {
      field: 'is_active',
      headerName: 'Status',
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <span className={`px-3 py-1 text-sm rounded-full ${
          params.value ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
        }`}>
          {params.value ? "Active" : "Inactive"}
        </span>
      )
    }
  ], []);

  const filteredRows = useMemo(() => {
    return customers.filter(c =>
      `${c.first_name} ${c.last_name} ${c.email}`.toLowerCase().includes(searchText.toLowerCase()) &&
      (statusFilter === "" || (statusFilter === "active" ? c.is_active : !c.is_active))
    );
  }, [customers, searchText, statusFilter]);

  return (
    <ProtectedRoute>
      <div className="pt-24 max-w-7xl mx-auto px-6 md:px-8 mb-16">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Customers</h1>
          <p className="text-gray-600 mt-2">
            Manage and view your Shopify customers. Filter, search, and analyze customer data easily.
          </p>
        </div>

        {/* Summary + Filter + Export */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">

            <div>
              <h2 className="text-lg font-medium text-gray-700">Total Customers</h2>
              <p className="text-2xl font-bold text-[#1A1A1A]">{customers.length}</p>
            </div>

            <CSVLink
              data={customers}
              filename="customers_export.csv"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Export CSV
            </CSVLink>
          </div>

          {/* Improved Filter UI */}
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            
            <input
              type="text"
              placeholder="🔍 Search by First Name, Last Name, or Email"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 w-full md:w-96 text-black"  
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
          </div>
        </div>

        {/* Data Grid */}
        <div style={{ height: '100%', width: '100%' }} className="bg-white shadow-md rounded-xl p-4">
          <DataGrid
            rows={filteredRows.map((row) => ({ id: row.id, ...row }))}
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
