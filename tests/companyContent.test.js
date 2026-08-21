import test from 'node:test'
import assert from 'node:assert/strict'
import { companyContent } from '../src/content/companyContent.js'

test('keeps the two company pages structurally aligned in Chinese and English', () => {
  for (const route of ['enterprise-services', 'education']) {
    assert.ok(companyContent.zh[route])
    assert.ok(companyContent.en[route])
    assert.equal(companyContent.zh[route].modules.length, companyContent.en[route].modules.length)
    assert.equal(companyContent.zh[route].images.length, companyContent.en[route].images.length)
  }
})

test('uses only the confirmed education directions', () => {
  assert.deepEqual(
    companyContent.zh.education.modules.map((item) => item.title),
    ['产教融合', '来华留学', '职教出海'],
  )
})

test('provides complete homepage content for both subsidiary sites in both languages', () => {
  for (const locale of ['zh', 'en']) {
    for (const company of Object.values(companyContent[locale])) {
      assert.ok(company.advantages.length >= 3)
      assert.ok(company.faqs.length >= 3)
      assert.ok(company.inquiryOptions.length >= 3)
      assert.ok(company.sectionIntro)
      assert.ok(company.contactTitle)
    }
  }
})
