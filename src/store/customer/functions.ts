import {batch} from 'react-redux';
import {Fetch} from '@/utils/fetch';
import {setCustomerQueries, syncCustomer} from '@/store/customer/index';
import getStore from '@/store/getStore';
import {ParamCreateCustomer} from '@/screens/Customer/Modal/ModalCreateCustomer';
import {urlProduct} from '@/store/types';
import store from '@/store';

export const requestGetCustomer = async () => {
  const {data} = await Fetch.get<{data: any}>(
    `${urlProduct}/api/v1/customer/list-customer`,
    {
      params: {
        page: 1,
        limit: 100,
      },
    },
  );
  if (data.data.listCustomer) {
    batch(() => {
      syncCustomer(data.data.listCustomer);
      setCustomerQueries({
        all: data.data.listCustomer.map((item: any) => item.id),
      });
    });
  }
};

export const requestGetCustomerDetail = async (id: string) => {
  const {data} = await Fetch.get<{data: any}>(
    `${urlProduct}/api/v1/customer/customer/${id}`,
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
    `${urlProduct}/api/v1/customer/customer/${id}`,
    params,
  );

  batch(() => {
    syncCustomer([data.data.customer]);
  });
  return data.data.customer;
};
export const requestRemoveCustomer = async (idRemove: string) => {
  const {data} = await Fetch.delete<{data: any}>(
    `${urlProduct}/api/v1/customer/customer/${idRemove}`,
  );

  if (data) {
    const list = getStore()
      .getState()
      .customer.query['all'].filter((id) => id !== idRemove);
    batch(() => {
      setCustomerQueries({all: list});
    });
  }
  return data;
};

export const requestAddCustomer = async (params?: ParamCreateCustomer) => {
  const {data} = await Fetch.post(
    `${urlProduct}/api/v1/customer/customer`,
    params,
  );

  const newQuery = [
    data.data.newCustomer.id,
    ...(store.getState().customer.query['all'] || []),
  ];

  batch(() => {
    syncCustomer([data.data.newCustomer]);
    setCustomerQueries({
      all: newQuery,
    });
  });
  return data;
};
