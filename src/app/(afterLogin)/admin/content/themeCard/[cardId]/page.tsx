import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Layout from '@/share/layout/Layout';
import { usePrefetchCard } from '@/share/query/card/useGetCard';
import { usePrefetchCardList } from '@/share/query/card/useGetCardList';
import { usePrefetchQuizList } from '@/share/query/quiz/useGetQuizList';
import { prefetchVocaList } from '@/share/query/voca/useGetVocaList';

import CardList from '../_components/CardList';
import CardPageInfo from '../_components/CardPageInfo';
import UpdateCard from '../_components/UpdateCard';

export default async function Card({ params }: { params: { cardId: string } }) {
  const queryClient = new QueryClient();
  await Promise.all([
    usePrefetchCardList(queryClient),
    prefetchVocaList(queryClient, {
      data: { page: 1, page_size: 1000 },
    }),
    usePrefetchQuizList(queryClient, {
      data: { page: 1, page_size: 1000 },
    }),
    usePrefetchCard(queryClient, {
      id: { cardId: Number(params.cardId) },
      data: null,
    }),
  ]);

  return (
    <>
      <Layout.Content.Full>
        <CardPageInfo />
      </Layout.Content.Full>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Layout.Content.Full>
          <CardList currentCardId={Number(params.cardId)} />
        </Layout.Content.Full>
        <Layout.Content.Full>
          <UpdateCard currentCardId={Number(params.cardId)} />
        </Layout.Content.Full>
      </HydrationBoundary>
    </>
  );
}
