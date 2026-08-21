const staticRoutes = new Map([
  ['/', { type: 'group', key: 'home' }],
  ...['about', 'history', 'culture', 'honors', 'business', 'strategy', 'companies', 'global', 'news', 'contact']
    .map((key) => [`/${key}`, { type: 'group', key }]),
  ['/companies/enterprise-services', { type: 'business-site', key: 'enterprise-services' }],
  ['/companies/education', { type: 'business-site', key: 'education' }],
])

export function resolveRoute(pathname = '/') {
  const cleanPath = pathname !== '/' ? pathname.replace(/\/+$/, '') : '/'
  if (staticRoutes.has(cleanPath)) return staticRoutes.get(cleanPath)
  if (cleanPath.startsWith('/news/') && cleanPath.length > 6) {
    return { type: 'news-detail', key: 'news-detail', slug: cleanPath.slice(6) }
  }
  if (cleanPath.startsWith('/business/') && cleanPath.length > 10) {
    return { type: 'business-detail', key: cleanPath.slice(10) }
  }
  return { type: 'not-found', key: 'not-found' }
}
