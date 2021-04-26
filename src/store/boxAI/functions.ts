import {batch} from 'react-redux';
import {setBoxAiQueries, syncBoxAi} from '@/store/boxAI/index';
import {Fetch} from '@/utils/fetch';
import {urlProduct} from '@/store/types';

export const requestGetBoxAi = async () => {
  const {data} = await Fetch.get<{data: any}>(
    `${urlProduct}/api/v1/boxAI/list-boxAI`,
    {
      params: {
        page: 1,
        limit: 100,
      },
    },
  );
  batch(() => {
    syncBoxAi(data.data.listBoxAI);
    setBoxAiQueries({all: data.data.listBoxAI.map((item: any) => item.id)});
  });
};
