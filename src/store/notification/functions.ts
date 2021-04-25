import {Fetch} from "../../utils/fetch";


export const requestMessageCheckin = async (boxID: string) => {
    const {data} = await Fetch.get<{data: any}>('https://go.iview.vn/api/v1/top-record', {
        params: {
            device: "mobile",
            boxID: boxID
        }
    });
    return data
};
