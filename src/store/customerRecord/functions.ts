import {batch} from 'react-redux';
import {Fetch} from '@/utils/fetch';
import {
  setCustomerRecordQueries,
  syncCustomerRecord,
} from '@/store/customerRecord/index';
import {RawCustomerRecord} from '@/store/customerRecord/types';
import {CustomerRecordProps} from '@/screens/checkin/Tabs/TabCustomerCheckin';
import {urlProduct} from '@/store/types';

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
  batch(() => {
    syncCustomerRecord(data.data.listData);
    setCustomerRecordQueries({
      all: data.data.listData.map((item: RawCustomerRecord) => item.id),
    });
  });
};
