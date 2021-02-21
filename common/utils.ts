import hashids from './hashids'

export const isProd = (): boolean => process.env.NODE_ENV === 'production'

export const isDev = (): boolean => process.env.NODE_ENV !== 'production'

export const sanitizeRecord = (
  record: Record<string, any>,
): Record<string, any> => {
  return {
    ...record,
    hid: hashids.encode(record.id),
    id: undefined,
    userId: undefined,
  }
}
