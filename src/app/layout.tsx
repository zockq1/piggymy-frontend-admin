import './globals.css';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import React from 'react';

import ReactQueryProvider from '@/app/_component/ReactQueryProvider';
import ModalProvider from '@/share/modal/ModalProvider';

import CheckAuth from './_component/CheckAuth';
import RecoilRootProvider from './_component/RecoilRootProvider';

const notoSansKr = Noto_Sans_KR({
  preload: false,
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <RecoilRootProvider>
          <ReactQueryProvider>
            <CheckAuth />
            <ConfigProvider
              theme={{
                token: { colorLink: 'inherit' },
                components: {
                  Table: {
                    headerBg: '#F4F5F8',
                    headerBorderRadius: 0,
                    borderColor: '#CDD1D9',
                  },
                },
              }}
            >
              <AntdRegistry>{children}</AntdRegistry>
            </ConfigProvider>
          </ReactQueryProvider>
          <ModalProvider />
        </RecoilRootProvider>
      </body>
    </html>
  );
}
