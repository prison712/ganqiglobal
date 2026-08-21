import test, { after, before } from 'node:test'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import { fileURLToPath } from 'node:url'

let vite
let App
let getNextLocale

before(async () => {
  const projectRoot = fileURLToPath(new URL('..', import.meta.url))
  vite = await createServer({ root: projectRoot, server: { middlewareMode: true }, appType: 'custom' })
  const appModule = await vite.ssrLoadModule('/src/App.jsx')
  App = appModule.default
  getNextLocale = appModule.getNextLocale
})

after(async () => {
  await vite?.close()
})

test('renders a recognizable Chinese group homepage', () => {
  const html = renderToStaticMarkup(React.createElement(App))

  assert.match(html, /赣企科技集团/)
  assert.match(html, /让中国企业，更好地走向世界/)
  assert.match(html, /四大高价值业务板块/)
  assert.match(html, /更多业务/)
  assert.match(html, /新闻资讯/)
})

test('renders the exhibition entry as a safe external-style child-site link', () => {
  const html = renderToStaticMarkup(React.createElement(App))

  assert.match(html, /href="http:\/\/127\.0\.0\.1:4174\/"/)
  assert.match(html, /target="_blank"/)
  assert.match(html, /rel="noreferrer"/)
})

test('keeps the business-card and footer exhibition entries safe', () => {
  const html = renderToStaticMarkup(React.createElement(App))
  const safeLinks = html.match(/href="http:\/\/127\.0\.0\.1:4174\/" target="_blank" rel="noreferrer"/g) || []

  assert.equal(safeLinks.length, 2)
})

test('switches between the two supported locales', () => {
  assert.equal(getNextLocale('zh'), 'en')
  assert.equal(getNextLocale('en'), 'zh')
})

test('renders independent-page group navigation with dropdown groups', () => {
  const html = renderToStaticMarkup(React.createElement(App, { initialPath: '/about' }))

  assert.match(html, /data-group-header="true"/)
  assert.match(html, /href="\/about"/)
  assert.match(html, /href="\/history"/)
  assert.match(html, /href="\/business"/)
  assert.doesNotMatch(html, /href="#about"/)
  assert.match(html, /data-mobile-drawer="true"/)
  assert.match(html, /aria-current="page"/)
})

test('keeps the hero concise and uses the Ganqi Overseas brand asset', () => {
  const html = renderToStaticMarkup(React.createElement(App))

  assert.match(html, /src="\/assets\/ganqi-logo\.png"/)
  assert.match(html, /data-hero-cta="primary"/)
  assert.doesNotMatch(html, /hero-orbit/)
  assert.doesNotMatch(html, /国内基石/)
  assert.doesNotMatch(html, /button-ghost/)
})

test('places the company film on the second screen with three core statistics', () => {
  const html = renderToStaticMarkup(React.createElement(App))

  assert.match(html, /<video[^>]+src="\/assets\/company-film\.mp4"/)
  assert.match(html, /data-core-stats="3"/)
  assert.match(html, /10,000\+/)
  assert.match(html, /100\+/)
  assert.match(html, /500\+/)
})

test('renders the approved simplified group homepage flow with real page links', () => {
  const html = renderToStaticMarkup(React.createElement(App))
  const sections = ['hero', 'group-intro', 'pillars', 'news', 'cooperation', 'footer']
  const removed = ['capabilities', 'exhibition', 'strategy', 'companies', 'global', 'partners']

  for (const section of sections) assert.match(html, new RegExp(`data-home-section="${section}"`))
  for (const section of removed) assert.doesNotMatch(html, new RegExp(`data-home-section="${section}"`))
  for (const href of ['/about', '/business', '/news', '/contact']) assert.match(html, new RegExp(`href="${href}"`))
  assert.equal((html.match(/data-high-value-card=/g) || []).length, 5)
  assert.match(html, /src="\/assets\/home\/ecommerce-meeting\.jpg"/)
  assert.match(html, /data-more-business="true"[^>]+href="\/business"/)
  assert.doesNotMatch(html, /href="#business"/)
})

test('marks the group hero and every homepage module for restrained entrance animation', () => {
  const html = renderToStaticMarkup(React.createElement(App))

  assert.equal((html.match(/data-home-enter=/g) || []).length, 4)
  for (const section of ['group-intro', 'pillars', 'news', 'cooperation']) {
    assert.match(html, new RegExp(`data-home-section="${section}"[^>]+data-reveal="section"`))
  }
})

test('renders the enterprise services company page at its internal path', () => {
  const html = renderToStaticMarkup(React.createElement(App, { initialPath: '/companies/enterprise-services' }))

  assert.match(html, /data-business-site="enterprise-services"/)
  assert.match(html, /data-company-full-name="true">赣企出海创业服务（江西省）有限公司</)
  assert.match(html, /赣企出海创业服务（江西省）有限公司/)
  assert.match(html, /陪伴企业稳健成长，夯实出海经营基础/)
  assert.match(html, /工商注册/)
  assert.match(html, /项目申报/)
  assert.match(html, /<a[^>]+href="\/"[^>]+data-group-home="true"/)
  assert.match(html, /服务体系/)
  assert.match(html, /服务流程/)
  assert.match(html, /项目实景/)
  assert.match(html, /获取服务方案/)
  assert.match(html, /src="\/assets\/enterprise-services\/monthly-review\.jpg"[^>]+data-ratio="wide"/)
  assert.match(html, /友情链接/)
  assert.match(html, /赣企科技集团官网/)
  assert.match(html, /赣企出海国际会展/)
  assert.match(html, /赣教出海国际教育/)
})

test('renders the international education company page at its internal path', () => {
  const html = renderToStaticMarkup(React.createElement(App, { initialPath: '/companies/education' }))

  assert.match(html, /data-business-site="education"/)
  assert.match(html, /data-company-full-name="true">赣教出海国际教育科技（江西省）有限公司</)
  assert.match(html, /赣教出海国际教育科技（江西省）有限公司/)
  assert.match(html, /连接产业、教育与国际人才交流/)
  assert.match(html, /产教融合/)
  assert.match(html, /来华留学/)
  assert.match(html, /职教出海/)
  assert.match(html, /<a[^>]+href="\/"[^>]+data-group-home="true"/)
  assert.match(html, /获取合作方案/)
  assert.match(html, /src="\/assets\/education\/education-hero\.jpg"[^>]+data-ratio="wide"/)
  assert.match(html, /src="\/assets\/education\/teaching-results\.jpg"[^>]+data-ratio="portrait"/)
  assert.match(html, /友情链接/)
  assert.match(html, /赣企科技集团官网/)
  assert.match(html, /赣企出海国际会展/)
  assert.match(html, /赣企出海创业服务/)
})

test('renders the complete subsidiary homepage framework and front-end inquiry UI', () => {
  for (const path of ['/companies/enterprise-services', '/companies/education']) {
    const html = renderToStaticMarkup(React.createElement(App, { initialPath: path }))
    for (const section of ['hero', 'services', 'advantages', 'process', 'projects', 'faq', 'contact', 'footer']) {
      assert.match(html, new RegExp(`data-company-section="${section}"`))
    }
    for (const name of ['name', 'organization', 'phone', 'direction', 'message']) {
      assert.match(html, new RegExp(`name="${name}"`))
    }
    assert.match(html, /data-inquiry-ui="frontend-only"/)
  }
})

test('renders every group information route as a complete independent page', () => {
  const cases = [
    ['/about', '关于赣企科技集团'], ['/history', '发展历程'], ['/culture', '企业文化'],
    ['/honors', '荣誉资质'], ['/strategy', '北斗七星战略模型'], ['/companies', '旗下企业'], ['/global', '全球网络'],
  ]

  for (const [path, title] of cases) {
    const html = renderToStaticMarkup(React.createElement(App, { initialPath: path }))
    assert.match(html, new RegExp(`data-group-page="${path.slice(1)}"`))
    assert.match(html, new RegExp(title))
    assert.match(html, /data-page-hero="true"/)
  }
})

test('renders the eight-business overview and internal business detail routes', () => {
  const overview = renderToStaticMarkup(React.createElement(App, { initialPath: '/business' }))
  assert.match(overview, /data-group-page="business"/)
  assert.match(overview, /data-business-count="8"/)
  assert.match(overview, /国际会展/)
  assert.match(overview, /target="_blank"/)

  for (const key of ['ecommerce', 'trade', 'inspection', 'enterprise-services', 'study', 'education']) {
    const html = renderToStaticMarkup(React.createElement(App, { initialPath: `/business/${key}` }))
    assert.match(html, new RegExp(`data-business-detail="${key}"`))
    assert.match(html, /data-page-hero="true"/)
    assert.match(html, /href="\/contact"/)
  }
})

test('renders news, news detail, and contact inquiry pages', () => {
  const news = renderToStaticMarkup(React.createElement(App, { initialPath: '/news' }))
  assert.match(news, /data-group-page="news"/)
  assert.match(news, /新闻中心/)

  const detail = renderToStaticMarkup(React.createElement(App, { initialPath: '/news/group-framework' }))
  assert.match(detail, /data-news-detail="group-framework"/)
  assert.match(detail, /内容将在集团正式资料确认后发布/)

  const contact = renderToStaticMarkup(React.createElement(App, { initialPath: '/contact' }))
  assert.match(contact, /data-group-page="contact"/)
  for (const name of ['company', 'contact', 'phone', 'market', 'need']) assert.match(contact, new RegExp(`name="${name}"`))
  assert.match(contact, /data-inquiry-ui="frontend-only"/)
})
