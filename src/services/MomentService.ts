import moment from 'moment';

export const list12Month=["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"]

export const list12MonthNumber=[1,2,3,4,5,6,7,8,9,10,11,12]

const viConfig = {
  months: 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split(
    '_',
  ),
  monthsShort: 'thg 1_thg 2_thg 3_thg 4_thg 5_thg 6_thg 7_thg 8_thg 9_thg 10_thg 11_thg 12'.split(
    '_',
  ),
  monthsParseExact: true,
  weekdays: 'Chủ Nhật_Thứ Hai_Thứ Ba_Thứ Tư_Thứ Năm_Thứ Sáu_Thứ Bảy'.split('_'),
  weekdaysShort: 'CN_Thứ 2_Thứ 3_Thứ 4_Thứ 5_Thứ 6_Thứ 7'.split('_'),
  weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
  weekdaysParseExact: true,
  meridiemParse: /sa|ch/i,
  isPM(input: string) {
    return /^ch$/i.test(input);
  },
  meridiem(hours: number, minutes: number, isLower: boolean) {
    if (hours < 12) {
      return isLower ? 'sa' : 'SA';
    } else {
      return isLower ? 'ch' : 'CH';
    }
  },
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM [năm] YYYY',
    LLL: 'D MMMM [năm] YYYY HH:mm',
    LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
    l: 'DD/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm',
  },
  calendar: {
    sameDay: '[Hôm nay lúc] LT',
    nextDay: '[Ngày mai lúc] LT',
    nextWeek: 'dddd [tuần tới lúc] LT',
    lastDay: '[Hôm qua lúc] LT',
    lastWeek: 'dddd [tuần rồi lúc] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: '%s tới',
    past: '%s trước',
    s: 'vài giây',
    ss: '%d giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm',
  },
  dayOfMonthOrdinalParse: /\d{1,2}/,
  ordinal(number: any) {
    return number;
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
};

moment.defineLocale('vi', viConfig);

export default moment;
