import { useState } from "react";
import { useNavigate } from "react-router";
import { ApiService } from "Service";
import Button from "Shared/Component/Button/Button";


export default function Create() {
  const [categoryName, setCategoryName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="mt-10 px-6 text-white">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Create Category
        </h1>

        <button
          onClick={() => navigate("/category/list")}
          className="text-slate-400 hover:text-white text-sm"
        >
          ← Back to List
        </button>
      </div>

      <div className="flex justify-center">
        <form
          className="w-full max-w-lg bg-slate-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          onSubmit={async (e) => {
            e.preventDefault();

            if (!categoryName.trim()) {
              alert("Category Name is required");
              return;
            }

            try {
              setSubmitting(true);
              await ApiService.post("Category", { categoryName });
              navigate("/category/list");
            } catch (ex) {
              alert(ex);
            } finally {
              setSubmitting(false);
            }
          }}
        >

          <div className="mb-4">
            <label className="block text-slate-300 text-sm font-medium mb-1">
              Category Name
            </label>

            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              disabled={submitting}
              placeholder="Enter category name"
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <Button caption="Create" disabled={submitting} />
          </div>
        </form>
      </div>
    </div>
  );
}