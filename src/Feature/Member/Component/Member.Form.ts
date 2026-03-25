import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const schema = Joi.object({
  memberName: Joi.string().required(),
  memberType: Joi.string().required(),
});

export function useMemberForm(onLoad?: () => Promise<Master.Member>) {
  const {
    control,
    handleSubmit,
    formState,
    register,
    reset,
  } = useForm<Master.MemberForm>({
    defaultValues: {
      memberName: '',
      memberType: '',
    },
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (!onLoad) return;

    onLoad().then(data => {
      reset({
        memberName: data.memberName,
        memberType: data.memberType,
      });
    });
  }, [onLoad, reset]);

  return {
    get: (name: keyof Master.MemberForm) => ({ control, name }),
    register, 
    submitting: formState.isSubmitting,
    errors: formState.errors,
    handleSubmit,
  };
}