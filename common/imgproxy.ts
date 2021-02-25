import Imgproxy from 'imgproxy'
import envalid from 'envalid'

const { str } = envalid

const env = envalid.cleanEnv(process.env, {
  IMGPROXY_SERVER: str(),
  IMGPROXY_KEY: str(),
  IMGPROXY_SALT: str(),
})

export default new Imgproxy({
  baseUrl: env.IMGPROXY_SERVER,
  key: env.IMGPROXY_KEY,
  salt: env.IMGPROXY_SALT,
  encode: true,
})
