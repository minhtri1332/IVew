import React, { memo, useEffect, useState } from "react";
import { Text } from "react-native";
import moment from "moment";

interface TimeStartPracticeProps {
  stopTime: number;
  replay?: boolean;
  onReplay?: (replay: boolean) => void;
}

export const TimeStartPractice = memo(function TimeStartPractice({
  stopTime,
  replay,
  onReplay,
}: TimeStartPracticeProps) {
  const [dt, setDt] = useState(0);
  useEffect(() => {
    if (stopTime == 0 || stopTime / 10000 >= dt) {
      const secTimer = setInterval(async () => {
        setDt(dt + 1000);
      }, 1000);

      return () => clearInterval(secTimer);
    } else {
      onReplay && onReplay(true);
    }
  }, [dt, stopTime, onReplay]);

  useEffect(() => {
    setDt(0);
  }, [replay, setDt]);

  return (
    <Text>
      {moment(dt || 0).format("mm:ss")} /{" "}
      {moment(stopTime / 10000).format("mm:ss")}
    </Text>
  );
});

export default TimeStartPractice;
