const CACHE_KEY = Symbol('SINGLETON_CACHE')

global[CACHE_KEY] = {}

export const singleton = async <T>(
  id: string,
  fn: () => Promise<T>,
): Promise<T> => {
  if (process.env.NODE_ENV === 'production') {
    return fn()
  }
  if (!global[CACHE_KEY][id]) {
    global[CACHE_KEY][id] = await fn()
  }
  return global[CACHE_KEY][id] as T
}

export const singletonSync = <T>(id: string, fn: () => T): T => {
  if (process.env.NODE_ENV === 'production') {
    return fn()
  }
  if (!global[CACHE_KEY][id]) {
    global[CACHE_KEY][id] = fn()
  }
  return global[CACHE_KEY][id] as T
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      [CACHE_KEY]: Record<string, any>
    }
  }
}
