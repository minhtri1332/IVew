import {batch} from "react-redux";
import {setHistoryQueries, syncHistory} from "@/store/history/index";
import {HistoryProps} from "@/screens/checkin/HistoryScreen";
import {Fetch} from "@/utils/fetch";
import {RawHistory} from "@/store/history/types";

export const requestGetHistoryList = async (params: HistoryProps) => {
    console.log(params)
    const {data} = await Fetch.get<{data: any}>('https://go.iview.vn/api/v1/attendence/list-record-month', {
        params: {
            boxID: params?.boxID,
            month: params?.month
        }
    });

    const param = params?.month + params?.boxID

    batch(() => {
        syncHistory(data.data.listRecord)
        setHistoryQueries({ [param]: data.data.listRecord.map((item:RawHistory) => item.employeeID) });
    });
    return data
};

