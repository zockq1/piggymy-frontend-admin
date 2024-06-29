'use client';

import { Form, Pagination } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import React, { ChangeEvent, MouseEventHandler, useState } from 'react';

import search from '/public/img/Icon/search.png';
import Text from '@/share/form/item/Text';
import NoticeModal from '@/share/modal/NoticeModal';
import { useModal } from '@/share/modal/useModal';
import { useDeleteQuizzes } from '@/share/query/quiz/useDeleteQuizzes';
import { useGetQuizList } from '@/share/query/quiz/useGetQuizList';
import { usePatchQuizzesIsUse } from '@/share/query/quiz/useUpdateQuiz';
import Button from '@/share/ui/button/Button';
import IconButton from '@/share/ui/button/IconButton';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Dropdown from '@/share/ui/dropdown/Dropdown';
import Add from '@/share/ui/list-item/Add';
import Card from '@/share/ui/list-item/Card';
import Title from '@/share/ui/title/Title';
import { buildQueryString } from '@/share/utils/query';
import { QuizModel } from '@/type/quizType';

interface FormExampleValue {
  range: Dayjs[];
  useYn: boolean;
  keyword: string;
}

function QuizSearchList() {
  const params = useParams();
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const { openModal, closeModal } = useModal();

  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');
  const isUse = searchParams.get('is_use');
  const keyword = searchParams.get('keyword');

  const [selectQuizList, setSelectQuizList] = useState<QuizModel[]>([]);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState<'CREATED' | 'MODIFIED'>('CREATED');

  const selectQuizIds = selectQuizList.map((quiz) => quiz.id);
  const selectQuizIsUseValues = selectQuizList.map((quiz) => quiz.isUse);

  const { data } = useGetQuizList({
    data: {
      page,
      page_size: 10,
      start_date: startDate!,
      end_date: endDate!,
      is_use: isUse,
      search_keyword: keyword!,
      sort_type: sortType,
    },
  });
  const { mutate: deleteQuizzes } = useDeleteQuizzes();
  const { mutate: patchQuizzes } = usePatchQuizzesIsUse();

  const totalCount = data?.data.totalCount;
  const quizList = data?.data.list ?? [];

  const handleFinish = (formValue: FormExampleValue) => {
    const params = {
      start_date: startDate ?? '',
      end_date: endDate ?? '',
      is_use: isUse ?? '',
      keyword: formValue.keyword ?? '',
    };

    if (buildQueryString(params)) {
      router.replace(`${path}?${buildQueryString(params)}`);
    } else {
      router.replace(`${path}`);
    }
  };

  const handleIsUseChange: MouseEventHandler = (e) => {
    e.preventDefault();

    if (
      selectQuizIsUseValues.every((value) => value) ||
      selectQuizIsUseValues.every((value) => !value)
    ) {
      openModal(
        'isUseChange',
        <NoticeModal
          message={`체크된 항목 ${selectQuizList.length}건이 있습니다.\n모두 ‘${selectQuizIsUseValues.every((value) => value) ? '미사용' : '사용'}'으로 변경하시겠습니까??`}
          onConfirm={() => {
            patchQuizzes({
              data: {
                quizIds: selectQuizIds,
                isUse: !selectQuizIsUseValues.every((value) => value),
              },
            });
            setSelectQuizList([]);
            closeModal('isUseChange');
          }}
          onCancel={() => {
            closeModal('isUseChange');
          }}
        />,
        { clickableOverlay: false },
      );
    } else {
      openModal(
        'isUseChange',
        <NoticeModal
          type={'question'}
          message={'사용여부가 같은 항목들끼리만 체크해주세요.'}
          onConfirm={() => {
            closeModal('isUseChange');
          }}
        />,
        { clickableOverlay: true },
      );
    }
  };

  const handleDeleteQuizzes = () => {
    deleteQuizzes({ data: { quizIds: selectQuizIds } });
    setSelectQuizList([]);
  };

  const toggleCheck = (quiz: QuizModel) => {
    const ids = new Set(selectQuizIds);
    if (ids.has(+quiz.id)) {
      setSelectQuizList((prev) => prev.filter((item) => item.id !== quiz.id));
    } else {
      setSelectQuizList((prev) => [...prev, quiz]);
    }
  };

  return (
    <ContentBox className={'flex h-full items-start'}>
      <Form
        className={'flex h-full w-full flex-col gap-4'}
        onFinish={handleFinish}
      >
        <div className={'flex w-full items-start justify-between gap-x-3'}>
          <Text
            label={''}
            placeholder={'검색'}
            name={'keyword'}
            className={'w-full'}
          />
          <IconButton type={'submit'}>
            <Image src={search} alt="검색" width={18} height={18} />
          </IconButton>
        </div>
        <div className={'flex w-full items-start justify-between'}>
          <Title>
            전체 퀴즈 <Title.H>{totalCount}</Title.H>건
          </Title>
          <Dropdown
            options={[
              { inputVal: 'CREATED', summary: '등록일' },
              { inputVal: 'MODIFIED', summary: '업데이트순' },
            ]}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setSortType(e.target.value as 'CREATED' | 'MODIFIED');
            }}
          />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            size="small"
            color="blue"
            onClick={handleIsUseChange}
            disabled={selectQuizIds.length < 1}
          >
            사용여부 일괄변경
          </Button>
          <Button
            type="button"
            size="small"
            color="blue"
            onClick={handleDeleteQuizzes}
          >
            삭제
          </Button>
        </div>
        <div className={'relative h-full'}>
          <ul
            id={'list'}
            className={
              'flex min-h-[calc(94px*11)] flex-col gap-4 overflow-y-auto pb-20'
            }
          >
            {quizList?.map((quiz: QuizModel) => {
              return (
                <li key={quiz.id} className={'list-none'}>
                  <Card
                    id={quiz.id.toString()}
                    koreanTitle={quiz.title}
                    createdDate={dayjs(quiz.createdDate)}
                    isActive={quiz.isUse}
                    isChecked={selectQuizIds.includes(quiz.id)}
                    route={`/admin/quiz/quizManagement/${quiz.id}`}
                    isSelected={+params.quizId === quiz.id}
                    onChangeChecked={() => toggleCheck(quiz)}
                  />
                </li>
              );
            })}
          </ul>
          <div className={'absolute bottom-0'}>
            <Add
              type={'card'}
              isSelected={false}
              route={'/admin/quiz/quizManagement'}
            />
          </div>
        </div>
        <div className={'flex w-full items-center justify-center'}>
          <Pagination
            current={page}
            showLessItems
            showSizeChanger={false}
            total={totalCount}
            onChange={(page) => {
              setPage(page);
            }}
          />
        </div>
      </Form>
    </ContentBox>
  );
}

export default QuizSearchList;
