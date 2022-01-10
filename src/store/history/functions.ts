import {batch} from 'react-redux';
import {setHistoryQueries, syncHistory} from '@/store/history/index';
import {Fetch} from '@/utils/fetch';
import {RawHistory} from '@/store/history/types';
import {HistoryProps} from '@/screens/checkin/Tabs/TabEmployeeCheckin';
import {urlProduct} from '@/store/types';

export const requestGetHistoryList = async (params: HistoryProps) => {
  const {data} = await Fetch.get<{listResponse: any}>(
    `${urlProduct}/api/v1/report-face-attendance/get-employee-attendance?dateStart=${params.dateStart}`,
    {},
  );

  const param = params?.dateStart;

  if (!data.listResponse) {
    setHistoryQueries({
      all: [],
    });
  }

  batch(() => {
    syncHistory(data.listResponse);
    setHistoryQueries({
      [param]: data.listResponse.map((item: RawHistory) => item.image),
    });
  });
  return data;
};
