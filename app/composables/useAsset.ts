export const useAsset = () => {
  const baseURL = useRuntimeConfig().app.baseURL
  return (path?: string | null): string => {
    if (!path) return ''
    return baseURL + path.replace(/^\//, '')
  }
}
