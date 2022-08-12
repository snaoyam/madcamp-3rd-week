/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://snaoyam.github.io/padpdf'
      : '',
}

module.exports = nextConfig
