import {styled} from '@/global';
import React, {memo, useCallback} from 'react';
import {Colors} from "@/themes/Colors";

const Button = styled.TouchableOpacity`
  height: 44px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.black10};
  border-top-width: 1px;
  border-top-color: ${Colors.black10};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ResetText = styled.Text`
  font-size: 15px;
  color: ${Colors.blue1};
`;

interface Props {
  onPress?: () => void;
}

export const FilterResetButton = memo((props: Props) => {
  const {onPress} = props;

  const onPressCB = useCallback(() => {
    onPress && onPress()
  }, [onPress]);

  return (
    <Button onPress={onPressCB}>
      <ResetText>Tìm kiếm mặc định</ResetText>
    </Button>
  );
});
