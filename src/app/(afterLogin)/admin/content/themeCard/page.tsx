import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Layout from '@/share/layout/Layout';
import { usePrefetchCardList } from '@/share/query/card/useGetCardList';
import { usePrefetchQuizList } from '@/share/query/quiz/useGetQuizList';
import { prefetchVocaList } from '@/share/query/voca/useGetVocaList';

import CardList from './_components/CardList';
import CardPageInfo from './_components/CardPageInfo';
import CreateCard from './_components/CreateCard';

export default async function Card() {
  const queryClient = new QueryClient();
  await Promise.all([
    usePrefetchCardList(queryClient),
    prefetchVocaList(queryClient, {
      data: { page: 1, page_size: 1000 },
    }),
    usePrefetchQuizList(queryClient, {
      data: { page: 1, page_size: 1000 },
    }),
  ]);
  return (
    <>
      <Layout.Content.Full>
        <CardPageInfo />
      </Layout.Content.Full>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Layout.Content.Full>
          <CardList />
        </Layout.Content.Full>
        <Layout.Content.Full>
          <CreateCard />
        </Layout.Content.Full>
      </HydrationBoundary>
    </>
  );
}
