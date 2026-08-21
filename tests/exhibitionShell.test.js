import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('exhibition site contains reciprocal site-network links', () => {
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')

  assert.match(html, /data-site-network="exhibition"/)
  assert.match(html, /友情链接/)
  assert.match(html, /http:\/\/127\.0\.0\.1:5173\//)
  assert.match(html, /http:\/\/127\.0\.0\.1:5173\/companies\/enterprise-services/)
  assert.match(html, /http:\/\/127\.0\.0\.1:5173\/companies\/education/)
})

test('exhibition logo returns to the group portal', () => {
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')
  assert.match(html, /href="http:\/\/127\.0\.0\.1:5173\/"[^>]+data-group-home="true"/)
  assert.match(html, /data-company-full-name="true"[^>]*>赣企出海国际会展（江西省）有限公司</)
})

test('exhibition site uses local styles and does not depend on the Tailwind CDN', () => {
  const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')

  assert.doesNotMatch(html, /cdn\.tailwindcss\.com/)
  assert.match(html, /href="assets\/css\/exhibition\.css"/)
  const css = readFileSync(new URL('../../assets/css/exhibition.css', import.meta.url), 'utf8')
  assert.match(css, /\.bg-brand-navy/)
})
