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
