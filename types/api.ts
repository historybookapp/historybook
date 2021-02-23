export interface LookUpWebResponse {
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

export type MediaScene = 'card'
