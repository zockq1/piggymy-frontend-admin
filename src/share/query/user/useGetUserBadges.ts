import { useQuery } from '@tanstack/react-query';

import { Response } from '@/type/apiType';
import { BadgeListResponseJson } from '@/type/badgeType';

import axiosInstance from '../axios';

export const getUserBadges = async (userId: number) => {
  const {
    data: { data },
  } = await axiosInstance.get<Response<BadgeListResponseJson>>(
    `/api/users/${userId}/badges`,
  );

  return data;
};

export function useGetUserBadges(userId: number) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserBadges(userId),
  });
}
