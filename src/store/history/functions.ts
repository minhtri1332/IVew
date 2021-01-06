import {Fetch} from "@/utils/fetch";
import {RawCamera} from "@/types";


export interface GetCameraListParams {
    keyword: string;
}
export const GetCameraListDefaultParams: GetCameraListParams = {
    keyword: '',
};

export const requestGetCameraList = async (params: GetCameraListParams) => {

};

