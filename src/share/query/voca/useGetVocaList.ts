import { QueryClient, useQuery } from '@tanstack/react-query';

import { Request, Response } from '@/type/apiType';

import axiosInstance from '../axios';

interface GetVocaListRequestQuery {
  page?: number;
  page_size?: number;
  sort_type?: 'CREATED' | 'MODIFIED';
  search_keyword?: string;
  filter?: string;
  start_date?: string;
  end_date?: string;
  is_use?: boolean;
}

interface GetVocaListResponse {
  totalCount: number;
  list: {
    id: number;
    koreanTitle: string;
    englishTitle: string;
    isUse: boolean;
    createdDate: string;
    modifiedDate: string;
  }[];
}

export const getVocaList = async (query?: Request<GetVocaListRequestQuery>) => {
  const response = await axiosInstance.get<Response<GetVocaListResponse>>(
    `/api/vocas`,
    { params: query?.data },
  );

  return response.data;
};

export function useGetVocaList(data?: Request<GetVocaListRequestQuery>) {
  return useQuery({
    queryKey: ['vocas', data?.data],
    queryFn: () => getVocaList(data),
  });
}

export function usePrefetchVocaList(
  queryClient: QueryClient,
  data?: Request<GetVocaListRequestQuery>,
) {
  return queryClient.prefetchQuery({
    queryKey: ['vocas', data?.data],
    queryFn: () => getVocaList(data),
  });
}