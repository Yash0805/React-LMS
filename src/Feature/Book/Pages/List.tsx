import { useNavigate } from "react-router-dom";
import { useBooksQuery, useRemoveBooksMutation } from "../queries";
import Button from "Shared/Component/Button/Button";
import { Grid } from "Shared/Component/Grid/Index";
import { Loader } from "Shared/Component/Loader/Loader";

export default function BookList() {
  const navigate = useNavigate();
  const { data, isLoading } = useBooksQuery();
  const { isPending: isDeleting, mutateAsync: deleteBooks, } = useRemoveBooksMutation();

  if (isLoading || isDeleting) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    )
  }

  return (
    <div className="mt-10 px-6 text-white">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Book List
        </h1>

        <Button
          caption="+ Add Book"
          type="button"
          onClick={() => navigate("/Book/create")}
        />
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No Books Found
        </div>
      ) : (
        <Grid<Master.Book>
          data={data ?? []}
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
            {
              header: "Action",
              actions: [
                {
                  icon: "pi pi-pencil",
                  className: "px-3 py-1 rounded",
                  onClick: (books) => {
                    navigate(`/Book/edit/${books.bookId}`);
                  },
                },
                {
                  icon: "pi pi-trash",
                  className: "px-3 py-1 rounded",
                  onClick: async (books) => {
                    if (confirm("Are you sure you want to delete?")) {
                      await deleteBooks(books.bookId);
                    }
                  }
                }
              ]
            }

          ]}
        />
      )}
    </div>
  );
}