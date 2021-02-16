import {Fetch} from "@/utils/fetch";

export const requestTransformFile = async (fileSelect: any) => {
    const {data} = await Fetch.post<{data: any}>('https://go.iview.vn/api/v1/ocr/upload-file', {file:fileSelect}
    );
    console.log("data", data)
    return data;
};
