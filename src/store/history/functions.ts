import {batch} from 'react-redux';
import {setHistoryQueries, syncHistory} from '@/store/history/index';
import {Fetch} from '@/utils/fetch';
import {RawHistory} from '@/store/history/types';
import {HistoryProps} from '@/screens/checkin/Tabs/TabEmployeeCheckin';
import {urlProduct} from '@/store/types';

export const requestGetHistoryList = async (params: HistoryProps) => {
  const {data} = await Fetch.get<{data: any}>(
    `${urlProduct}/api/v1/attendence/list-record-month`,
    {
      params: {
        boxID: params?.boxID,
        month: params?.month,
      },
    },
  );
  const param = params?.month + params?.boxID;

  batch(() => {
    syncHistory(data.data.listRecord);
    setHistoryQueries({
      [param]: data.data.listRecord.map((item: RawHistory) => item.employeeID),
    });
  });
  return data;
};
