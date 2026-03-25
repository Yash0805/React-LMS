import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const schema = Joi.object({
  categoryName: Joi.string().required().max(100).min(1),
});

export function useCategoryForm(onLoad?: () => Promise<Master.Category>) {
  const { control, handleSubmit, formState, register, reset } =
    useForm<Master.CategoryForm>({
      defaultValues: {
        categoryName: "",
      },
      resolver: joiResolver(schema),
    });

  useEffect(() => {
    if (!onLoad) return;

    onLoad().then((data) => {

      reset({
        categoryName: data.categoryName,
      });
    });
  }, [onLoad, reset]);

  return {
    get: (name: keyof Master.CategoryForm) => ({ control, name }),
    register,
    submitting: formState.isSubmitting,
    errors: formState.errors,
    handleSubmit,
  };
}
