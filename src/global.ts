export * from '@react-navigation/native';
// @ts-ignore
export {default as styled, useTheme} from 'styled-components/native';
import {useNavigation as _useNavigation} from '@react-navigation/native';
export const useNavigation = _useNavigation;
export * from '@/hooks';
export const Core = {
  baseUrl: 'http://motorshop.ifiplay.com/',
  oneSignalAppId: 'fa6faa58-1654-4a05-b7b4-fa39440034f6'
};
