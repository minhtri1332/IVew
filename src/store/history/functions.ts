import {batch} from "react-redux";
import {setHistoryQueries, syncHistory} from "@/store/history/index";
import {HistoryProps} from "@/screens/checkin/HistoryScreen";
import {Fetch} from "@/utils/fetch";
import {RawHistory} from "@/store/history/types";

const data = [
    {id:"1", value:"Nguyễn Minh Trí"},
    {id:"2", value:"Nguyễn Thị Quỳnh"},
    {id:"3", value:"Nguyễn Văn Anh"},
    {id:"4", value:"Nguyễn Văn Bê"},
    {id:"5", value:"Nguyễn Thi Cê"},
    {id:"6", value:"Nguyễn Văn Đê"}];

export const requestGetHistoryList = async (params?: HistoryProps) => {
    console.log(params)
    const {data} = await Fetch.get<{data: any}>('https://go.iview.vn/api/v1/attendence/list-record-month', {
        params: {
            boxID: params?.boxID,
            month: params?.month
        }
    });
    console.log('data', data.data.listRecord)
    batch(() => {
        syncHistory(data.data.listRecord)
        setHistoryQueries({ all: data.data.listRecord.map((item:RawHistory) => item.boxID) });
    });
};

