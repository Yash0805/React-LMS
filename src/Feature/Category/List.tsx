import { useState, useEffect } from "react";
import { ApiService } from "Service";
import { Loader } from "Shared/Component/Loader/Loader";

interface Category {
  categoryId: number;
  categoryName: string;
}

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      ApiService.get<Category[]>("Category")
      .then(setCategoryList)
      .finally(() => setLoading(false));
      },[]);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6 py-10 rounded-xl bg-white shadow-lg">

      <div className="flex justify-center mb-8">
        <h1 className="text-5xl font-bold text-slate-800 ">
          Category List
        </h1>
      </div>


      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border border-gray-300">

          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3 text-center font-semibold border border-gray-300">
                Category Name
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10">
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : categoryList.length ===0 ?(
               <tr>
                <td colSpan={2} className="text-center py-5 text-gray-500">
                  No Category Found
                </td>
              </tr>
            ) :
            (
              categoryList.map((c, index) => (
                <tr
                  key={c.categoryId}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="px-6 py-3 text-center border border-gray-300 ">
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