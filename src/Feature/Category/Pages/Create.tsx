import { useState } from "react";
import { useNavigate } from "react-router";
import { ApiService } from "Service";
import Button from "Shared/Component/Button/Button";
import TextBox from "Shared/Component/Forms/TextBox";


export default function Create() {
  const [categoryName, setCategoryName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="mt-10 px-6 text-white">

      <div className="flex justify-start mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Create Category
        </h1>
      </div>

      <form
        className="max-w-md bg-slate-900 p-6 rounded-2xl shadow-md"
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            setSubmitting(true);
            await ApiService.post("Category", { categoryName });
            navigate("../list");
          } catch (ex) {
            alert(ex);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <TextBox
          label="Category Name"
          name="categoryName"
          value={categoryName}
          onChange={setCategoryName}
          disabled={submitting}
        />

        <div className="mt-4">
          <Button caption="Create" disabled={submitting} />
        </div>
      </form>
    </div>
  );
}