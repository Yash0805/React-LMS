import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ApiService } from "Service";
import { Loader } from "Shared/Component/Loader/Loader";
import { Grid } from "Shared/Component/Grid/Index";
import Button from "Shared/Component/Button/Button";

interface Category {
  categoryId: number;
  categoryName: string;
}

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.get<Category[]>("Category")
      .then((data) => setCategoryList(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader />
      </div>
    );
  }

  if (categoryList.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        No Category Found
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

      <Grid<Category>
        data={categoryList}
        rowKey={(c) => c.categoryId}
        columns={[
          {
            field: "categoryName",
            header: "Category Name",
          },
        ]}
      />

    </div>
  );
}