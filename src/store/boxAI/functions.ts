import {batch} from "react-redux";
import {setBoxAiQueries, syncBoxAi} from "@/store/boxAI/index";
import Fetch from "@/utils/fetch";

export const requestGetHistoryList = async () => {
    const {data} = await Fetch.get('https://go.iview.vn/api/v1/boxAI/list-boxAI', {},{});
    // batch(() => {
    //     syncBoxAi(data)
    //     setBoxAiQueries({ all: data.map((item) => item.id) });
    // });
};

