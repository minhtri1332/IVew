import {Fetch} from '@/utils/fetch';
import {ParamEmployee} from '@/screens/FaceDetect/FaceDetect';
import {urlProduct} from '@/store/types';

export const requestAddEmployee = async (params?: ParamEmployee) => {
  const {data} = await Fetch.post<{data: any}>(
    `${urlProduct}/api/v1/employee/add-employee`,
    params,
  );
  return data;
};
