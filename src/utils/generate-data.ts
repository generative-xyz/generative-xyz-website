import keccak256 from 'keccak256';

export const generateHash = (): string => {
  const tokenIdRand =
    (Math.floor(Math.random() * 1000000) + 1) * 1000000 +
    (Math.floor(Math.random() * 100) + 1);
  const hash = keccak256(tokenIdRand.toString()).toString('hex');
  return hash;
};

export const generateID = (length: number): string => {
  let result = '';
  const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
};
