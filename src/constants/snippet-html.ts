export const SNIPPET_CONTRACT_HTML = `
  const tokenIdRand = (Math.floor(Math.random() * 1000000) + 1) * 1000000 + (Math.floor(Math.random() * 100) + 1);
  let tokenData = {
      "tokenId": tokenIdRand,
      "seed": tokenIdRand.toString(),
  };
`;

export const SNIPPET_RANDOM_HTML = `
  const urlSeed = new URLSearchParams(window.location.search).get('seed');
  if (urlSeed && urlSeed.length > 0) {
      tokenData.seed = urlSeed;
  }
  const tokenId = tokenData.tokenId;
  const ONE_MIL = 1000000;
  const projectNumber = Math.floor(parseInt(tokenData.tokenId) / ONE_MIL)
  const tokenMintNumber = parseInt(tokenData.tokenId) % ONE_MIL
  const seed = tokenData.seed

  function cyrb128($) {
      let _ = 1779033703, u = 3144134277, i = 1013904242, l = 2773480762;
      for (let n = 0, r; n < $.length; n++) _ = u ^ Math.imul(_ ^ (r = $.charCodeAt(n)), 597399067), u = i ^ Math.imul(u ^ r, 2869860233), i = l ^ Math.imul(i ^ r, 951274213), l = _ ^ Math.imul(l ^ r, 2716044179);
      return _ = Math.imul(i ^ _ >>> 18, 597399067), u = Math.imul(l ^ u >>> 22, 2869860233), i = Math.imul(_ ^ i >>> 17, 951274213), l = Math.imul(u ^ l >>> 19, 2716044179), [(_ ^ u ^ i ^ l) >>> 0, (u ^ _) >>> 0, (i ^ _) >>> 0, (l ^ _) >>> 0]
  }

  function sfc32($, _, u, i) {
      return function () {
          u >>>= 0, i >>>= 0;
          var l = ($ >>>= 0) + (_ >>>= 0) | 0;
          return $ = _ ^ _ >>> 9, _ = u + (u << 3) | 0, u = (u = u << 21 | u >>> 11) + (l = l + (i = i + 1 | 0) | 0) | 0, (l >>> 0) / 4294967296
      }
  }

  let mathRand = sfc32(...cyrb128(seed));
`;
