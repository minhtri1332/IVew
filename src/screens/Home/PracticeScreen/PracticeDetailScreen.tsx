import React, { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { DynamicHeader } from "@/componens/Header/DynamicHeader";
import { ScreenWrapper } from "@/common/CommonStyles";
import { useAsyncFn } from "@/hooks";
import { requestPracticeDetail } from "@/store/home/function";
import { useNavigationParams } from "@/hooks/useNavigationParams";
import { styled } from "@/global";
import { IMG_BACKGROUND_MACHINE } from "@/assets";
import PointHitComponent from "@/screens/Practice/PointHitComponent";
import _ from "lodash";
import moment from "moment";
import TimeStartPractice from "@/screens/Home/PracticeScreen/TimeStartPractice";
import { Colors } from "@/themes/Colors";
import ButtonGradient from "@/componens/Gradient/ButtonGradient";

export interface PracticeDetailProps {
  practiceId: string;
  data?: any;
}

const dataMap = (dataHit: any) => {
  return _.keyBy(dataHit || [], function (o) {
    return String(moment(o.t).format("HH:mm:ss"));
  });
};

export const PracticeDetailScreen = memo(function PracticeDetailScreen() {
  const { practiceId, data } = useNavigationParams<PracticeDetailProps>();
  const [practice, setPractice] = useState(data);
  const [replay, setReplay] = useState(false);
  const dataMapTime = dataMap(data?.data || practice?.practice?.data);
  const [{ loading }, getData] = useAsyncFn(async () => {
    const value = await requestPracticeDetail(practiceId);
    setPractice(value);
  }, [practiceId, data]);

  useEffect(() => {
    if (practiceId === "") return;

    getData().then();
  }, [practiceId]);

  return (
    <ScreenWrapper>
      <DynamicHeader title={"PracticeDetailScreen"} />

      <View style={{ height: 500 }}>
        <SImageBackground
          resizeMode={"cover"}
          source={IMG_BACKGROUND_MACHINE}
        />
        <PointHitComponent
          practice={data || practice?.practice}
          dataMapTime={dataMapTime}
          replay={replay}
        />
      </View>
      <SText>
        <TimeStartPractice
          stopTime={data?.end_time || practice?.practice?.end_time}
          replay={replay}
          onReplay={setReplay}
        />
      </SText>

      <SViewButton>
        <ButtonGradient onPress={() => setReplay(!replay)} label={"Xem lại"} />
      </SViewButton>
    </ScreenWrapper>
  );
});

export default PracticeDetailScreen;

const SText = styled.Text`
  justify-content: center;
  align-self: center;
  color: ${Colors.colorText};
  font-size: 30px;
  margin-top: 20px;
`;

const SViewButton = styled.View`
  margin: 16px;
`;

const SImageBackground = styled.Image`
  flex: 1;
  width: 100%;
`;
