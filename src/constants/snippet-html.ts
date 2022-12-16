export const SNIPPET_HTML = `
  const tokenIdRand = (Math.floor(Math.random() * 1000000) + 1) * 1000000 + (Math.floor(Math.random() * 100) + 1);
  let tokenData = {
      "tokenId": tokenIdRand,
      "seed": tokenIdRand.toString()
  };
  const urlSeed = new URLSearchParams(window.location.search).get('seed');
  if (urlSeed && urlSeed.length > 0) {
      tokenData.seed = urlSeed;
  }
`;
