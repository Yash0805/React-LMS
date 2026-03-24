import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from 'Service';
const QUERY_KEY = ['Category'];

export function useCategoryQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.Category[]>('Category');
    },
  });
}


export function useRemoveCategoryMutation() {
  const queryClient = useQueryClient();
  const rs = useMutation({
    mutationFn: (categoryId: number) => ApiService.del('Category/' + categoryId),
    onSuccess: (_, categoryId) => {
      const data = queryClient.getQueryData<Master.Category[]>(QUERY_KEY);
      if (!data) {
        return;
      }
      const newData = data.filter(item => item.categoryId !== categoryId);
      queryClient.setQueryData(QUERY_KEY, newData);
    },
  });

  return rs;
}