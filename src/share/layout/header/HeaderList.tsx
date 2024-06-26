import Link from 'next/link';

import { HeaderType } from '@/type/routeType';

interface HeaderListProps {
  items: HeaderType[];
  title: string;
}

export default function HeaderList({ items, title }: HeaderListProps) {
  return (
    <ul className="h-full w-1/6 pl-2 pr-2">
      <li className="bottom-1 border-b-2 border-black pb-1.5 text-center text-lg font-bold">
        {title}
      </li>
      {items.map((item: HeaderType, index: number) => (
        <li
          key={index}
          className="border-b-[1.2px] border-[#ccc] pb-2 pl-2 pt-2 hover:text-blue-5"
        >
          <Link href={item.route} className="hover:text-blue-500">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
