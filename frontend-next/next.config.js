/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://snaoyam.github.io/pdf-padder'
      : '',
}

module.exports = nextConfig
