import {Fetch} from "@/utils/fetch";
import {syncAllCameras} from "@/store/camera/index";
import {RawCamera} from "@/types";


export interface GetCameraListParams {
    keyword: string;
}
export const GetCameraListDefaultParams: GetCameraListParams = {
    keyword: '',
};

export const requestGetCameraList = async (params: GetCameraListParams) => {
    const {data}: {data: RawCamera[]} = await Fetch.get('https://5d9c3f0066d00400145c95b4.mockapi.io/all', {params});
    if (!data) {
        return []
    }
    syncAllCameras(data);
    return data.map(item => item.id);
};

