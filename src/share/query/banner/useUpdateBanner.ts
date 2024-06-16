import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import axios, { AxiosError } from 'axios';

import { Request, Response } from '@/type/apiType';
import { BannerRequestJson } from '@/type/bannerType';

import axiosInstance from '../axios';

interface UpdateBannerId {
  bannerId: number;
}

interface UpdateBannerRequestJson extends BannerRequestJson {}

export const updateBanner = async (
  bannerData: Request<UpdateBannerRequestJson, UpdateBannerId>,
) => {
  const {
    title,
    type,
    buttonName,
    moveId,
    exposureEndDate,
    exposureStartDate,
    image,
  } = bannerData.data;

  const formData = new FormData();
  if (image && image[0].originFileObj) {
    formData.append(
      'thumbnail',
      image[0].originFileObj,
      image[0].originFileObj?.name,
    );
  } else {
    formData.append('thumbnail', '');
  }

  const bannerBlob = new Blob(
    [
      JSON.stringify({
        type: type,
        title: title,
        buttonName: buttonName,
        moveId: moveId,
        exposureStartDate: exposureStartDate.format('YYYY-MM-DD'),
        exposureEndDate: exposureEndDate.format('YYYY-MM-DD'),
      }),
    ],
    { type: 'application/json' },
  );

  formData.append('banner', bannerBlob);

  const response = await axiosInstance.put<Response<null>>(
    `/api/banners/${bannerData.id?.bannerId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};

export function useUpdateBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banners'] });
      notification.success({
        message: '배너 수정 성공',
      });
    },
    onError: (error: AxiosError<Response<unknown>, unknown>) => {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: '배너 수정 실패',
          description: `${error.response?.data.code}: ${error.response?.data.message}`,
        });
      }
    },
  });
}