import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "Service";

const QUERY_KEY = ["BookIssue"];
export function useBookIssueQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.BookIssue[]>("BookIssue");
    },
  });
}

export function useRemoveBookIssueMutation() {
  const queryClient = useQueryClient();
  const rs = useMutation({
    mutationFn: (issueId: number) => ApiService.del("BookIssue/" + issueId),
    onSuccess: (_, issueId) => {
      const data = queryClient.getQueryData<Master.BookIssue[]>(QUERY_KEY);
      if (!data) {
        return;
      }
      const newData = data.filter((item) => item.issueId !== issueId);
      queryClient.setQueryData(QUERY_KEY, newData);
    },
  });

  return rs;
}

export function useUpdateBookIssueMutation(issueId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookissue: Master.BookIssueForm) =>
      await ApiService.put<Master.BookIssue>("BookIssue/" + issueId, bookissue),

    onSuccess: (result) => {
      if (!result) {
        return;
      }

      const existing = queryClient.getQueryData<Master.BookIssue[]>(QUERY_KEY);
      if(!existing){
        return;
      }
      const index = existing.findIndex(item => item.issueId === issueId)
      const first = existing.slice(0,index);
      const next = existing.slice(index+1)
      queryClient.setQueryData(QUERY_KEY,[...first,result,...next]);
    },
  });
}

export function useNewBookIssueMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookissue: Master.BookIssueForm) =>
      await ApiService.post("BookIssue", bookissue),
    onSuccess: (result) => {
      if (!result) {
        return;
      }
      const existing = queryClient.getQueryData<Master.BookIssue[]>(QUERY_KEY);
      if (!existing) {
        return;
      }
      queryClient.setQueryData(QUERY_KEY, [...existing, result]);
    },
  });
}
export function useReturnBookIssueMutation(issueId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      await ApiService.patch<Master.BookIssue>(
        "BookIssue/" + issueId,
        {}
      ),

    onSuccess: (result) => {
      if (!result) return;

      const existing = queryClient.getQueryData<Master.BookIssue[]>(QUERY_KEY);
      if(!existing){
        return;
      }
      const index = existing.findIndex(item => item.issueId === issueId)
      const first = existing.slice(0,index);
      const next = existing.slice(index+1)
      queryClient.setQueryData(QUERY_KEY,[...first,result,...next]);
    },
  });
}

export function useRenewBookIssueMutation(issueId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      await ApiService.patch<Master.BookIssue>(
        "BookIssue/Renewed/" + issueId,
        {}
      ),

    onSuccess: (result) => {
      if (!result) return;

      const existing = queryClient.getQueryData<Master.BookIssue[]>(QUERY_KEY);
      if(!existing){
        return;
      }
      const index = existing.findIndex(item => item.issueId === issueId)
      const first = existing.slice(0,index);
      const next = existing.slice(index+1)
      queryClient.setQueryData(QUERY_KEY,[...first,result,...next]);
    },
  });
}