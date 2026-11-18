/** Resolve public assets against Vite's configured root or subpath. */
export function assetUrl(path: string, base = import.meta.env.BASE_URL): string {
  if (/^(?:https?:|mailto:|#)/.test(path)) return path
  return `${base.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`
}
