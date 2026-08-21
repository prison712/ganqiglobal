import test from 'node:test'
import assert from 'node:assert/strict'
import { siteContent } from '../src/content/siteContent.js'

test('provides matching Chinese and English homepage structures', () => {
  assert.deepEqual(Object.keys(siteContent), ['zh', 'en'])
  assert.equal(siteContent.zh.highValueBlocks.length, 4)
  assert.equal(siteContent.en.highValueBlocks.length, 4)
  assert.equal(siteContent.zh.businesses.length, 8)
  assert.equal(siteContent.en.businesses.length, 8)
})

test('marks international exhibitions as an external child-site link', () => {
  const exhibition = siteContent.zh.businesses.find((item) => item.id === 'exhibition')

  assert.ok(exhibition)
  assert.equal(exhibition.external, true)
  assert.equal(exhibition.href, 'http://127.0.0.1:4174/')
})

test('keeps published group statistics within brochure claims', () => {
  assert.deepEqual(
    siteContent.zh.stats.map((item) => item.value),
    ['10,000+', '100+', '500+', '32'],
  )
})

test('positions Ganqi Overseas as the lead brand and Yashuitong as a group company', () => {
  assert.equal(siteContent.zh.hero.brand, '赣企出海')
  assert.equal(siteContent.zh.brands, undefined)

  const yashuitong = siteContent.zh.subsidiaries.find((item) => item.id === 'yashuitong')
  assert.ok(yashuitong)
  assert.equal(yashuitong.role, '企业财税与创业服务')
})

test('links the two business sites from the business matrix instead of group-company cards', () => {
  const companies = Object.fromEntries(siteContent.zh.subsidiaries.map((item) => [item.id, item]))
  const businesses = Object.fromEntries(siteContent.zh.businesses.map((item) => [item.id, item]))

  assert.equal(companies.enterpriseServices, undefined)
  assert.equal(companies.education, undefined)
  assert.equal(businesses.services.href, '/companies/enterprise-services')
  assert.equal(businesses.education.href, '/companies/education')
})
