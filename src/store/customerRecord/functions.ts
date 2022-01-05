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
  const {data} = await Fetch.get<{listResponse: any}>(
    `${urlProduct}/api/v1/report-face-attendance/count-by-date`,
    {
      params: params,
    },
  );
  console.log('listResponse', data, params);
  if (!data.listResponse) {
    setCustomerRecordQueries({
      all: [],
    });
  }

  let newData = data.listResponse.map(
    (customerRecord: RawCustomerRecord) => customerRecord.id,
  );

  let newQuery = store.getState().customerRecord.query['all'] || [];

  batch(() => {
    syncCustomerRecord(data.listResponse);
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
  return data.listResponse;
};
