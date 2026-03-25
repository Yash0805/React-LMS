import { useNavigate } from "react-router";
import Form from "../Component/Form";
import { useNewCategoryMutation } from "../queries";



export default function Create() {
 const { mutateAsync } = useNewCategoryMutation();

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
 
     <Form
      submitCaption="Create"
      onSubmit={async category => {
        await mutateAsync(category);
      }}
    />

    </div>
  );
}