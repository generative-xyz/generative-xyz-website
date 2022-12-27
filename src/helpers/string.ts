export const transferShortAddress = (address = ''): string => {
  return `${address.substring(0, 5)}...${address.substring(
    address.length - 4
  )}`;
};

export const transferShortHex = (address = ''): string => {
  return `${address.substring(0, 8)}...${address.substring(
    address.length - 8
  )}`;
};

export const getFilenameFromPath = (fullPath: string): string =>
  fullPath.replace(/^.*[\\/]/, '');

export const base64toBlob = (base64Data: string, contentType: string): Blob => {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
};

export const stringToNumber = (str: string): number => {
  const chars = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  let res = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    const index = chars.findIndex(
      item => item.toLowerCase() === char.toLowerCase()
    );
    res += index;
  }

  return res;
};

export const upperCaseFirstChar = (str: string): string => {
  return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
};
