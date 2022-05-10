import { createDynamicReducer } from "@/ultils/createDynamicReducer";
import { RawPractice } from "@/store/home/types";

const { setStore, reducer, sync, useByKey, setQueries, useKeysByQuery } =
  createDynamicReducer<RawPractice>("practice", "practice_id");

export const setPracticeStore = setStore;
export const practiceReducer = reducer;
export const syncPractice = sync;
export const usePractice = useByKey;
export const setPracticeQueries = setQueries;
export const usePracticeByQuery = useKeysByQuery;
