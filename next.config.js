// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const baseSecurityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN"
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin'
  },
]

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self'; frame-src 'self';`
          },
          ...baseSecurityHeaders,
        ]
      },
      {
        source: "/sandbox/sw.js",
        headers: [
          {
            key: "service-worker-allowed",
            value: "/"
          }
        ]
      },
      {
        source: "/sandbox/preview.html",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ""
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp"
          },
        ]
      }
    ]
  },
});
