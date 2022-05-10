import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";

export interface FilterBoxOption {
  value: string | number | undefined | boolean;
  label: string;
  noTranslate?: boolean;
  icon?: ImageSourcePropType;
}

export interface FilterModalBottomProps {
  label: string;
  options: FilterBoxOption[];
  optionsChildren?: FilterBoxOption[];
  selectedValue?: string | number | boolean;
  placeholder?: string;
  inputName: string;
  renderIcon?: (icon: ImageSourcePropType) => React.ReactElement | null;
  onSelectOption: (inputName: string, value: string | number) => void;
  containerStyle?: ViewStyle;
  father?: boolean | undefined;
  filtered?: boolean | undefined;
  hideBottom?: () => void;
  required?: boolean | undefined;
  headerContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  textStyle?: TextStyle;
  dropDownStyle?: ImageStyle;
  hideDivider?: boolean;
  isButtonClearValue?: boolean;
  onPressRight?: () => void;
}
