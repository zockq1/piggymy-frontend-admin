'use client';

import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useState } from 'react';

import feedbackIcon from '/public/img/Icon/Feedback.svg';
import closeIcon from '/public/img/Icon/Name=Close-Outlined@3x.png';
import Button from '@/share/ui/button/Button';
import Title from '@/share/ui/title/Title';

interface CardSettingProps {
  onConfirm?: () => void;
  onCancel?: () => void;
}

function UserFeedbackInfo({ info }: { info: { title: string; data: string } }) {
  return (
    <div className={'flex gap-3'}>
      <span className={'font-bold'}>{info.title}</span>
      <span className={'italic'}>{info.data}</span>
    </div>
  );
}

function UserFeedbackModal({ onConfirm, onCancel }: CardSettingProps) {
  const [feedback] = useState({
    id: 0,
    feedback:
      '많은 도움이 되었어요.많은 도움이 되었어요.많은 도움이 되었어요. 많은 도움이 되었어요.많은 도움이 되었어요.',
    user: {
      name: 'OOO',
      nickname: 'OOO',
      isWithdraw: false,
    },
    createdAt: dayjs('2023-11-01'),
  });

  const infoList = [
    { title: '회원명', data: feedback.user.name },
    { title: '닉네임', data: feedback.user.nickname },
    { title: '작성일', data: feedback.createdAt.format('YYYY-MM-DD') },
    { title: '탈퇴여부', data: feedback.user.isWithdraw ? 'Y' : 'N' },
  ];

  return (
    <div
      className={
        'relative flex w-[620px] flex-col items-start justify-center gap-4 text-center'
      }
    >
      <Image
        src={closeIcon}
        alt="feedbackIcon"
        width={40}
        height={40}
        className={'absolute right-[-16px] top-[-16px] cursor-pointer'}
        onClick={onCancel}
      />
      <Title>회원 의견 상세</Title>
      <hr className={'w-full border-[#b5b5b5]'} />
      <div className={'flex w-full justify-between'}>
        {infoList.map((info) => (
          <UserFeedbackInfo key={info.title} info={info} />
        ))}
      </div>
      <div
        className={
          'flex w-full items-start gap-3 rounded-[8px] bg-gray-6 px-[30px] py-[22px]'
        }
      >
        <div className="flex w-[55px] flex-col items-center justify-center text-xs">
          <Image src={feedbackIcon} alt="feedbackIcon" width={40} height={40} />
          <div className="mt-2 text-gray-3">도움됨</div>
        </div>
        <Form.Item label={null} name="textArea" className={'h-full w-full'}>
          <TextArea rows={10} placeholder={'많은 도움이 되었어요.'} />
        </Form.Item>
      </div>
      <ul className={'flex items-center justify-between'}></ul>
      {onConfirm && (
        <div className={'flex w-full justify-center'}>
          <Button color={'blue'} size={'large'} onClick={onConfirm}>
            확인
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserFeedbackModal;
