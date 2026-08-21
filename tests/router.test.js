import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveRoute } from '../src/router.js'

test('resolves every group portal route', () => {
  const routes = {
    '/': 'home', '/about': 'about', '/history': 'history', '/culture': 'culture',
    '/honors': 'honors', '/business': 'business', '/strategy': 'strategy',
    '/companies': 'companies', '/global': 'global', '/news': 'news', '/contact': 'contact',
    '/business/cross-border-ecommerce': 'cross-border-ecommerce',
    '/business/foreign-trade': 'foreign-trade',
    '/business/inspection-tours': 'inspection-tours',
    '/business/study-in-china': 'study-in-china',
    '/business/vocational-education': 'vocational-education',
    '/business/industry-education': 'industry-education',
  }

  for (const [path, key] of Object.entries(routes)) assert.equal(resolveRoute(path).key, key)
})

test('resolves child sites and news details without ambiguity', () => {
  assert.deepEqual(resolveRoute('/companies/enterprise-services'), { type: 'business-site', key: 'enterprise-services' })
  assert.deepEqual(resolveRoute('/companies/education/'), { type: 'business-site', key: 'education' })
  assert.deepEqual(resolveRoute('/news/group-update'), { type: 'news-detail', key: 'news-detail', slug: 'group-update' })
})

test('returns a structured not-found route for unknown paths', () => {
  assert.deepEqual(resolveRoute('/companies/unknown'), { type: 'not-found', key: 'not-found' })
})
