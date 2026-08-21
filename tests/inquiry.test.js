import test from 'node:test'
import assert from 'node:assert/strict'
import { validateInquiry } from '../src/utils/inquiry.js'

test('validates required inquiry fields without a backend', () => {
  assert.deepEqual(Object.keys(validateInquiry({})), ['company', 'contact', 'phone', 'need'])
  assert.deepEqual(validateInquiry({ company: '赣企科技', contact: '陈女士', phone: '13800138000', need: '海外市场咨询' }), {})
  assert.equal(validateInquiry({ company: 'A', contact: 'B', phone: '123', need: 'C' }).phone, 'invalid')
})
