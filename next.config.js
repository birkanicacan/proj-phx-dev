/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/proj-phx-dev',
  assetPrefix: '/proj-phx-dev/',
  trailingSlash: true,
}

module.exports = nextConfig 