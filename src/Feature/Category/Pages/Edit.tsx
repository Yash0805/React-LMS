import { useNavigate, useParams } from "react-router-dom";
import { useUpdateCategoryMutation } from "../queries";
import Form from "../Component/Form";
import { ApiService } from "Service";
import { useCallback } from "react";


interface EditRouteParams extends Record<string, string>{
    categoryId:string;  
}   

export default function Edit(){
    const {categoryId} = useParams<EditRouteParams>();
    const {mutateAsync} = useUpdateCategoryMutation(parseInt(categoryId!,10))

  const navigate = useNavigate();
    const handleLoad = useCallback(
    async function () {
      const data = await ApiService.get<Master.Category>(
        'Category/' + categoryId
      );
      if (!data) {
        return {
          categoryId: 0,
          categoryName: '',
        };
      }

      return data;
    },
    [categoryId]
  );

  return (
    <div className="mt-10 px-6 text-white">
    <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-white text-transparent bg-clip-text">
          Edit Category
        </h1>

        <button
          onClick={() => navigate("/category/list")}
          className="text-slate-400 hover:text-white text-sm"
        >
          ← Back to List
        </button>
      </div>
    <Form
      onLoad={handleLoad}
      onSubmit={async category => {
        await mutateAsync(category);
      }}
      submitCaption="Update"
    />
    </div>
    
  );
} 