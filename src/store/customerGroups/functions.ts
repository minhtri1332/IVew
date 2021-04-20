import {batch} from 'react-redux';
import {setDepartmentQueries, syncDepartment} from '@/store/department/index';
import {Fetch} from '@/utils/fetch';
import {RawCustomerGroup} from '@/store/customerGroups/types';

const data = {
  data: {
    listGroup: [
      {
        id: '1',
        name: 'group1',
        userID: '',
        status: '',
      },
      {
        id: '2',
        name: 'group2',
        userID: '',
        status: '',
      },
    ],
  },
};

export const requestGetCustomerGroup = async () => {
  // const {data} = await Fetch.get<{data: any}>(
  //   'https://go.iview.vn/api/v1/group/get-list-group',
  //   {
  //     params: {
  //       page: 1,
  //       limit: 100,
  //     },
  //   },
  // );

  batch(() => {
    syncDepartment(data.data.listGroup);
    setDepartmentQueries({
      all: data.data.listGroup.map((item: RawCustomerGroup) => item.id),
    });
  });
};
