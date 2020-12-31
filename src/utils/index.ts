const moneyRegex = /\B(?=(\d{3})+(?!\d))/g;

export const smartRound = (value: string | number, exponent: number = 2) => {
  try {
    const rounded =
      Math.round((Number(value) + Number.EPSILON) * Math.pow(10, exponent)) /
      Math.pow(10, exponent);
    return Number(rounded.toFixed(exponent));
  } catch (error) {
    return value;
  }
};

//Normal format: 1000.23 => 1,000.23; 1000 => 1,000
export const formatMoney = (value: string | number | undefined) => {
  try {
    if (typeof value === undefined) {
      return '0';
    }
    const rounded = Math.round((Number(value) + Number.EPSILON) * 100) / 100;
    const numInStr = Number(rounded.toFixed(2)).toString();
    return numInStr.replace(moneyRegex, ',');
  } catch (error) {
    return value;
  }
};

export const toPercent = (num: number, total: number) => {
  if (total === 0) {
    return 0;
  }
  return Number(((num / total) * 100).toFixed(2));
};

const ONE_MILLION = 1000000;
const ONE_BILLION = ONE_MILLION * 1000;

//Short format: 1000000 => 1.00M; 1000000000 => 1.00B
export const formatMoneyCompact = (value: string | number | undefined) => {
  try {
    if (typeof value === undefined) {
      return '0';
    }
    const num = Number(value);
    const absNum = Math.abs(num);
    let absResult;
    if (absNum >= ONE_BILLION) {
      absResult = formatMoneyLarge(absNum, ONE_BILLION, 'B');
    } else if (absNum >= ONE_MILLION) {
      absResult = formatMoneyLarge(absNum, ONE_MILLION, 'M');
    } else {
      absResult = formatMoney(absNum);
    }
    return `${num < 0 ? '-' : ''}${absResult}`;
  } catch (error) {
    return formatMoney(value);
  }
};

const formatMoneyLarge = (num: number, divider: number, postFix: string) => {
  const numberInShort = num / divider;
  const rounded = Math.round((numberInShort + Number.EPSILON) * 100) / 100;
  return `${rounded.toFixed(2).replace(moneyRegex, ',')}${postFix}`;
};

export const formatMoneyDynamic = (
  value: string | number | undefined,
  max: number = ONE_BILLION,
) => {
  try {
    if (typeof value === undefined) {
      return '0';
    }
    const num = Number(value);
    const absNum = Math.abs(num);
    if (absNum >= max) {
      return formatMoneyCompact(value);
    }
    return formatMoney(value);
  } catch (error) {
    return formatMoneyCompact(value);
  }
};

export const toBoolean = (value: any) => {
  return value === '0' ? false : !!value;
};

export const isTrue = (_v: string | number | undefined) => {
  if (!_v) {
    return false;
  }
  if (typeof _v === 'string') {
    try {
      return parseInt(_v);
    } catch (e) {
      return false;
    }
  }
  return _v !== 0;
};

export function nextFrame() {
  return new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}
