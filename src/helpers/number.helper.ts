export const numberToString = (numb: number): string => {
  if (numb < 10) return `0${numb}`;
  return `${numb}`;
};

export const verifyNumber = (value: string): boolean => {
  const floatRegExp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$');
  if (value === '' || floatRegExp.test(value)) {
    return true;
  }
  return false;
};

export const isNumeric = (value: string): boolean => {
  const number = Number(value);
  return !isNaN(parseFloat(value)) && isFinite(number);
};
