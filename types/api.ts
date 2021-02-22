export interface LookUpWebResponse {
  domain: string
  url: string
  title?: string
  description?: string
  media: LookUpWebMedium[]
}

export interface LookUpWebMedium {
  source: string
  name?: string
  mediaType: 'image' | 'video'
}
