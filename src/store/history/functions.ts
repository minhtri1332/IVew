import {batch} from "react-redux";
import {setHistoryQueries, syncHistory} from "@/store/history/index";
import {HistoryProps} from "@/screens/checkin/HistoryScreen";
import {Fetch} from "@/utils/fetch";
import {RawHistory} from "@/store/history/types";

export const requestGetHistoryList = async (params?: HistoryProps) => {

    const {data} = await Fetch.get<{data: any}>('https://go.iview.vn/api/v1/attendence/list-record-month', {
        params: {
            boxID: params?.boxID,
            month: params?.month
        }
    });

    batch(() => {
        syncHistory(data.data.listRecord)
        setHistoryQueries({ all: data.data.listRecord.map((item:RawHistory) => item.employeeID) });
    });
    return data
};

