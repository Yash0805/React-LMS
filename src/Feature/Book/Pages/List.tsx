import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "Service";
import Button from "Shared/Component/Button/Button";
import { Grid } from "Shared/Component/Grid/Index";
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

  const navigate = useNavigate();
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


  return (
    <div className="mt-10 px-6 text-white">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Book List
        </h1>
        <Button
          caption="+ Add Member"
          type="button"
          onClick={() => navigate("/Book/create")}
        />
      </div>

      {bookList.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No Members Found
        </div>
      ) : (



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
      )}
    </div>
  );
}