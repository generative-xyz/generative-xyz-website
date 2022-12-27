export const isBrowser = (): boolean => typeof window !== 'undefined';

export const getMobileSystem = (): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userAgent = navigator.userAgent || navigator.vendor || window?.opera;

  if (/android/i.test(userAgent)) {
    return 'Android';
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (/iPad|iPhone|iPod/.test(userAgent) && !window?.MSStream) {
    return 'iOS';
  }

  return 'Unknown';
};

export const getScrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop || 0;
};

export function formatContractAddress(address: string, first = 10, last = -4) {
  if (!address) return '';
  return `${address.slice(0, first)}...${address.slice(last)}`;
}

export const formatCurrency = (value: number) => {
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

export const formatThousand = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const numberWithCommas = (x: number): string => {
  const roundedNumber = parseFloat(x.toFixed(6));
  const parts = roundedNumber.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const nFormatter = (num: number, digits: number) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
};

export const isProduction = () => {
  return (
    process.env.NEXT_PUBLIC_APP_ENV === 'production' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'beta'
  );
};

export const lightMode = (pathName: string): boolean => {
  const urlList: Array<string> = ['store'];

  return urlList.includes(pathName);
};

export const randomNumberInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isPhoneScreen = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const width = window.innerWidth || document.body.clientWidth;
  return width < 768;
};

export const isTabletScreen = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  const width = window.innerWidth || document.body.clientWidth;
  return width >= 768 && width < 1025;
};

export const isTabletOrPhone = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const width = window.innerWidth || document.body.clientWidth;
  return width < 1025;
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
    const addCommas = (text: string) => {
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
/**
 *
 *
 * @static
 * @param {*} key
 * @param {boolean} [defaultValue=false]
 * @returns
 */
export const localStorageGetItem = (key: string, defaultValue = false) => {
  if (!localStorage) return defaultValue;
  return localStorage.getItem(key) || defaultValue;
};

/**
 *
 *
 * @static
 * @returns
 */
export const isChrome = () =>
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

const HAS_WEBP = 'hasWebP';

export const hasWebP = () => {
  if (!process.env.BROWSER) return false;
  if (!localStorage) return false;
  const isSupportWebp = localStorageGetItem(HAS_WEBP);
  if (isSupportWebp === 'true') return true;
  if (isSupportWebp === null && isChrome()) return true;
  return false;
};

interface IInjectFontPage {
  id: string;
  href: string;
  onLoad: () => void;
}

export const injectFontPage = ({ id, href, onLoad }: IInjectFontPage) => {
  if (!document.getElementById(id)) {
    const element = document.createElement('link');
    element.id = id;
    element.href = href;
    element.rel = 'stylesheet preload';
    element.onload = onLoad;
    document.body.appendChild(element);
    return true;
  }
  return false;
};
