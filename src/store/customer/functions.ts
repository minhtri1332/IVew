import {batch} from 'react-redux';
import {Fetch} from '@/utils/fetch';
import {setCustomerQueries, syncCustomer} from '@/store/customer/index';
import getStore from '@/store/getStore';
import {ParamCreateCustomer} from '@/screens/Customer/Modal/ModalCreateCustomer';
import {urlProduct} from '@/store/types';
import store from '@/store';

export const requestGetCustomer = async () => {
  const {data} = await Fetch.get<{listResponse: any}>(
    `${urlProduct}/api/v1/customer-management/list-customer`,
    {},
  );

  if (data.listResponse) {
    batch(() => {
      syncCustomer(data.listResponse);
      setCustomerQueries({
        all: data.listResponse.map((item: any) => item.id),
      });
    });
  }
  return data?.listResponse || [];
};

export const requestGetCustomerDetail = async (id: string) => {
  const {data} = await Fetch.get<{response: any}>(
    `${urlProduct}/api/v1/customer-management/get-detail-customer/${id}`,
    {
      params: {},
    },
  );

  batch(() => {
    syncCustomer([data.response]);
  });
  return data?.response;
};

export const requestEditCustomer = async (
  id: string,
  params?: ParamCreateCustomer,
) => {
  const {data} = await Fetch.put(
    `${urlProduct}/api/v1/customer-management/update-customer/${id}`,
    params,
  );

  if (data.message) {
    await requestGetCustomerDetail(id);
  }

  // batch(() => {
  //   syncCustomer([data.data.customer]);
  // });
  // return data.data.customer;
};
export const requestRemoveCustomer = async (idRemove: string) => {
  const {data} = await Fetch.delete<{data: any}>(
    `${urlProduct}/api/v1/customer-management/delete-customer/${idRemove}`,
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
  const formData = new FormData();
  formData.append('image', params?.image);
  formData.append('age', params?.age);
  formData.append('name', params?.name);
  formData.append('telephone', params?.telephone);
  formData.append('customerType', params?.customerType);
  formData.append('gender', params?.gender);

  const {data} = await Fetch.post(
    `${urlProduct}/api/v1/customer-management/add-customer`,
    formData,
  );

  const newQuery = [
    data.listResponse.id,
    ...(store.getState().customer.query['all'] || []),
  ];

  const newCustomer = {
    ...data.listResponse,
    image: params?.image.uri,
  };

  batch(() => {
    syncCustomer([newCustomer]);
    setCustomerQueries({
      all: newQuery,
    });
  });
  return data;
};
