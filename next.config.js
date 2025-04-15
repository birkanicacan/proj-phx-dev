/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/proj-phx-dev' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/proj-phx-dev/' : '',
  trailingSlash: true,
}

module.exports = nextConfig 