import {Fetch} from "@/utils/fetch";
import {ParamEmployee} from "@/screens/FaceDetect/FaceDetect";
import {ParamCreateCustomer} from "@/screens/Customer/Modal/ModalCreateCustomer";

export const requestAddEmployee = async (params?: ParamEmployee) => {
    const {data} = await Fetch.post<{data: any}>('https://go.iview.vn/api/v1/employee/add-employee', params);
    return data
};

export const requestAddCustomer = async (params?: ParamCreateCustomer) => {
    console.log('paramCustomer', params);

    const {data} = await Fetch.post<{data: any}>('https://k8s.backend.dev.staging.cxview.ai/api/v1/customer/customer', params);
    return data
};
