import {useLanguage} from '@base/core/store/global/hooks';
import {useAsync} from '@/global';
import i18next from 'i18next';
import {LocaleConfig} from 'react-native-calendars';
import moment from '@/services/MomentService';

export const setupLanguage = (language: string = 'vi') => {
  LocaleConfig.locales['vi'] = {
    amDesignator: 'SA',
    pmDesignator: 'CH',
    dayNames: [
      'Thứ 2',
      'Thứ 3',
      'Thứ 4',
      'Thứ 5',
      'Thứ 6',
      'Thứ 7',
      'Chủ nhật',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      'T1',
      'T2',
      'T3',
      'T4',
      'T5',
      'T6',
      'T7',
      'T8',
      'T9',
      'T10',
      'T11',
      'T12',
    ],
  };

  LocaleConfig.defaultLocale = 'vi';

  return i18next.init({
    lng: language,
    fallbackLng: 'en',
    debug: false,
    resources: {
      vi: {
        translation: {
          ...require('@base/core/assets/languages/vi.json'),
          ...require('@base/post/assets/languages/vi.json'),
          ...require('@base/ui-kit/assets/languages/vi.json'),
          ...require('@base/post/assets/languages/vi.json'),
          ...require('../languages/vi.json'),
        },
      },
      en: {
        translation: {
          ...require('@base/core/assets/languages/en.json'),
          ...require('@base/post/assets/languages/en.json'),
          ...require('@base/ui-kit/assets/languages/en.json'),
          ...require('@base/post/assets/languages/en.json'),
          ...require('../languages/en.json'),
        },
      },
    },
  });
};

export const useSetupLanguage = () => {
  const currentLanguage = useLanguage();
  moment.locale(currentLanguage);

  return useAsync(() => {
    return setupLanguage(currentLanguage);
  }, [currentLanguage]);
};

export const changeLanguage = (lng: string) => {
  i18next.changeLanguage(lng);
  //TODO: change moment locale
  //TODO: change LocaleConfig of react-native-calendars
};
export default useSetupLanguage;
