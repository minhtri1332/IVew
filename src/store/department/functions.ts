import {batch} from 'react-redux';
import {setDepartmentQueries, syncDepartment} from '@/store/department/index';
import {Fetch} from '@/utils/fetch';
import {RawDepartment} from '@/store/department/types';
import {urlProduct} from '@/store/types';

export const requestGetDepartment = async () => {
  const {data} = await Fetch.get<{data: any}>(
    `${urlProduct}/api/v1/department/show-department`,

    {
      params: {
        page: 1,
        limit: 100,
      },
    },
  );

  batch(() => {
    syncDepartment(data.data.listDepartment);
    setDepartmentQueries({
      all: data.data.listDepartment.map((item: RawDepartment) => item.id),
    });
  });
};
export const requestCreateDepartment = async (name: string) => {
  const {
    data,
  } = await Fetch.post(`${urlProduct}/api/v1/department/create-department`, {
    name: name,
  });

  if (data.message == 'Success') {
    await requestGetDepartment();
  }
  return data.message;
};
