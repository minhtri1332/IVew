import {batch} from 'react-redux';
import {setBoxAiQueries, syncBoxAi} from '@/store/boxAI/index';
import {Fetch} from '@/utils/fetch';
import {RawBoxAi} from '@/store/boxAI/types';
import {setCustomerQueries, syncCustomer} from "@/store/customer/index";

export const requestGetCustomer = async () => {
  const {data} = await Fetch.get<{data: any}>(
    'https://k8s.backend.dev.staging.cxview.ai/api/v1/customer/list-customer',
    {
      params: {
        page: 1,
        limit: 100,
      },
    },
  );

  batch(() => {
    syncCustomer(data.data.listCustomer);
    setCustomerQueries({all: data.data.listCustomer.map((item: any) => item.id)});
  });
};
export const requestGetCustomerDetail = async (id:string) => {
  const {data} = await Fetch.get<{data: any}>(
    `https://k8s.backend.dev.staging.cxview.ai/api/v1/customer/customer/${id}`,
    {
      params: {

      },
    },
  );

  batch(() => {
    syncCustomer(data.data.customer);
  });
};
