import { isBrowser } from '@utils/common';

export const utf8ToBase64 = (str: string): string => {
  if (!isBrowser()) {
    return '';
  }
  return window.btoa(unescape(encodeURIComponent(str)));
};

export const base64ToUtf8 = (str: string): string => {
  if (!isBrowser()) {
    return '';
  }
  return decodeURIComponent(escape(window.atob(str)));
};

export const formatAddress = (address: string): string => {
  if (address.length < 14) return address;
  return `${address.substring(0, 7)}`;
};

export const getProjectIdFromTokenId = (tokenId: number): number => {
  return Math.floor(tokenId / 1000000);
};

export const formatTokenId = (tokenId: string): string => {
  const id = Number(tokenId) % 1000000;
  return id.toString();
};

export const exponentialToDecimal = (exponential: number): string => {
  let decimal = exponential.toString().toLowerCase();
  if (decimal.includes('e+')) {
    const exponentialSplitted = decimal.split('e+');
    let postfix = '';
    for (
      let i = 0;
      i <
      +exponentialSplitted[1] -
        (exponentialSplitted[0].includes('.')
          ? exponentialSplitted[0].split('.')[1].length
          : 0);
      i++
    ) {
      postfix += '0';
    }
    const addCommas = (text: string): string => {
      let j = 3;
      let textLength = text.length;
      while (j < textLength) {
        text = `${text.slice(0, textLength - j)},${text.slice(
          textLength - j,
          textLength
        )}`;
        textLength++;
        j += 3 + 1;
      }
      return text;
    };
    decimal = addCommas(exponentialSplitted[0].replace('.', '') + postfix);
  }
  if (decimal.toLowerCase().includes('e-')) {
    const exponentialSplitted = decimal.split('e-');
    let prefix = '0.';
    for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
      prefix += '0';
    }
    decimal = prefix + exponentialSplitted[0].replace('.', '');
  }
  return decimal;
};

export const formatCurrency = (value: number): string => {
  function getDecimalPart(num: number): number {
    if (Number.isInteger(num)) {
      return 0;
    }

    const decimalStr = exponentialToDecimal(num).split('.')[1];
    return decimalStr.length;
  }
  const decimalLength = getDecimalPart(value);
  return value
    .toFixed(decimalLength > 2 ? decimalLength : 2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
