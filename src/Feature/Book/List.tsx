import { useEffect, useState } from "react";
import { ApiService } from "Service";
import { Loader } from "Shared/Component/Loader/Loader";
import { Grid } from "Shared/Component/Grid";

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
      .then(data => setBookList(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }

  if (bookList.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        No Books Found
      </div>
    );
  }

  return (
    <div className="mt-10 px-6 text-white">

      <div className="flex justify-start mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Book List
        </h1>
      </div>

      <Grid<BookList>
        data={bookList}
        rowKey={(b) => b.bookId}
        columns={[
          {
            field: "bookName",
            header: "Book Name",
          },
          {
            field: "publisher",
            header: "Publisher",
          },
          {
            field: "author",
            header: "Author",
          },
          {
            field: "price",
            header: "Price",
          },
          {
            field: "categoryName",
            header: "Category",
          },
        ]}
      />

    </div>
  );
}