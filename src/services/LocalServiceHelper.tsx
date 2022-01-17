import AsyncStorage from '@react-native-community/async-storage';

export default class LocalStorageHelper {
  static set = (key: string, content: string) =>
    AsyncStorage.setItem(key, content);

  static get = (key: string) => AsyncStorage.getItem(key);

  static setObject = (key: string, val: any) =>
    AsyncStorage.setItem(key, JSON.stringify(val));

  static getObject = async (key: string) => {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  static remove = (key: string) => AsyncStorage.removeItem(key);
}
