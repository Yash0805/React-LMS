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

      queryClient.setQueryData<Master.Book[]>(["Books"], (old = []) =>
        old.map((item) => (item.bookId === result.bookId ? result : item)),
      );
    },
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
