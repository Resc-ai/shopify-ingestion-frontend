"use client";

export default function Table({ data }) {
  if (!data || data.length === 0) 
    return <p className="text-gray-500 text-center py-8">No data available</p>;

  const columns = Object.keys(data[0]);

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-[#F5F8FF]">
          {columns.map(col => (
            <th
              key={col}
              className="px-4 py-3 text-left text-gray-700 font-medium text-sm md:text-base"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
            {columns.map(col => (
              <td
                key={col}
                className="px-4 py-2 text-gray-800 text-sm md:text-base"
              >
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
