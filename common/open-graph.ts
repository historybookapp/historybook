import { OpenGraphImage } from 'open-graph-scraper'

import { LookUpWebMedium } from '../types/api'

// eslint-disable-next-line import/prefer-default-export
export const getImages = (
  siteURL: string,
  data: OpenGraphImage | OpenGraphImage[],
): LookUpWebMedium[] => {
  const imageArray = Array.isArray(data) ? data : [data]
  const site = new URL(siteURL)
  const result: ReturnType<typeof getImages> = []

  imageArray.forEach((item) => {
    if (!item) return

    let { url } = item

    if (url.startsWith('/')) {
      url = `${site.origin}${url}`
    }

    result.push({
      source: url,
      mediaType: 'image',
      name: 'image',
    })
  })

  return result
}
