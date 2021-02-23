import { LookUpWebMedium, MediaScene } from '../types/api'
import hashids from './hashids'
import imgproxy from './imgproxy'

export const isProd = (): boolean => process.env.NODE_ENV === 'production'

export const isDev = (): boolean => process.env.NODE_ENV !== 'production'

export const proxyMedia = (
  media: LookUpWebMedium[] = [],
  scene?: MediaScene,
): LookUpWebMedium[] => {
  return media.map((medium) => {
    const builder = imgproxy.builder()

    switch (scene) {
      case 'card':
        builder.resize('fill', 360, 270, false)
        break
      default:
      // no default
    }

    return {
      ...medium,
      url: builder.generateUrl(medium.source),
    }
  })
}

export const sanitizeRecord = (
  record: Record<string, any>,
  scene?: MediaScene,
): Record<string, any> => {
  return {
    ...record,
    hid: hashids.encode(record.id),
    id: undefined,
    userId: undefined,
    media: proxyMedia(record.media, scene),
  }
}
