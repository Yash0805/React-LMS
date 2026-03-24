import { useNavigate } from "react-router-dom";
import { Loader } from "Shared/Component/Loader/Loader";
import { Grid } from "Shared/Component/Grid/Index";
import Button from "Shared/Component/Button/Button";
import { useRemoveCategoryMutation, useCategoryQuery } from "../queries";

export default function CategoryList() {
  const navigate = useNavigate();

  const { data, isLoading } = useCategoryQuery();
  const { isPending, mutateAsync } = useRemoveCategoryMutation();

  if (isLoading || isPending) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-10 px-6 text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Category List
        </h1>

        <Button
          caption="+ Add Category"
          type="button"
          onClick={() => navigate("/category/create")}
        />
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          No Category Found
        </div>
      ) : (
        <Grid<Master.Category>
          data={data ?? []}
          columns={[
            {
              field: "categoryName",
              header: "Category Name",
            },
            {
              header: "Action",
              actions: [
                {
                  icon: "pi pi-trash",
                  className:" px-3 py-1 rounded",
                  onClick: async (category) => {
                    if (confirm("Are you sure you want to delete?")) {
                      await mutateAsync(category.categoryId);
                    }
                  },
                },
              ],
            },
          ]}
        />
      )}
    </div>
  );
}