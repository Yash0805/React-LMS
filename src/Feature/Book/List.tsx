import { useEffect, useState } from "react";
import { ApiService } from "Service";
import { Loader } from "Shared/Component/Loader/Loader";


interface BookList {
  bookId: number;
  bookName: string;
  publisher: string;
  author: string;
  price: number;
  categoryId: number;
  categoryName: string;
}

export default function BookList() {
  const [bookList, setBookList] = useState<BookList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.get<BookList[]>("Books")
      .then(setBookList)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-6 py-10 rounded-xl bg-white shadow-lg">

      <div className="flex justify-center mb-8">
        <h1 className="text-5xl font-bold text-slate-800">
          Book List
        </h1>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full border border-gray-300">

          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3 text-center border">Book Name</th>
              <th className="px-6 py-3 text-center border">Publisher</th>
              <th className="px-6 py-3 text-center border">Author</th>
              <th className="px-6 py-3 text-center border">Price</th>
              <th className="px-6 py-3 text-center border">Category</th>
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
            ) : bookList.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-5 text-gray-500">
                  No Book Found
                </td>
              </tr>
            ) : (
              bookList.map((c, index) => (
                <tr
                  key={c.bookId}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                >
                  <td className="px-6 py-3 text-center border">
                    {c.bookName}
                  </td>
                  <td className="px-6 py-3 text-center border">
                    {c.publisher}
                  </td>
                  <td className="px-6 py-3 text-center border">
                    {c.author}
                  </td>
                  <td className="px-6 py-3 text-center border">
                    ₹{c.price}
                  </td>
                  <td className="px-6 py-3 text-center border">
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