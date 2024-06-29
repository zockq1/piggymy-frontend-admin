import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Layout from '@/share/layout/Layout';
import { usePrefetchBannerList } from '@/share/query/banner/useGetBannerList';
import { prefetchVocaList } from '@/share/query/voca/useGetVocaList';

import BannerList from './_components/BannerList';
import BannerPageInfo from './_components/BannerPageInfo';
import CreateBanner from './_components/CreateBanner';

export default async function Banner() {
  const queryClient = new QueryClient();
  await Promise.all([
    usePrefetchBannerList(queryClient),
    prefetchVocaList(queryClient, {
      data: { page: 1, page_size: 1000 },
    }),
  ]);
  return (
    <>
      <Layout.Content.Full>
        <BannerPageInfo />
      </Layout.Content.Full>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Layout.Content.Full>
          <BannerList />
        </Layout.Content.Full>
        <Layout.Content.Full>
          <CreateBanner />
        </Layout.Content.Full>
      </HydrationBoundary>
    </>
  );
}
