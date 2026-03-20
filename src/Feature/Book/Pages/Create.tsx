import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from "Service";
import Button from "Shared/Component/Button/Button";
import TextBox from "Shared/Component/Forms/TextBox";
import { Dropdown } from "primereact/dropdown";

type Category = {
    categoryId: number;
    categoryName: string;
};

export default function Create() {
    const [bookName, setBookName] = useState("");
    const [publisher, setPublisher] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        ApiService.get<Category[]>("Category")
            .then((res) => {
                setCategories(res);
            })
            .catch(() => {
                setCategories([]);
            });
    }, []);

    return (
        <div className="mt-10 px-6 text-white">

            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    Create Book
                </h1>

                <button
                    onClick={() => navigate("/book/list")}
                    className="text-slate-400 hover:text-white text-sm"
                >
                    ← Back to List
                </button>
            </div>

            <div className="flex justify-center">
                <form
                    className="w-full max-w-lg bg-slate-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition"
                    onSubmit={async (e) => {
                        e.preventDefault();

                        try {
                            setSubmitting(true);

                            await ApiService.post("Books", {
                                bookName,
                                publisher,
                                author,
                                price: Number(price),
                                categoryId: categoryId,
                            });

                            navigate("/book/list");

                        } catch (ex) {
                            alert(ex);
                        }
                        finally {
                            setSubmitting(false);
                        }
                    }}
                >

                    <TextBox
                        label="Book Name"
                        name="bookName"
                        placeholder="Enter book name"
                        value={bookName}
                        onChange={setBookName}
                        disabled={submitting}
                    />

                    <TextBox
                        label="Publisher"
                        name="publisher"
                        placeholder="Enter publisher"
                        value={publisher}
                        onChange={setPublisher}
                        disabled={submitting}
                    />

                    <TextBox
                        label="Author"
                        name="author"
                        placeholder="Enter author"
                        value={author}
                        onChange={setAuthor}
                        disabled={submitting}
                    />

                    <TextBox
                        label="Price"
                        name="price"
                        placeholder="Enter price"
                        value={price}
                        onChange={setPrice}
                        disabled={submitting}
                    />

                    <div className="mb-4">
                        <label className="block text-slate-300 text-sm font-medium mb-2">
                            Category
                        </label>

                        <Dropdown
                            value={categoryId}
                            options={categories}
                            onChange={(e) => setCategoryId(e.value)}
                            optionLabel="categoryName"
                            optionValue="categoryId"
                            placeholder="Select Category"
                            className="w-full"
                            disabled={submitting}
                            filter
                            showClear
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            caption={submitting ? "Creating..." : "Create"}
                            disabled={submitting}
                            type="submit"
                        />
                    </div>

                </form>
            </div>
        </div>
    );
}