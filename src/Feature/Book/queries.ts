import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "Service";

const QUERY_KEY = ["Books"];

export function useBooksQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.Book[]>("Books");
    },
  });
}

export function useRemoveBooksMutation() {
  const queryClient = useQueryClient();
  const rs = useMutation({
    mutationFn: (bookId: number) => ApiService.del("Books/" + bookId),
    onSuccess: (_, bookId) => {
      const data = queryClient.getQueryData<Master.Book[]>(QUERY_KEY);
      if (!data) {
        return;
      }
      const newData = data.filter((item) => item.bookId !== bookId);
      queryClient.setQueryData(QUERY_KEY, newData);
    },
  });

  return rs;
}

export function useUpdateBooksMutation(bookId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (books: Master.BookForm) =>
      await ApiService.put<Master.Book>("Books/" + bookId, books),

    onSuccess: (result) => {
      if (!result) return;

      const existing = queryClient.getQueryData<Master.Book[]>(QUERY_KEY);
      if(!existing){
        return;
      }
      const index = existing.findIndex(item => item.bookId === bookId)
      const first = existing.slice(0,index);
      const next = existing.slice(index+1)
      queryClient.setQueryData(QUERY_KEY,[...first,result,...next]);
    }
  });
}

export function useNewBooksMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (books: Master.BookForm) =>
      await ApiService.post("Books", books),
    onSuccess: (result) => {
      if (!result) {
        return;
      }
      const existing = queryClient.getQueryData<Master.Book[]>(QUERY_KEY);
      if (!existing) {
        return;
      }
      queryClient.setQueryData(QUERY_KEY, [...existing, result]);
    },
  });
}
