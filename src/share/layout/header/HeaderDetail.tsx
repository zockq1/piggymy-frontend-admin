import { useEffect, useRef, useState } from 'react';

import HeaderList from '@/share/layout/header/HeaderList';
import {
  contentList,
  managerList,
  settingList,
  userList,
  vocaQuizList,
} from '@/share/layout/header/headerListData';

export default function HeaderDetail() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log(isDropdownOpen);
  }, [isDropdownOpen]);

  return (
    <>
      <button onClick={toggleDropdown}>전체 보기</button>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-40 top-20 flex h-auto w-10/12 flex-row justify-center bg-white p-3 pb-6 text-sm"
        >
          <HeaderList items={contentList} title="콘텐츠" />
          <HeaderList items={vocaQuizList} title="용어/퀴즈" />
          <HeaderList items={settingList} title="설정" />
          <HeaderList items={userList} title="회원" />
          <HeaderList items={managerList} title="관리자" />
        </div>
      )}
    </>
  );
}