if (!process.env.NEXT_PUBLIC_SITE) {
  throw new Error('Please define NEXT_PUBLIC_SITE in your .env file!')
}

process.env.NEXTAUTH_URL = process.env.NEXT_PUBLIC_SITE

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.node = { fs: 'empty', module: 'empty' }
    }

    return config
  },
}
