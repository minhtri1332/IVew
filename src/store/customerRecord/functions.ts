import {batch} from 'react-redux';
import {Fetch} from '@/utils/fetch';
import {
  setCustomerRecordQueries,
  syncCustomerRecord,
} from '@/store/customerRecord/index';
import {RawCustomerRecord} from '@/store/customerRecord/types';
import {CustomerRecordProps} from '@/screens/checkin/Tabs/TabCustomerCheckin';

export const requestFilterCustomer = async (params: CustomerRecordProps) => {
  const {data} = await Fetch.get<{data: any}>(
    'https://k8s.backend.dev.staging.cxview.ai/api/v1/customer/get-customer-record',
    {
      params: params,
    },
  );
  batch(() => {
    syncCustomerRecord(data.data.listCustomerRecord);
    setCustomerRecordQueries({
      all: data.data.listCustomerRecord.map(
        (item: RawCustomerRecord) => item.id,
      ),
    });
  });
};
