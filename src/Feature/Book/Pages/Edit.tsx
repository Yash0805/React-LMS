import { useParams, useNavigate } from "react-router-dom";
import Form from "../Component/Form";
import { useUpdateBooksMutation } from "../queries";
import { useCallback } from "react";
import { ApiService } from "Service";



interface EditRouteParams extends Record<string, string> {
    bookId: string;
}

export default function Edit() {
    const { bookId } = useParams<EditRouteParams>();
    const navigate = useNavigate();
    const id = parseInt(bookId!, 10);

    const { mutateAsync } = useUpdateBooksMutation(id);

    const handleLoad = useCallback(async () => {
        const data = await ApiService.get<Master.Book>("Books/" + bookId);

        if (!data) return {
            bookName: "",
            publisher: "",
            author: "",
            price: 0,
            CategoryId: 0,
        };

        return data;
    }, [bookId]);

    const mapFormToApi = (book: Master.BookForm) => ({
        bookId: id,
        bookName: book.bookName,
        publisher: book.publisher,
        author: book.author,
        price: book.price,
        CategoryId: book.categoryId,
    });

    return (
        <div className="mt-10 px-6 text-white">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold">Edit Book</h1>
                <button
                    onClick={() => navigate("/Book/list")}
                    className="text-slate-400 hover:text-white text-sm"
                >
                    ← Back to List
                </button>
            </div>

            <Form
                onLoad={handleLoad}
                onSubmit={async (book) => {
                    await mutateAsync(mapFormToApi(book));
                    navigate("/Book/list");
                }}
                submitCaption="Update"
            />
        </div>
    );
}