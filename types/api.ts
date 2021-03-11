export interface LookUpWebResponse {
  hid?: string
  domain: string
  url: string
  favicon?: string
  title?: string
  description?: string
  createdAt?: string
  media: LookUpWebMedium[]
}

export interface LookUpWebMedium {
  source: string
  url?: string
  name?: string
  mediaType: 'image' | 'video'
}

export interface SearchParams {
  keyword?: string
  category?: string
  domain?: string
  [index: string]: string | undefined
}

export type MediaScene = 'card'
