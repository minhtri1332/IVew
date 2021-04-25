import {batch} from 'react-redux';
import {Fetch} from '@/utils/fetch';
import {setCustomerQueries, syncCustomer} from '@/store/customer/index';
import getStore from '@/store/getStore';
import {ParamCreateCustomer} from '@/screens/Customer/Modal/ModalCreateCustomer';

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
    setCustomerQueries({
      all: data.data.listCustomer.map((item: any) => item.id),
    });
  });
};

export const requestGetCustomerDetail = async (id: string) => {
  const {data} = await Fetch.get<{data: any}>(
    `https://k8s.backend.dev.staging.cxview.ai/api/v1/customer/customer/${id}`,
    {
      params: {},
    },
  );

  batch(() => {
    syncCustomer(data.data.customer);
  });
};

export const requestEditCustomer = async (
  id: string,
  params?: ParamCreateCustomer,
) => {
  const {data} = await Fetch.put(
    `https://k8s.backend.dev.staging.cxview.ai/api/v1/customer/customer/${id}`,
    params,
  );
  if (data.message == 'Success') {
    requestGetCustomerDetail(id).then();
  }
  return data.message;
};
export const requestRemoveCustomer = async (idRemove: string) => {
  const {data} = await Fetch.delete<{data: any}>(
    `https://k8s.backend.dev.staging.cxview.ai/api/v1/customer/customer/${idRemove}`,
  );

  const list = getStore()
    .getState()
    .customer.query['all'].filter((id) => id !== idRemove);
  batch(() => {
    setCustomerQueries({all: list});
  });
};

export const requestAddCustomer = async (params?: ParamCreateCustomer) => {
  const {data} = await Fetch.post(
    'https://k8s.backend.dev.staging.cxview.ai/api/v1/customer/customer',
    params,
  );

  if (data.message == 'Success') {
    requestGetCustomer().then();
  }
  return data.message;
};
