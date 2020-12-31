import _ from 'lodash';

export const normalizeStringForSearch = (raw: string = ''): string => {
  let str: string = raw.trim();
  str = str.toLowerCase();
  str = removeAccents(str);
  return str;
};

export const removeAccents = (str: string): string => {
  if (str.length === 0) return str;
  str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
  str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
  str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
  str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
  str = str.replace(/[ìíịỉĩ]/g, 'i');
  str = str.replace(/[ÌÍỊỈĨ]/g, 'I');
  str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
  str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
  str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
  str = str.replace(/[ÙÚỤỦŨƯỪỨỰỬỮ]/g, 'U');
  str = str.replace(/[ỳýỵỷỹ]/g, 'y');
  str = str.replace(/[ỲÝYỶỸ]/g, 'Y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/[!@%^*()+=<>?\/,.:;'"&#\[]~\$_`-{}|\\]/g, ' ');
  str = str.replace(/ + /g, ' ');
  return str;
};


export const parseQueryString = (
  queryString: string,
): Record<string, string> => {
  let params = {},
    queries,
    temp,
    i,
    l;
  // Split into key/value pairs
  queries = queryString.split('&');
  // Convert the array of strings into an object
  for (i = 0, l = queries.length; i < l; i++) {
    temp = queries[i].split('=');
    //@ts-ignore
    params[temp[0]] = temp[1];
  }
  return params;
};

export enum URLType {
  INVALID = 'invalid',
  BLANK = 'blank',
  BASE = 'base',
  IN_APP = 'in-app',
  OUTSIDE = 'outside',
}

export const capitalize = (s: any) => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// noinspection SuspiciousTypeOfGuard
export const decodeHtml = (str: string) =>
  require('he').decode(typeof str === 'string' ? str : '');

export const decodeHtmlMemoized = _.memoize(decodeHtml);


export const moneyFormat = (price: string | number | undefined) => {
  if (!price) {
    return ''
  }
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
};
