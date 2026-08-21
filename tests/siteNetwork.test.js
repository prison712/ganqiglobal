import test from 'node:test'
import assert from 'node:assert/strict'
import { siteNetwork } from '../src/content/siteNetwork.js'

test('defines the group and all three subsidiary destinations', () => {
  assert.deepEqual(
    siteNetwork.map((site) => site.id),
    ['group', 'exhibition', 'enterprise-services', 'education'],
  )
})

test('keeps every station destination unique and usable', () => {
  assert.equal(new Set(siteNetwork.map((site) => site.href)).size, 4)
  for (const site of siteNetwork) {
    assert.ok(site.labelZh)
    assert.ok(site.labelEn)
    assert.ok(site.href)
  }
})
