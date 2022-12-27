import moment from 'moment';

export const shortName = (useName: string): string => {
  return useName.replace(/@(.*)/g, '');
};

export const shortTitle = (useName: string): string => {
  return useName.replace(/@(.*)/g, '');
};

export const dateFormat = (dateString: string): string => {
  return moment(dateString).format('MMM DD, YYYY');
};

export const isFloat = (number: number): boolean => {
  return Number(number) === number && number % 1 !== 0;
};

export const convertRockAliasToName = (text: string): string => {
  return text.replaceAll('-', ' ');
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

export const formatThousand = (value: number): string => {
  if (value < 1) return value.toString();
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const delay = (ms: number): Promise<void> =>
  new Promise(res => setTimeout(res, ms));

export const msToMinAndSec = (millis: number): string => {
  const minutes = Math.floor(millis / 60000);
  const seconds = (millis % 60000) / 1000;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds.toFixed(0);
};

export const MathMap = (
  x: number,
  a: number,
  b: number,
  c: number,
  d: number
): number => {
  return parseFloat((((x - a) * (d - c)) / (b - a) + c).toFixed(3));
};

export const MathLerp = (a: number, b: number, n: number): number => {
  return parseFloat(((1 - n) * a + n * b).toFixed(3));
};

export const getFileName = (fullPath: string): string => {
  if (fullPath) {
    const startIndex =
      fullPath.indexOf('\\') >= 0
        ? fullPath.lastIndexOf('\\')
        : fullPath.lastIndexOf('/');
    let filename = fullPath.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
      filename = filename.substring(1);
    }
    return filename;
  }
  return 'rove_object_tmp';
};

export const extendFile = (fullPath: string): RegExpExecArray | null => {
  return /[^.]+$/.exec(fullPath);
};

export const toFileName = (fileName: string): string => {
  return fileName.replaceAll(' ', '_');
};

export const detectSpecialString = (text: string): boolean => {
  const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  return format.test(text);
};

export const recursiveParseObject = (json: string): Record<string, string> => {
  let data = json;
  while (typeof data !== 'object') {
    data = JSON.parse(data);
  }

  return data;
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

export const formatContractAddress = (contractAddress: string): string => {
  if (contractAddress.length < 14) return contractAddress;
  return `${contractAddress.substring(0, 7)}...${contractAddress.substring(
    contractAddress.length - 7,
    contractAddress.length
  )}`;
};
