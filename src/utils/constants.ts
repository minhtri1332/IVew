import {useMemo} from 'react';

// @todo another gender
export enum GenderEnum {
    UNDEFINED = '-1',
    MALE = '1',
    FEMALE = '2',
}


export const moneyFormatMillion = (labelValue: number | string) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
        ? Math.abs(Number(labelValue)) / 1.0e9 + 'B'
        : // Six Zeroes for Millions
        Math.abs(Number(labelValue)) >= 1.0e6
            ? Math.abs(Number(labelValue)) / 1.0e6 + 'M'
            : // Three Zeroes for Thousands
            Math.abs(Number(labelValue)) >= 1.0e3
                ? Math.abs(Number(labelValue)) / 1.0e3 + 'K'
                : Math.abs(Number(labelValue));
};

export const str2int = (str: string) => {
    let r = 3;
    for (let i = 0; i < str.length; i++) {
        r += str.charCodeAt(i) * str.charCodeAt(i);
    }
    return (r % 8) + 1;
};

export const getAvatarColorText = (str: string | undefined) => {
    if (!str) {
        str = '';
    }
    const colors = {
        1: '#2a91d6',
        2: '#7c32a1',
        3: '#11bdbf',
        4: '#4CAF50',
        5: '#5969c5',
        6: '#dbaa07',
        7: '#FF6F22',
        8: '#CF5555',
        9: '#ee59ba',
    };
    let color = str2int(str);
    // @ts-ignore
    return colors[color];
};

export const generateNumber = (from: number, to: number) => {
    let result = [];
    for (let i = from; i <= to; i++) {
        result.push({
            value: `${i}`,
            label: `${i}`
        })
    }
    return result
};
