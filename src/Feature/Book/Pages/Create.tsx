import { useNavigate } from "react-router-dom";
import Form from "../Component/Form";
import { useNewBooksMutation } from "../queries";


export default function Create() {
    const { mutateAsync } = useNewBooksMutation();
    const navigate = useNavigate();

    const handleSubmit = async (books: Master.BookForm) => {
        const payload = {
            bookName: books.bookName,
            publisher: books.publisher,
            author: books.author,
            price: books.price,
            CategoryId: books.categoryId,
        };

        await mutateAsync(payload);
        navigate("/Book/list");
    };

    return (
        <div className="mt-10 px-6 text-white">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold bg-white text-transparent bg-clip-text">
                    Create Books
                </h1>

                <button
                    onClick={() => navigate("/Book/list")}
                    className="text-slate-400 hover:text-white text-sm"
                >
                    ← Back to List
                </button>
            </div>

            <Form submitCaption="Create" onSubmit={handleSubmit} />
        </div>
    );
}