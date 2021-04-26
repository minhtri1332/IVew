import {Fetch} from '../../utils/fetch';
import {urlProduct} from '@/store/types';

export const requestMessageCheckin = async (boxID: string) => {
  const {data} = await Fetch.get<{data: any}>(
    `${urlProduct}/api/v1/top-record`,
    {
      params: {
        device: 'mobile',
        boxID: boxID,
      },
    },
  );

  return data;
};
