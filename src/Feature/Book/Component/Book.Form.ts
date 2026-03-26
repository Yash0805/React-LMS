import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";


const schema = Joi.object({
  bookName: Joi.string().required(),
  publisher: Joi.string().required(),
  author: Joi.string().required(),
  price: Joi.number().required(),
  categoryId: Joi.number().min(1).required().messages({
    "number.base": "Category is required",
    "number.min": "Please select a category",
  }),
});

export function useBookForm(onLoad?: () => Promise<Partial<Master.BookForm>>) {
  const { control, handleSubmit, formState, reset } = useForm<Master.BookForm>({
    resolver: joiResolver(schema),
    defaultValues: {
      bookName: "",
      publisher: "",
      author: "",
      price: 0,
      categoryId: 0,
    },
  });

  useEffect(() => {
    if (!onLoad) return;

    (async () => {
      const data = await onLoad();
      if (data) {
        reset({
          bookName: data.bookName ?? "",
          publisher: data.publisher ?? "",
          author: data.author ?? "",
          price: data.price ?? 0,
          categoryId: data.categoryId ?? 0,
        });
      }
    })();
  }, [onLoad, reset]);

  return {
    control,
    handleSubmit,
    submitting: formState.isSubmitting,
    errors: formState.errors,
    get: (name: keyof Master.BookForm) => ({ control, name }),
  };
}
