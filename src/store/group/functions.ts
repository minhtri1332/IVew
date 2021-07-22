import {batch} from 'react-redux';
import {setGroupQueries, syncGroup} from '@/store/group/index';
import {Fetch} from '@/utils/fetch';
import {urlProduct} from '@/store/types';

export const requestGetGroups = async () => {

  const {data} = await Fetch.get<{data: any}>(
    `${urlProduct}/api/v1/group/get-list-group`,
    {
      params: {
        page: 1,
        limit: 100,
      },
    },
  );

  console.log('data', data)
  batch(() => {
    syncGroup(data.data.listGroup);
    setGroupQueries({all: data.data.listGroup.map((item: any) => item.id)});
  });
};
