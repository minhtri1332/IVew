import {createDynamicReducer} from '@/utils/createDynamicReducer';
import { RawCamera} from '@/types';
import {batch, useSelector} from 'react-redux';

const {
  setStore,
  reducer,
  sync,
  useByKey,
  setQueries,
  useKeysByQuery,
} = createDynamicReducer<RawCamera>('cameras', 'id');

export const setCameraStore = setStore;
export const cameraReducer = reducer;
export const syncCameras = sync;
export const useCamera = useByKey;
export const setCameraQueries = setQueries;
export const useCamerasByQuery = useKeysByQuery;

export const syncAllCameras = (accessories: RawCamera[]) => {
  let query: {[id: string]: string[]} = {};
  let ids: string[] = [];

  for (let access of accessories) {
    // const deptId = `dept__${Ibs.dept_id}`;
    // const areaId = `area__${Ibs.area_id}`;
    // const metatype = `${Ibs.metatype}`;

    ids.push(access.id.toString());

    // query[deptId] = !query[deptId] ? [Ibs.id] : [...query[deptId], Ibs.id];
    // query[areaId] = !query[areaId] ? [Ibs.id] : [...query[areaId], Ibs.id];
    // query[metatype] = !query[metatype]
    //   ? [Ibs.id]
    //   : [...query[metatype], Ibs.id];
  }

  batch(() => {
    syncCameras(accessories);
    setCameraQueries({
      all: ids,
      ...query,
    });
  });
};
