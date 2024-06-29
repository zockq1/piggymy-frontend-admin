import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

import CardFilter from '@/app/(afterLogin)/admin/quiz/_components/CardFilter';
import PageInfo from '@/app/(afterLogin)/admin/quiz/_components/PageInfo';
import CreateVoca from '@/app/(afterLogin)/admin/quiz/vocaManagement/_components/CreateVoca';
import VocaSearchList from '@/app/(afterLogin)/admin/quiz/vocaManagement/_components/VocaSearchList';
import Layout from '@/share/layout/Layout';
import { prefetchVocaList } from '@/share/query/voca/useGetVocaList';

export default async function VocaManagement({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const queryClient = new QueryClient();

  const params = {
    start_date: searchParams['start_date'],
    end_date: searchParams['end_date'],
    is_use: searchParams['is_use'],
    search_keyword: searchParams['search_keyword'],
  };

  await Promise.all([
    prefetchVocaList(queryClient, {
      data: {
        page: 1,
        page_size: 10,
        sort_type: 'CREATED',
        ...params,
      },
    }),
  ]);

  return (
    <>
      <Layout.Content.Full>
        <PageInfo
          title={'용어카드 관리'}
          path={['용어 퀴즈', '용어카드 관리']}
        />
      </Layout.Content.Full>
      <Layout.Content.Full>
        <CardFilter />
      </Layout.Content.Full>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Layout.Content.Left>
          <VocaSearchList searchParams={params} />
        </Layout.Content.Left>
      </HydrationBoundary>
      <Layout.Content.Right>
        <CreateVoca />
      </Layout.Content.Right>
    </>
  );
}
