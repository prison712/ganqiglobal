import test from 'node:test'
import assert from 'node:assert/strict'
import { siteMap } from '../src/content/siteMap.js'

test('uses real page URLs for primary navigation in both locales', () => {
  const expected = ['/', '/about', '/business', '/companies', '/global', '/news', '/contact']
  for (const locale of ['zh', 'en']) {
    assert.deepEqual(siteMap[locale].primaryNav.map((item) => item.href), expected)
    assert.equal(siteMap[locale].primaryNav.some((item) => item.href.startsWith('#')), false)
  }
})

test('keeps about and business dropdowns structurally aligned', () => {
  for (const locale of ['zh', 'en']) {
    const [about, business] = siteMap[locale].primaryNav.filter((item) => item.children)
    assert.deepEqual(about.children.map((item) => item.href), ['/about', '/history', '/culture', '/honors'])
    assert.deepEqual(business.children.map((item) => item.href), ['/business', '/strategy'])
  }
})

test('exposes the exhibition child-site target separately from group routes', () => {
  assert.equal(siteMap.zh.exhibitionHref, 'http://127.0.0.1:4174/')
  assert.equal(siteMap.en.exhibitionHref, 'http://127.0.0.1:4174/')
})
