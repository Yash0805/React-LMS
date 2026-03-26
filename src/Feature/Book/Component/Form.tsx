import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import TextBox from "Shared/Component/Forms/TextBox";
import Button from "Shared/Component/Button/Button";
import { useBookForm } from "./Book.Form";
import { ApiService } from "Service";

interface Category {
    categoryId: number;
    categoryName: string;
}

interface FormProps {
    onSubmit: (data: Master.BookForm) => Promise<void>;
    onLoad?: () => Promise<Partial<Master.BookForm>>
    submitCaption: string;
}

export default function Form({ onLoad, onSubmit, ...props }: FormProps) {
    const { control, get, handleSubmit, submitting } = useBookForm(onLoad);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await ApiService.get<Category[]>("Category");
            setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <div className="flex justify-center">
            <form
                className="w-full max-w-lg bg-slate-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextBox label="Book Name" {...get("bookName")} />
                <TextBox label="Publisher" {...get("publisher")} />
                <TextBox label="Author" {...get("author")} />
                <TextBox label="Price" {...get("price")} />

                <div className="mb-4">
                    <label className="block text-slate-300 text-sm font-medium mb-1">
                        Category
                    </label>

                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field }) => (
                            <select
                                {...field}
                                value={field.value || 0}
                                disabled={submitting}
                                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white"
                            >
                                <option value={0}>Select Category</option>
                                {categories.map((c) => (
                                    <option key={c.categoryId} value={c.categoryId}>
                                        {c.categoryName}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                </div>

                <Button caption={props.submitCaption} disabled={submitting} />
            </form>
        </div>
    );
}