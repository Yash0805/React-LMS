import {useQuery } from '@tanstack/react-query';
import { ApiService } from 'Service';
const QUERY_KEY = ['Category'];

export function useStatesQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.Category[]>('Category');
    },
  });
}