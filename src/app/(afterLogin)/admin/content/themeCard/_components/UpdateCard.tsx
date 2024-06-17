'use client';

import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';

import { useDeleteCard } from '@/share/query/card/useDeleteCard';
import { useGetCard } from '@/share/query/card/useGetCard';
import { useUpdateCard } from '@/share/query/card/useUpdateCard';
import { CardFormValue } from '@/type/cardType';

import CardForm from './CardForm';

interface UpdateCardProps {
  currentCardId: number;
}

export default function UpdateCard({ currentCardId }: UpdateCardProps) {
  const [form] = useForm();
  const { mutate: updateCard } = useUpdateCard();
  const { mutate: deleteCard } = useDeleteCard();

  const { data, isSuccess } = useGetCard({
    id: { cardId: currentCardId },
    data: null,
  });

  const handleSubmit = (formValue: CardFormValue) => {
    const {
      exposureDuration,
      title,
      type,
      content,
      isUse,
      vocaIdList,
      quizIdList,
    } = formValue;
    const data = {
      title: title,
      exposureEndDate: exposureDuration[1],
      exposureStartDate: exposureDuration[0],
      type: type,
      content: content,
      isUse: isUse,
      vocaIdList: vocaIdList,
      quizIdList: quizIdList,
    };
    updateCard({
      id: { cardId: currentCardId },
      data: data,
    });
  };

  const handleCancel = () => {
    deleteCard({
      id: { cardId: currentCardId },
      data: null,
    });
  };

  if (isSuccess) {
    const {
      createdDate,
      modifiedDate,
      exposureEndDate,
      exposureStartDate,
      title,
      type,
      quizIdList,
      vocaIdList,
      content,
      isUse,
    } = data.data;

    return (
      <CardForm
        mode="update"
        form={form}
        onDelete={handleCancel}
        onSubmit={handleSubmit}
        initialValue={{
          createdDate: dayjs(createdDate),
          modifiedDate: dayjs(modifiedDate),
          exposureStartDate: dayjs(exposureStartDate),
          exposureEndDate: dayjs(exposureEndDate),
          type: type,
          title: title,
          content: content,
          isUse: isUse,
          quizIdList: quizIdList,
          vocaIdList: vocaIdList,
        }}
      />
    );
  }

  return <>로딩</>;
}