import {batch} from 'react-redux';
import {Fetch} from '@/utils/fetch';
import {
  setCustomerRecordQueries,
  syncCustomerRecord,
} from '@/store/customerRecord/index';
import {RawCustomerRecord} from '@/store/customerRecord/types';
import {CustomerRecordProps} from '@/screens/checkin/Tabs/TabCustomerCheckin';
import {urlProduct} from '@/store/types';
import store from '@/store';

export const requestFilterCustomer = async (params: CustomerRecordProps) => {
  const {data} = await Fetch.get<{data: any}>(
    `${urlProduct}/api/v1/report/list-record-customer`,
    {
      params: params,
    },
  );

  if (!data.data.listData) {
    setCustomerRecordQueries({
      all: [],
    });
  }

  let newData = data.data.listData.map(
    (customerRecord: RawCustomerRecord) => customerRecord.id,
  );

  let newQuery = store.getState().customerRecord.query['all'] || [];

  batch(() => {
    syncCustomerRecord(data.data.listData);
    // setCustomerRecordQueries({
    //   all: data.data.listData.map((item: RawCustomerRecord) => item.id),
    // });

    setCustomerRecordQueries({
      all:
        params.page && params.page > 1
          ? [...new Set([...newQuery, ...newData])]
          : newData,
    });
  });
  return data.data.listData;
};
