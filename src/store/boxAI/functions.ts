import {batch} from "react-redux";
import {setBoxAiQueries, syncBoxAi} from "@/store/boxAI/index";
import {Fetch} from '@/utils/fetch';


export const requestGetBoxAi = async () => {
    const {data} = await Fetch.get<{data: any}>('https://go.iview.vn/api/v1/boxAI/list-boxAI', {
        params: {
            page:1, limit:100
        }
    });
    console.log(data.data.listBoxAi);
    // batch(() => {
    //     syncBoxAi(listBoxAi)
    //     setBoxAiQueries({ all: data.listBoxAi.map((item) => item.id) });
    // });
};

