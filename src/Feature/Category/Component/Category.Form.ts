import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';

const schema = Joi.object({
  categoryName: Joi.string().required().max(100).min(1),
});

export function useCategoryForm(onLoad?: () => Promise<Master.Category>) {
  const { control, handleSubmit, formState } = useForm<Master.CategoryForm>({
    defaultValues: onLoad,
    resolver: joiResolver(schema),
  });

  return {
    get: (name: keyof Master.CategoryForm) => ({ control, name }),
    submitting: formState.isSubmitting,
    errors: formState.errors,
    handleSubmit,
  };
}