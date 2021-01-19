import React, {memo, useCallback, useMemo} from 'react';
import {styled} from '@/global';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useInteractionManager} from '@react-native-community/hooks';
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import {Colors} from '@/themes/Colors';
import useBoolean from '@/hooks/useBoolean';
import moment from '@/services/MomentService';
import {IC_CALENDAR, IC_CLOCK} from "@/assets";

interface Props {
  label: string;
  placeholder?: string;
  value: string | number; // html
  keyName: string;
  mode: 'date' | 'time' | 'datetime';
  containerStyle?: ViewStyle;
  onChangeValue: (keyName: string, value: string) => void;
  dateTimePickerProps?: ReactNativeModalDateTimePickerProps;
  required?: boolean;
  format?: string;
}

const formatByMode = {
  date: 'DD/MM/YYYY',
  time: 'HH:mm',
  datetime: 'HH:mm DD/MM/YYYY',
};

const ContainerButton = styled.View`
  min-height: 56px;
  border-width: 1px;
  border-color: ${Colors.grey5};
  border-radius: 8px;
`;

const Row = styled.View`
  flex-direction: row;
`;

export const DateTimeBorder = memo(function DateTimeBorder(props: Props) {
  const interactionReady = useInteractionManager();

  const {
    label,
    value,
    keyName,
    placeholder,
    onChangeValue,
    containerStyle,
    mode,
    dateTimePickerProps,
    required,
    format,
  } = props;
  const [isModalVisible, showModal, hideModal] = useBoolean();

  const onChange = useCallback(
    (value: string) => {
      onChangeValue(keyName, value);
    },
    [onChangeValue],
  );

  const onConfirm = useCallback(
    (date: Date) => {
      hideModal();
      requestAnimationFrame(() => {
        onChange?.(moment(date).format(format || formatByMode[mode]));
      });
    },
    [mode, onChange, hideModal, format],
  );

  const date = useMemo(() => {
    if (!value) {
      return new Date();
    }
    const momentTime = moment(value, format || formatByMode[mode]);
    return momentTime.isValid() ? momentTime.toDate() : new Date();
  }, [value, mode, format]);

  if (!interactionReady) {
    return null;
  }
  return (
    <ContainerButton style={containerStyle}>
      <TouchableOpacity activeOpacity={0.6} onPress={showModal}>
        <Row>
          <View style={styles.btnViewTitle}>
            <STextGrey style={styles.titleText}>
              {label}
              {required ? '*' : ''}
            </STextGrey>
            {value ? (
              <View>
                <STextGrey1 style={styles.contentText}>{value}</STextGrey1>
              </View>
            ) : (
              <STextGrey style={styles.contentText}>{placeholder}</STextGrey>
            )}
          </View>
          <View style={styles.viewIcon}>
            <SImage source={mode == 'time' ? IC_CLOCK : IC_CALENDAR} />
          </View>
        </Row>
      </TouchableOpacity>
      <DateTimePickerModal
        mode={mode}
        isVisible={isModalVisible}
        onConfirm={onConfirm}
        onCancel={hideModal}
        date={date}
        {...dateTimePickerProps}
      />
    </ContainerButton>
  );
});

const SImage = styled.Image``;

const STextGrey = styled.Text`
  color: ${Colors.grey3};
`;

const STextGrey1 = styled.Text`
  color: ${Colors.grey1};
`;

const styles = StyleSheet.create({
  optionContainer: {
    marginHorizontal: 0,
  },
  titleText: {
    fontSize: 11,
    lineHeight: 13,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 18,
    paddingTop: 4,
  },
  btnViewTitle: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  viewIcon: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  selectedText: {},
  maxHeightScroll: {
    maxHeight: Dimensions.get('window').height * 0.6,
  },
  filterPaddingHp: {},
  filtered: {
    color: Colors.blue1,
  },
});
