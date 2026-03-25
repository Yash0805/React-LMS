import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "Service";
const QUERY_KEY = ["Category"];

export function useCategoryQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.Category[]>("Category");
    },
  });
}

export function useRemoveCategoryMutation() {
  const queryClient = useQueryClient();
  const rs = useMutation({
    mutationFn: (categoryId: number) =>
      ApiService.del("Category/" + categoryId),
    onSuccess: (_, categoryId) => {
      const data = queryClient.getQueryData<Master.Category[]>(QUERY_KEY);
      if (!data) {
        return;
      }
      const newData = data.filter((item) => item.categoryId !== categoryId);
      queryClient.setQueryData(QUERY_KEY, newData);
    },
  });

  return rs;
}

export function useUpdateCategoryMutation(categoryId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Master.CategoryForm) =>
      await ApiService.put<Master.Category[]>(
        "Category/" + categoryId,
        category,
      ),
    onSuccess: (result) => {
      if (!result) {
        return;
      }
      const existing = queryClient.getQueryData<Master.Category[]>(QUERY_KEY);
      if (!existing) {
        return;
      }
      const index = existing.findIndex(
        (item) => item.categoryId === categoryId,
      );
      const first = existing.slice(0, index);
      const next = existing.slice(index + 1);
      queryClient.setQueryData(QUERY_KEY, [...first, result, ...next]);
    },
  });
}

export function useNewCategoryMutation(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Master.CategoryForm) =>
      await ApiService.post("Category", category),
     onSuccess: (result) => {
      if (!result) {
        return;
      }
      const existing = queryClient.getQueryData<Master.Category[]>(QUERY_KEY);
      if (!existing) {
        return;
      }
      queryClient.setQueryData(QUERY_KEY,[...existing,result]);
    },
  });
}