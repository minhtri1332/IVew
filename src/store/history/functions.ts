import {batch} from "react-redux";
import {setHistoryQueries, syncHistory} from "@/store/history/index";

const data = [
    {id:"1", value:"Nguyễn Minh Trí"},
    {id:"2", value:"Nguyễn Thị Quỳnh"},
    {id:"3", value:"Nguyễn Văn Anh"},
    {id:"4", value:"Nguyễn Văn Bê"},
    {id:"5", value:"Nguyễn Thi Cê"},
    {id:"6", value:"Nguyễn Văn Đê"}];

export const requestGetHistoryList = async () => {
    batch(() => {
        syncHistory(data)
        setHistoryQueries({ all: data.map((item) => item.id) });
    });
};

