import Imgproxy from 'imgproxy'

import { singletonSync } from './singleton'

const imgproxy = singletonSync('imgproxy', () => {
  return new Imgproxy({
    baseUrl: process.env.IMGPROXY_SERVER,
    key: process.env.IMGPROXY_KEY,
    salt: process.env.IMGPROXY_SALT,
    encode: true,
  })
})

export default imgproxy
