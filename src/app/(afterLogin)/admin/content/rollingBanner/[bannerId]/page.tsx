import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Layout from '@/share/layout/Layout';
import { usePrefetchBanner } from '@/share/query/banner/useGetBanner';
import { usePrefetchBannerList } from '@/share/query/banner/useGetBannerList';
import { prefetchVocaList } from '@/share/query/voca/useGetVocaList';

import BannerList from '../_components/BannerList';
import BannerPageInfo from '../_components/BannerPageInfo';
import UpdateBanner from '../_components/UpdateBanner';

export default async function Banner({
  params,
}: {
  params: { bannerId: string };
}) {
  const queryClient = new QueryClient();
  await Promise.all([
    usePrefetchBannerList(queryClient),
    prefetchVocaList(queryClient, {
      data: { page: 1, page_size: 1000 },
    }),
    usePrefetchBanner(queryClient, {
      id: { bannerId: Number(params.bannerId) },
      data: null,
    }),
  ]);

  return (
    <>
      <Layout.Content.Full>
        <BannerPageInfo />
      </Layout.Content.Full>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Layout.Content.Full>
          <BannerList currentBannerId={Number(params.bannerId)} />
        </Layout.Content.Full>
        <Layout.Content.Full>
          <UpdateBanner currentBannerId={Number(params.bannerId)} />
        </Layout.Content.Full>
      </HydrationBoundary>
    </>
  );
}
