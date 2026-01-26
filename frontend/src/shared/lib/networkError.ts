export const isNetworkError = (error: unknown) => {
  // Axios помещает код 'ECONNABORTED' при timeout и отсутствует response при офлайне
  if (!error || typeof error !== 'object') return false
  const err = error as { code?: string; response?: unknown }
  return err.code === 'ECONNABORTED' || !err.response
}
