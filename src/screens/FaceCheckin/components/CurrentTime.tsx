import React, {memo, useEffect, useMemo, useState} from 'react';
import moment from 'moment';
import {styled} from '@/global';
import {Colors} from '@/themes/Colors';

const Wrapper = styled.View`
  align-self: center;
  align-items: center;
`;

const DateText = styled.Text`
  margin-top: 24px;
  font-size: 20px;
  color: ${Colors.grey2};
  font-family: Roboto-Medium;
`;

const TimeText = styled.Text`
  margin-top: 8px;
  font-size: 40px;
  font-family: Roboto-Medium;
  color: ${Colors.blue1};
`;

export const CurrentTime = memo(function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(() => moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const timeStrings = useMemo(() => {
    return {
      date: currentTime.format('dddd, DD/MM/YYYY'),
      time: currentTime.format('HH:mm:ss'),
    };
  }, [currentTime]);

  return (
    <Wrapper>
      <DateText>{timeStrings.date}</DateText>
      <TimeText>{timeStrings.time}</TimeText>
    </Wrapper>
  );
});

export default CurrentTime;
