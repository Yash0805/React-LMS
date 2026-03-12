import { useState, useEffect } from "react";
interface CategoryList {
  categoryId: number;
  categoryName: string;
}
export default function CategoryList() {
  const [CategoryList, setCategoryList] = useState<CategoryList[]>([]);
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
  if (CategoryList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
  <div className="flex justify-center items-center mb-6">
    <h1 className="text-3xl font-bold">Category List</h1>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-center">
            Category ID
          </th>
          <th className="border border-gray-300 px-4 py-2 text-center">
            Category Name
          </th>
        </tr>
      </thead>

      <tbody>
        {CategoryList.map((c) => (
          <tr key={c.categoryId} className="hover:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 text-center">
              {c.categoryId}
            </td>
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
