import Link from 'next/link';

import Layout from '@/share/layout/Layout';
import Sidebar from '@/share/layout/sidebar/Sidebar';
import { contentList } from '@/share/route/routes';

export default async function LinkPage() {
  return (
    <Layout>
      <div
        style={{
          gridArea: 'header',
        }}
      >
        <Link href="/admin">홈</Link>&nbsp;&nbsp;
        <Link href="/admin/content/greetingMessage">콘텐츠</Link>&nbsp;&nbsp;
        <Link href="/admin/quiz/termManagement">용어/퀴즈</Link>&nbsp;&nbsp;
        <Link href="/admin/setting/termsOfUse">설정</Link>&nbsp;&nbsp;
        <Link href="/admin/user/basicInfo">회원</Link>&nbsp;&nbsp;
        <Link href="/admin/management/basicInfo">관리자</Link>
      </div>
      <Layout.LeftSideMenu>
        <Sidebar sidebarList={contentList} />
      </Layout.LeftSideMenu>
      <Layout.Content>
        <Layout.Content.Full>
          <div className="h-[100px] bg-primary">라우팅 타이틀</div>
        </Layout.Content.Full>
        <Layout.Content.Full>
          <div className="h-[200px] bg-secondary">링크 검색</div>
        </Layout.Content.Full>
        <Layout.Content.Full>
          <div className="h-[500px] bg-primary">링크 목록</div>
        </Layout.Content.Full>
      </Layout.Content>
    </Layout>
  );
}
