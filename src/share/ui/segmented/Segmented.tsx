'use client';

import Link from 'next/link';

export interface Segment {
  id: string | number;
  segment: string;
  name: string;
}

const Segment = ({
  segment,
  selected = false,
  controlType = 'route',
  onClick,
}: {
  segment: Segment;
  selected?: boolean;
  controlType: 'route' | 'state';
  onClick?: (segment: Segment) => void;
}) => {
  const handleClick = (segment: Segment) => {
    if (onClick) onClick(segment);
  };

  return controlType === 'route' ? (
    <li className={'list-none'}>
      <Link
        href={segment.segment}
        className={`font-inter text-left text-lg font-bold leading-5 tracking-tighter ${selected ? 'text-black' : 'text-[#999]'}`}
      >
        {segment.name}
      </Link>
    </li>
  ) : (
    <li className={'list-none'}>
      <button
        className={`font-inter text-left text-lg font-bold leading-5 tracking-tighter ${selected ? 'text-black' : 'text-[#999]'}`}
        onClick={() => handleClick(segment)}
      >
        {segment.name}
      </button>
    </li>
  );
};

interface SegmentedProps {
  segmentList: Segment[];
  activeSegment: string;
  controlType: 'route' | 'state';
  onClick?: (segment: Segment) => void;
}

function Segmented({
  segmentList,
  activeSegment,
  controlType = 'route',
  onClick,
}: SegmentedProps) {
  return (
    <div className="inline-flex items-center justify-center gap-[18px]">
      {segmentList.map((segment, i) =>
        i < segmentList.length - 1 ? (
          <>
            <Segment
              key={segment.id}
              segment={segment}
              selected={segment.segment === activeSegment}
              controlType={controlType}
              onClick={onClick}
            />
            <i
              key={'separator' + segment.id}
              className={'h-[13px] border-r-2 border-[#999]'}
            />
          </>
        ) : (
          <Segment
            key={segment.id}
            segment={segment}
            selected={segment.segment === activeSegment}
            controlType={controlType}
            onClick={onClick}
          />
        ),
      )}
    </div>
  );
}

export default Segmented;
