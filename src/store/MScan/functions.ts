import {Fetch} from '@/utils/fetch';
import {urlProduct} from '@/store/types';

export const requestTransformFile = async (fileSelect: any) => {
  const {data} = await Fetch.post<{data: any}>(
    `${urlProduct}/api/v1/ocr/upload-file`,
    {file: fileSelect},
  );
  console.log('data', data);
  return data;
};
