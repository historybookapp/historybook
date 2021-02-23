export const singleton = async <T>(
  id: string,
  fn: () => Promise<T>,
): Promise<T> => {
  if (process.env.NODE_ENV === 'production') {
    return fn()
  }
  if (!global[id]) {
    global[id] = await fn()
  }
  return global[id] as T
}

export const singletonSync = <T>(id: string, fn: () => T): T => {
  if (process.env.NODE_ENV === 'production') {
    return fn()
  }
  if (!global[id]) {
    global[id] = fn()
  }
  return global[id] as T
}
