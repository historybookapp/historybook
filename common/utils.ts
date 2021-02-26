export const isProd = (): boolean => process.env.NODE_ENV === 'production'

export const isDev = (): boolean => process.env.NODE_ENV !== 'production'

export const isServer = (): boolean => typeof window === 'undefined'

export const isClient = (): boolean => typeof window !== 'undefined'
