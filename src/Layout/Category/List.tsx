import { useState, useEffect } from "react";

interface Category {
  categoryId: number;
  categoryName: string;
}

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://localhost:5018/api/Category", {
      method: "GET",
      headers: {
        Origin: window.location.host,
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => setCategoryList(data));
  }, []);

  return (
    <div className="md:table-fixed max-w-7xl mx-auto mt-10 px-6 py-10 rounded-xl bg-white shadow-lg">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="text-teal-600" />
        <h1 className="text-5xl font-bold bg-linear-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
          Category List
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed border border-gray-300 rounded-lg">
          <thead className="sticky top-0 bg-teal-700 text-white z-10">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Category Name
              </th>
            </tr>
          </thead>

          <tbody>
            {categoryList.map((c, index) => (
              <tr
                key={c.categoryId}
                className={
                  index % 2 === 0
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-white hover:bg-teal-100"
                }
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {c.categoryName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}