import { useState, useEffect } from "react";

interface Category {
  categoryId: number;
  categoryName: string;
}

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5018/api/Category", {
      method: "GET",
      headers: {
        Origin: window.location.host,
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategoryList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6 py-10 rounded-xl bg-white shadow-lg">
      
      {/* Heading */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <h1 className="text-5xl font-bold leading-relaxed pb-2 bg-linear-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
          Category List
        </h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border border-gray-300 rounded-lg">
          <thead className="sticky top-0 bg-teal-700 text-white">
            <tr>
              <th className="px-6 py-3 text-center font-semibold border border-gray-300 tracking-wide">
                Category Name
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td className="text-center py-5">Loading...</td>
              </tr>
            ) : (
              categoryList.map((c, index) => (
                <tr
                  key={c.categoryId}
                  className={
                    index % 2 === 0
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-white hover:bg-teal-100"
                  }
                >
                  <td className="px-6 py-3 text-center border border-gray-300">
                    {c.categoryName}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}