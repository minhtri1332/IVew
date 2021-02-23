import {Fetch} from "@/utils/fetch";
import {ParamEmployee} from "@/screens/FaceDetect/FaceDetect";

export const requestAddEmployee = async (params?: ParamEmployee) => {
    console.log("param", params)
    const {data} = await Fetch.post<{data: any}>('https://go.iview.vn/api/v1/employee/add-employee', params);
    console.log('data', data)
};
