import Toast from 'react-native-simple-toast';

export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';

export class ToastServiceClass {
  _getRealMessage = (message: string): string => {
    return message;
  };

  show = (
    message: any,
    keyboardAvoid: boolean = false,
    atRoot: boolean = true,
  ) => {
    if (typeof message !== 'string') return;
    return Toast.show(
      this._getRealMessage(message),
      Toast.SHORT,
      keyboardAvoid,
      atRoot,
    );
  };

  showLong = (
    message: any,
    keyboardAvoid: boolean = false,
    atRoot: boolean = true,
  ) => {
    if (typeof message !== 'string') return;
    return Toast.show(
      this._getRealMessage(message),
      Toast.LONG,
      keyboardAvoid,
      atRoot,
    );
  };

  showError = (
    message: any,
    keyboardAvoid: boolean = false,
    atRoot: boolean = true,
    defaultMessage: string,
  ) => {
    if (typeof message !== 'string') return;
    const finalMessage = message !== UNKNOWN_ERROR ? message : defaultMessage;
    return Toast.show(
      this._getRealMessage(finalMessage),
      Toast.SHORT,
      keyboardAvoid,
      atRoot,
    );
  };
}

const ToastService = new ToastServiceClass();

export default ToastService;
