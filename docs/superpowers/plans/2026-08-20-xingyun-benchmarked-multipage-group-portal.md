# 赣企科技集团多页面门户实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有赣企科技集团单页首页改造成采用选定视觉方向的中英双语、多路由、完整 B2B 政企商务集团门户。

**Architecture:** 保留现有 Vite + React 应用与两个独立业务子站，通过 `siteMap` 提供统一路由与导航配置，通过 `pageContent` 提供中英文集团内页内容。集团站使用共享 `GroupHeader`、`GroupFooter` 和页面模板，业务子站继续使用独立布局；所有集团一级导航使用真实 URL。

**Tech Stack:** Vite 8、React 19、Tailwind CSS 4、JavaScript、Node `node:test`、React DOM server renderer、Playwright CLI。

**Spec:** `docs/superpowers/specs/2026-08-20-xingyun-benchmarked-multipage-group-portal-design.md`

## Global Constraints

- 只建设品牌展示、业务介绍和前端询盘，不建设商城、支付、会员、订单、CMS 或后端接口。
- 赣企出海是主品牌，亚税通是旗下企业。
- 已确认数字仅使用：服务 10,000+ 企业、覆盖 100+ 城市、500+ 海外合作机构。
- 国际会展详情仅存在于外部会展子站，集团站入口使用 `VITE_EXHIBITION_SITE_URL`。
- 企业服务与国际教育保留独立业务站布局，Logo 返回 `/`。
- 缺少正式资料时展示“内容将在集团正式资料确认后发布”，不得虚构事实。
- 中文与英文拥有相同路由和模块结构。
- 所有行为变更遵循测试先行；视觉 CSS 由结构测试与 Playwright 视觉验收共同约束。
- 当前目录不是 Git 仓库，不初始化或提交 Git；每个任务用全量测试通过作为检查点。

---

### Task 1: 建立多路由与导航单一配置源

**Files:**
- Create: `src/content/siteMap.js`
- Create: `src/content/pageContent.js`
- Modify: `src/router.js`
- Modify: `tests/router.test.js`
- Create: `tests/siteMap.test.js`

**Interfaces:**
- Produces: `siteMap[locale]`，包含 `primaryNav`、`footerGroups` 和外部链接元数据。
- Produces: `resolveRoute(pathname)`，返回 `{ type, key, slug? }`。
- Produces: `getPageContent(locale, key)`，返回栏目页内容或 `null`。

- [ ] **Step 1: 写多路由失败测试**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveRoute } from '../src/router.js'

test('resolves every group portal route', () => {
  const routes = {
    '/': 'home', '/about': 'about', '/history': 'history',
    '/culture': 'culture', '/honors': 'honors', '/business': 'business',
    '/strategy': 'strategy', '/companies': 'companies', '/global': 'global',
    '/news': 'news', '/contact': 'contact',
    '/business/cross-border-ecommerce': 'cross-border-ecommerce',
    '/business/foreign-trade': 'foreign-trade',
    '/business/inspection-tours': 'inspection-tours',
    '/business/study-in-china': 'study-in-china',
    '/business/vocational-education': 'vocational-education',
    '/business/industry-education': 'industry-education',
  }
  for (const [path, key] of Object.entries(routes)) {
    assert.equal(resolveRoute(path).key, key)
  }
  assert.deepEqual(resolveRoute('/news/group-update'), { type: 'news-detail', key: 'news-detail', slug: 'group-update' })
})
```

- [ ] **Step 2: 运行路由测试并确认因新路由尚未实现而失败**

Run: `node --test tests/router.test.js`  
Expected: FAIL，`resolveRoute('/about').key` 不是 `about`。

- [ ] **Step 3: 实现路由匹配**

```js
const staticRoutes = new Map([
  ['/', { type: 'group', key: 'home' }],
  ['/about', { type: 'group', key: 'about' }],
  ['/history', { type: 'group', key: 'history' }],
  ['/culture', { type: 'group', key: 'culture' }],
  ['/honors', { type: 'group', key: 'honors' }],
  ['/business', { type: 'group', key: 'business' }],
  ['/strategy', { type: 'group', key: 'strategy' }],
  ['/companies', { type: 'group', key: 'companies' }],
  ['/global', { type: 'group', key: 'global' }],
  ['/news', { type: 'group', key: 'news' }],
  ['/contact', { type: 'group', key: 'contact' }],
])

export function resolveRoute(pathname) {
  const cleanPath = pathname !== '/' ? pathname.replace(/\/$/, '') : '/'
  if (staticRoutes.has(cleanPath)) return staticRoutes.get(cleanPath)
  if (cleanPath.startsWith('/news/')) return { type: 'news-detail', key: 'news-detail', slug: cleanPath.slice(6) }
  if (cleanPath === '/companies/enterprise-services') return { type: 'business-site', key: 'enterprise-services' }
  if (cleanPath === '/companies/education') return { type: 'business-site', key: 'education' }
  if (cleanPath.startsWith('/business/')) return { type: 'business-detail', key: cleanPath.slice(10) }
  return { type: 'not-found', key: 'not-found' }
}
```

- [ ] **Step 4: 写导航失败测试**

```js
import { siteMap } from '../src/content/siteMap.js'

test('uses real page URLs for primary navigation in both locales', () => {
  for (const locale of ['zh', 'en']) {
    assert.deepEqual(siteMap[locale].primaryNav.map(item => item.href), [
      '/', '/about', '/business', '/companies', '/global', '/news', '/contact'
    ])
    assert.equal(siteMap[locale].primaryNav.some(item => item.href.startsWith('#')), false)
  }
})
```

- [ ] **Step 5: 创建 `siteMap` 与 `pageContent`**

```js
const exhibitionHref = import.meta.env?.VITE_EXHIBITION_SITE_URL || 'http://127.0.0.1:4174/'

export const siteMap = {
  zh: {
    primaryNav: [
      { label: '首页', href: '/' },
      { label: '关于集团', href: '/about', children: [
        { label: '集团介绍', href: '/about' }, { label: '发展历程', href: '/history' },
        { label: '企业文化', href: '/culture' }, { label: '荣誉资质', href: '/honors' },
      ] },
      { label: '业务体系', href: '/business', children: [
        { label: '业务总览', href: '/business' }, { label: '北斗七星战略', href: '/strategy' },
      ] },
      { label: '旗下企业', href: '/companies' },
      { label: '全球网络', href: '/global' },
      { label: '新闻中心', href: '/news' },
      { label: '联系我们', href: '/contact' },
    ],
    exhibitionHref,
  },
  en: {
    primaryNav: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about', children: [
        { label: 'Group Profile', href: '/about' }, { label: 'Milestones', href: '/history' },
        { label: 'Culture', href: '/culture' }, { label: 'Honors', href: '/honors' },
      ] },
      { label: 'Business', href: '/business', children: [
        { label: 'Overview', href: '/business' }, { label: 'Beidou Strategy', href: '/strategy' },
      ] },
      { label: 'Companies', href: '/companies' },
      { label: 'Global Network', href: '/global' },
      { label: 'News', href: '/news' },
      { label: 'Contact', href: '/contact' },
    ],
    exhibitionHref,
  },
}

export function getPageContent(locale, key) {
  return pageContent[locale]?.[key] || null
}
```

- [ ] **Step 6: 运行配置与路由测试**

Run: `node --test tests/router.test.js tests/siteMap.test.js`  
Expected: PASS。

---

### Task 2: 构建集团多页面页头、下拉导航、移动抽屉与页脚

**Files:**
- Create: `src/components/GroupHeader.jsx`
- Create: `src/components/GroupFooter.jsx`
- Modify: `src/components/SiteLayout.jsx`
- Modify: `src/App.jsx`
- Modify: `tests/App.test.js`

**Interfaces:**
- Consumes: `siteMap[locale].primaryNav`。
- Produces: `<GroupHeader currentPath locale onToggleLocale />`。
- Produces: `<GroupFooter locale />`。

- [ ] **Step 1: 写页头与独立 URL 失败测试**

```js
test('renders independent-page group navigation with dropdown groups', () => {
  const html = renderToStaticMarkup(<App initialPath="/about" />)
  assert.match(html, /data-group-header="true"/)
  assert.match(html, /href="\/about"/)
  assert.match(html, /href="\/history"/)
  assert.match(html, /href="\/business"/)
  assert.doesNotMatch(html, /href="#about"/)
  assert.match(html, /data-mobile-drawer="true"/)
  assert.match(html, /aria-current="page"/)
})
```

- [ ] **Step 2: 运行测试并确认集团页仍使用旧锚点 Header 而失败**

Run: `node --test tests/App.test.js`  
Expected: FAIL，缺少 `data-group-header` 与 `/history`。

- [ ] **Step 3: 实现共享集团页头**

```jsx
export default function GroupHeader({ locale, currentPath, onToggleLocale }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const nav = siteMap[locale].primaryNav
  return (
    <header className="group-header" data-group-header="true">
      <a className="group-brand" href="/"><img src="/assets/ganqi-logo.png" alt="赣企出海" /></a>
      <nav className="desktop-nav" aria-label={locale === 'zh' ? '集团主导航' : 'Group navigation'}>
        {nav.map(item => <NavItem key={item.href} item={item} currentPath={currentPath} />)}
      </nav>
      <button onClick={onToggleLocale} aria-label="language">{locale === 'zh' ? 'EN' : '中'}</button>
      <button className="drawer-trigger" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>Menu</button>
      <MobileDrawer open={drawerOpen} items={nav} onClose={() => setDrawerOpen(false)} />
    </header>
  )
}
```

- [ ] **Step 4: 实现完整页脚并让 `SiteLayout` 接收当前路径**

```jsx
export default function SiteLayout({ content, locale, currentPath, onToggleLocale, children }) {
  return <div lang={locale === 'zh' ? 'zh-CN' : 'en'}>
    <GroupHeader locale={locale} currentPath={currentPath} onToggleLocale={onToggleLocale} />
    <main>{children}</main>
    <GroupFooter locale={locale} />
  </div>
}
```

- [ ] **Step 5: 运行应用测试**

Run: `node --test tests/App.test.js`  
Expected: PASS，现有两个业务子站测试仍通过且不渲染集团页头。

---

### Task 3: 按选定视觉重建完整集团首页

**Files:**
- Create: `src/components/home/GroupIntro.jsx`
- Create: `src/components/home/BusinessPillars.jsx`
- Create: `src/components/home/CapabilityTabs.jsx`
- Create: `src/components/home/ExhibitionFeature.jsx`
- Create: `src/components/home/StrategySummary.jsx`
- Create: `src/components/home/PartnerWall.jsx`
- Create: `src/components/home/HomeNews.jsx`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/content/siteContent.js`
- Modify: `src/styles.css`
- Modify: `tests/App.test.js`

**Interfaces:**
- Consumes: `siteContent[locale]` 与 `siteMap[locale].exhibitionHref`。
- Produces: 12 个带 `data-home-section` 的首页楼层。
- Produces: `CapabilityTabs` 的本地选中状态，不改变 URL。

- [ ] **Step 1: 写首页楼层与跳转失败测试**

```js
test('renders the complete selected homepage framework', () => {
  const html = renderToStaticMarkup(<App initialPath="/" />)
  for (const section of ['hero', 'group-intro', 'pillars', 'capabilities', 'exhibition',
    'strategy', 'companies', 'global', 'partners', 'news', 'cooperation', 'footer']) {
    assert.match(html, new RegExp(`data-home-section="${section}"`))
  }
  assert.match(html, /href="\/about"/)
  assert.match(html, /href="\/business"/)
  assert.match(html, /href="\/strategy"/)
  assert.match(html, /href="\/news"/)
  assert.match(html, /href="\/contact"/)
})
```

- [ ] **Step 2: 运行测试并确认旧首页缺少楼层而失败**

Run: `node --test tests/App.test.js`  
Expected: FAIL，缺少 `capabilities`、`exhibition`、`partners` 等楼层标记。

- [ ] **Step 3: 重建首页组件树**

```jsx
export default function HomePage({ content, locale }) {
  return <>
    <HomeHero content={content.hero} data-home-section="hero" />
    <GroupIntro content={content.intro} stats={content.stats} locale={locale} />
    <BusinessPillars items={content.highValueBlocks} />
    <CapabilityTabs items={content.capabilities} />
    <ExhibitionFeature content={content.exhibitionFeature} />
    <StrategySummary strategy={content.strategy} />
    <CompanyMatrix compact locale={locale} />
    <GlobalSummary content={content.globalSummary} />
    <PartnerWall content={content.partners} />
    <HomeNews content={content.news} />
    <CooperationCta href="/contact" content={content.cta} />
  </>
}
```

- [ ] **Step 4: 实现首页视觉 CSS**

```css
.home-hero { min-height: 720px; background: #06284a; color: #fff; }
.home-hero__media { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.home-pillars { background: #062c51; color: #fff; }
.home-pillars__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.capability-layout { display: grid; grid-template-columns: .7fr 1.3fr; gap: 48px; }
@media (max-width: 767px) {
  .home-hero { min-height: 620px; }
  .home-pillars__grid, .capability-layout { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: 运行首页和内容测试**

Run: `node --test tests/App.test.js tests/siteContent.test.js`  
Expected: PASS。

- [ ] **Step 6: 保持开发服务运行并打开首个完整首页预览**

Run: `Invoke-WebRequest http://127.0.0.1:5173/ -UseBasicParsing`  
Expected: HTTP 200；使用现有 Codex 浏览器标签打开 `/`。

---

### Task 4: 实现集团介绍、历程、文化、荣誉、战略、企业与全球网络页面

**Files:**
- Create: `src/components/PageHero.jsx`
- Create: `src/components/PlaceholderNotice.jsx`
- Create: `src/pages/AboutPage.jsx`
- Create: `src/pages/HistoryPage.jsx`
- Create: `src/pages/CulturePage.jsx`
- Create: `src/pages/HonorsPage.jsx`
- Create: `src/pages/StrategyPage.jsx`
- Create: `src/pages/CompaniesPage.jsx`
- Create: `src/pages/GlobalPage.jsx`
- Modify: `src/App.jsx`
- Modify: `tests/App.test.js`

**Interfaces:**
- Consumes: `getPageContent(locale, route.key)`。
- Produces: 每个栏目页的 `data-page-key` 与统一 `PageHero`。

- [ ] **Step 1: 写集团内页失败测试**

```js
test('renders every group information page as an independent route', () => {
  const expected = {
    '/about': 'about', '/history': 'history', '/culture': 'culture',
    '/honors': 'honors', '/strategy': 'strategy', '/companies': 'companies', '/global': 'global'
  }
  for (const [path, key] of Object.entries(expected)) {
    const html = renderToStaticMarkup(<App initialPath={path} />)
    assert.match(html, new RegExp(`data-page-key="${key}"`))
    assert.match(html, /data-page-hero="true"/)
  }
})
```

- [ ] **Step 2: 运行测试并确认页面组件不存在而失败**

Run: `node --test tests/App.test.js`  
Expected: FAIL，缺少 `data-page-key="about"`。

- [ ] **Step 3: 创建统一内页 Hero 和各栏目页**

```jsx
export function PageHero({ page }) {
  return <section className="page-hero" data-page-hero="true">
    <img src={page.heroImage} alt="" />
    <div className="page-shell"><a href="/">首页</a><h1>{page.title}</h1><p>{page.lead}</p></div>
  </section>
}

export function AboutPage({ page }) {
  return <article data-page-key="about"><PageHero page={page} /><MissionVision page={page} /></article>
}
```

- [ ] **Step 4: 使用简章确认内容实现时间线、文化、荣誉、战略与企业矩阵**

时间线读取 `page.timeline`；荣誉读取 `page.honors`；缺少证书图时只渲染文字；全球网络不生成虚假坐标。

- [ ] **Step 5: 运行集团内页测试**

Run: `node --test tests/App.test.js tests/siteContent.test.js`  
Expected: PASS。

---

### Task 5: 实现业务总览与六个集团站内业务详情框架

**Files:**
- Create: `src/pages/BusinessOverviewPage.jsx`
- Create: `src/pages/BusinessDetailPage.jsx`
- Modify: `src/content/pageContent.js`
- Modify: `src/App.jsx`
- Modify: `tests/App.test.js`
- Modify: `tests/siteContent.test.js`

**Interfaces:**
- Consumes: `pageContent[locale].businessDetails[key]`。
- Produces: `<BusinessDetailPage business locale />`。
- 保留: `CompanyPage` 处理企业服务与国际教育子站。

- [ ] **Step 1: 写业务路由与边界失败测试**

```js
test('renders six internal business frameworks and keeps exhibitions external', () => {
  const keys = ['cross-border-ecommerce', 'foreign-trade', 'inspection-tours',
    'study-in-china', 'vocational-education', 'industry-education']
  for (const key of keys) {
    const html = renderToStaticMarkup(<App initialPath={`/business/${key}`} />)
    assert.match(html, new RegExp(`data-business-detail="${key}"`))
    assert.match(html, /核心服务|Core Services/)
  }
  const overview = renderToStaticMarkup(<App initialPath="/business" />)
  assert.match(overview, /target="_blank"/)
  assert.match(overview, /rel="noreferrer"/)
})
```

- [ ] **Step 2: 运行测试并确认业务详情页尚不存在而失败**

Run: `node --test tests/App.test.js`  
Expected: FAIL，缺少 `data-business-detail`。

- [ ] **Step 3: 实现业务详情模板**

```jsx
export default function BusinessDetailPage({ business, locale }) {
  const isZh = locale === 'zh'
  return <article data-business-detail={business.key}>
    <PageHero page={business} />
    <section><h2>{isZh ? '业务价值' : 'Business Value'}</h2><p>{business.value}</p></section>
    <section><h2>{isZh ? '核心服务' : 'Core Services'}</h2>
      {business.services.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
    </section>
    <section><h2>{isZh ? '合作流程' : 'Process'}</h2>{business.process.map(step => <span key={step}>{step}</span>)}</section>
    {business.childSiteHref && <a href={business.childSiteHref}>{isZh ? '进入专业业务站' : 'Visit business site'}</a>}
    <a href="/contact">{isZh ? '提交业务需求' : 'Submit an inquiry'}</a>
  </article>
}
```

- [ ] **Step 4: 保留两个独立业务子站并更新集团入口**

企业服务入口指向 `/companies/enterprise-services`；来华留学、职教出海和产教融合详情页提供 `/companies/education` 入口；会展始终使用外部 URL。

- [ ] **Step 5: 运行业务与子站回归测试**

Run: `node --test tests/App.test.js tests/companyContent.test.js tests/siteContent.test.js`  
Expected: PASS。

---

### Task 6: 实现新闻列表、新闻详情、联系页与前端询盘校验

**Files:**
- Create: `src/content/newsContent.js`
- Create: `src/lib/inquiryValidation.js`
- Create: `src/pages/NewsPage.jsx`
- Create: `src/pages/NewsDetailPage.jsx`
- Create: `src/pages/ContactPage.jsx`
- Modify: `src/App.jsx`
- Create: `tests/inquiryValidation.test.js`
- Modify: `tests/App.test.js`

**Interfaces:**
- Produces: `validateInquiry(values, locale)`，返回 `{ valid, errors }`。
- Produces: `getNewsArticle(locale, slug)`，无文章时返回 `null`。

- [ ] **Step 1: 写询盘校验失败测试**

```js
test('requires identity, contact, business and privacy consent', () => {
  const result = validateInquiry({ name: '', company: '', contact: '', business: '', consent: false }, 'zh')
  assert.equal(result.valid, false)
  assert.deepEqual(Object.keys(result.errors).sort(), ['business', 'company', 'consent', 'contact', 'name'])
})

test('accepts a complete inquiry without sending it', () => {
  const result = validateInquiry({
    name: '张先生', company: '示例制造企业', contact: 'example@company.com',
    business: '国际会展', market: '东南亚', message: '希望了解参展服务', consent: true,
  }, 'zh')
  assert.equal(result.valid, true)
  assert.deepEqual(result.errors, {})
})
```

- [ ] **Step 2: 运行校验测试并确认模块不存在而失败**

Run: `node --test tests/inquiryValidation.test.js`  
Expected: FAIL，无法导入 `inquiryValidation.js`。

- [ ] **Step 3: 实现纯函数校验**

```js
export function validateInquiry(values, locale) {
  const isZh = locale === 'zh'
  const errors = {}
  for (const key of ['name', 'company', 'contact', 'business']) {
    if (!values[key]?.trim()) errors[key] = isZh ? '此项为必填项' : 'Required'
  }
  if (values.contact && !/^\S+@\S+\.\S+$/.test(values.contact) && !/^1\d{10}$/.test(values.contact)) {
    errors.contact = isZh ? '请输入有效手机号或邮箱' : 'Enter a valid phone number or email'
  }
  if (!values.consent) errors.consent = isZh ? '请先同意隐私说明' : 'Consent is required'
  return { valid: Object.keys(errors).length === 0, errors }
}
```

- [ ] **Step 4: 写新闻与联系页失败测试并实现页面**

```js
test('renders news, missing-news and contact states', () => {
  assert.match(renderToStaticMarkup(<App initialPath="/news" />), /data-page-key="news"/)
  assert.match(renderToStaticMarkup(<App initialPath="/news/content-status" />), /data-news-detail="content-status"/)
  assert.match(renderToStaticMarkup(<App initialPath="/news/missing" />), /data-news-not-found="true"/)
  assert.match(renderToStaticMarkup(<App initialPath="/contact" />), /data-inquiry-form="true"/)
})
```

`ContactPage` 使用 React 本地状态；校验通过后显示“需求信息已完成前端校验，正式提交接口将在集团确认后接入”，不调用 `fetch`。

- [ ] **Step 5: 运行新闻、联系与全量应用测试**

Run: `node --test tests/inquiryValidation.test.js tests/App.test.js`  
Expected: PASS。

---

### Task 7: 完成响应式、可访问性与业务子站兼容样式

**Files:**
- Modify: `src/styles.css`
- Modify: `src/components/GroupHeader.jsx`
- Modify: `src/pages/CompanyPage.jsx`
- Modify: `tests/App.test.js`

**Interfaces:**
- Produces: 桌面下拉、移动抽屉、焦点状态、Reduced Motion 与比例感知图片布局。

- [ ] **Step 1: 写可访问结构失败测试**

```js
test('exposes accessible navigation and image ratio semantics', () => {
  const group = renderToStaticMarkup(<App initialPath="/" />)
  assert.match(group, /aria-label="集团主导航"/)
  assert.match(group, /aria-expanded="false"/)
  assert.match(group, /aria-controls="mobile-navigation"/)
  const education = renderToStaticMarkup(<App initialPath="/companies/education" />)
  assert.match(education, /data-ratio="portrait"/)
  assert.match(education, /data-group-home="true"/)
})
```

- [ ] **Step 2: 运行测试并确认抽屉语义尚不完整而失败**

Run: `node --test tests/App.test.js`  
Expected: FAIL，缺少 `aria-controls="mobile-navigation"`。

- [ ] **Step 3: 补齐抽屉键盘行为与滚动锁定**

`GroupHeader` 在抽屉打开时监听 Escape、恢复关闭按钮焦点并设置 `document.body.style.overflow = 'hidden'`；卸载时恢复。

- [ ] **Step 4: 完成响应式 CSS**

```css
@media (max-width: 1023px) { .desktop-nav { display: none; } .drawer-trigger { display: inline-flex; } }
@media (max-width: 767px) {
  .page-shell { width: min(100% - 30px, 1240px); }
  .home-pillars__grid, .news-grid, .company-matrix { grid-template-columns: 1fr; }
  .project-portrait img { object-fit: contain; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

- [ ] **Step 5: 运行全量测试**

Run: `npm test`  
Expected: 全部 PASS，0 failures。

---

### Task 8: 生产构建、Playwright 路由验证与视觉 QA

**Files:**
- Create: `design-qa.md`
- Create: `design-references/ganqi-portal-desktop.png`
- Create: `design-references/ganqi-portal-mobile.png`
- Modify as required by QA: `src/styles.css` and affected components

**Interfaces:**
- Consumes: 选定视觉 `design-references/ganqi-selected-homepage-direction.png`。
- Produces: `design-qa.md`，最终一行必须为 `final result: passed`。

- [ ] **Step 1: 运行新鲜全量验证**

Run: `npm test; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; npm run build`  
Expected: tests 0 failures，Vite build exit 0。

- [ ] **Step 2: 验证所有公开路由返回 200**

```powershell
$paths = @('/', '/about', '/history', '/culture', '/honors', '/business', '/strategy', '/companies', '/global', '/news', '/contact', '/companies/enterprise-services', '/companies/education')
foreach ($path in $paths) {
  $response = Invoke-WebRequest -Uri "http://127.0.0.1:5173$path" -UseBasicParsing
  if ($response.StatusCode -ne 200) { throw "$path failed" }
}
```

- [ ] **Step 3: 用已获授权的 Playwright 采集相同视口截图**

Run: `playwright screenshot --browser chromium --viewport-size "1440,1000" --wait-for-timeout 1500 --full-page http://127.0.0.1:5173/ design-references/ganqi-portal-desktop.png`  
Run: `playwright screenshot --browser chromium --viewport-size "390,844" --wait-for-timeout 1500 --full-page http://127.0.0.1:5173/ design-references/ganqi-portal-mobile.png`

- [ ] **Step 4: 对比选定视觉与实现截图并写 QA 报告**

`design-qa.md` 必须记录同一视口下的：页头、首屏、集团介绍、深蓝业务区、服务优势、会展入口、合作伙伴、新闻、页脚、移动导航、图片裁切、字体、留白、圆角与控制台错误检查。P0/P1/P2 必须修复；P3 可记录为后续微调。

- [ ] **Step 5: 修复视觉差异后重复测试、构建和截图**

Run: `npm test; if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }; npm run build`  
Expected: 0 failures，build exit 0，`design-qa.md` 以 `final result: passed` 结束。

- [ ] **Step 6: 保持本地预览运行并交付三个入口**

交付集团首页 `/`、企业服务子站 `/companies/enterprise-services` 和国际教育子站 `/companies/education`；不部署公网。
