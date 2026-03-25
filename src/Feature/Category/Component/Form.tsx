import { useNavigate } from "react-router-dom";

import TextBox from "Shared/Component/Forms/TextBox";
import { useCategoryForm } from "./Category.Form";
import Button from "Shared/Component/Button/Button";

interface FromProps {
    onSubmit: (p: Master.CategoryForm) => Promise<void>
    onLoad?: () => Promise<Master.Category>;
    submitCaption: string;
}
export default function Form({ onLoad, onSubmit, ...props }: FromProps) {
    const { get, handleSubmit, submitting } = useCategoryForm(onLoad);
    const navigate = useNavigate();

    return (
        <div className="flex justify-center">
            <form
                className="w-full max-w-lg bg-slate-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
                onSubmit={handleSubmit(async data => {
                    await onSubmit(data);
                    navigate('../list');
                })}
            >
                <TextBox label="Category Name" {...get('categoryName')} />

                <Button caption={props.submitCaption} disabled={submitting} />
            </form>
        </div >
    );
}