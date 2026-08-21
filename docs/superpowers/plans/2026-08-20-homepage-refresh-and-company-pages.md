# 赣企科技集团首页改版与子公司页面 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将集团首页改为以“赣企出海”为主品牌的极简沉浸式首页，并新增创业服务与国际教育科技两个站内子公司页面。

**Architecture:** 保留现有 Vite + React + Tailwind 项目，通过 `window.location.pathname` 选择首页或子公司页面，不增加路由依赖。双语内容继续集中维护，共享页头、页脚和咨询组件，真实图片与视频复制到 `public/assets` 后由页面引用。

**Tech Stack:** Vite 8, React 19, Tailwind CSS 4, Node test runner

**Spec:** `docs/superpowers/specs/2026-08-20-homepage-refresh-and-company-pages-design.md`

## Global Constraints

- 不修改父目录现有会展子站。
- 国际会展业务详情只存在于会展子站，集团站只保留外链摘要。
- 赣企出海为首页主品牌，亚税通属于旗下企业。
- 只使用用户提供素材和简章已确认的业务与数据。
- 表单和咨询入口只做前端展示，不发送或存储数据。
- 不新增 React Router 等第三方依赖。

---

### Task 1: 路由与内容契约

**Files:**
- Modify: `src/content/siteContent.js`
- Create: `src/content/companyContent.js`
- Create: `src/router.js`
- Test: `tests/siteContent.test.js`
- Test: `tests/router.test.js`

**Interfaces:**
- Produces: `resolveRoute(pathname)` 返回 `home | enterprise-services | education | not-found`。
- Produces: `companyContent[locale][route]`，提供子页面标题、简介、业务模块与图片。

- [ ] **Step 1: Write failing tests** 验证亚税通位于旗下企业、两个新增公司存在站内路径、国际会展保留外链，并验证 pathname 映射。
- [ ] **Step 2: Run tests to verify failure** 执行 `npm test`，预期因 `router.js`、新公司与内容结构不存在而失败。
- [ ] **Step 3: Implement minimal content and route resolver** 新增纯函数路由解析和双语子公司内容，更新首页业务与旗下企业链接。
- [ ] **Step 4: Run tests to verify pass** 执行 `npm test`，预期内容与路由测试通过。

### Task 2: 首页首屏与视频第二屏

**Files:**
- Modify: `src/App.jsx`
- Create: `src/pages/HomePage.jsx`
- Create: `src/components/SiteLayout.jsx`
- Modify: `src/styles.css`
- Copy: `../公司logo.png` to `public/assets/ganqi-logo.png`
- Copy: `../集团产业园照片.jpg` to `public/assets/group-office.jpg`
- Copy: `../企业宣传片.mp4` to `public/assets/company-film.mp4`
- Test: `tests/App.test.js`

**Interfaces:**
- Consumes: `siteContent[locale]`。
- Produces: 首页首屏、宣传片第二屏及其稳定语义标记。

- [ ] **Step 1: Write failing homepage tests** 断言新短标题、唯一首屏主入口、本地视频、三项核心数据和赣企出海 Logo 存在，旧轨道视觉文案不存在。
- [ ] **Step 2: Run test to verify failure** 执行 `npm test`，预期因新首页结构尚未实现而失败。
- [ ] **Step 3: Implement the minimal homepage structure** 拆出首页与共享布局，用真实背景图、深蓝遮罩和视频第二屏替换旧首屏与双品牌区域。
- [ ] **Step 4: Run tests to verify pass** 执行 `npm test`，预期首页测试通过。

### Task 3: 两个子公司页面

**Files:**
- Create: `src/pages/CompanyPage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles.css`
- Copy: enterprise-service images to `public/assets/enterprise-services/`
- Copy: education images to `public/assets/education/`
- Test: `tests/App.test.js`

**Interfaces:**
- Consumes: `resolveRoute()` 与 `companyContent`。
- Produces: `/companies/enterprise-services` 与 `/companies/education` 两个共享模板页面。

- [ ] **Step 1: Write failing route-render tests** 通过 `initialPath` 分别渲染两个路径，断言公司全称、对应业务模块、真实图片与返回首页入口。
- [ ] **Step 2: Run test to verify failure** 执行 `npm test`，预期因子页面组件尚未实现而失败。
- [ ] **Step 3: Implement company page template** 构建精简子页面首屏、业务模块、图片带和商务咨询区，并在首页卡片接入站内链接。
- [ ] **Step 4: Run tests to verify pass** 执行 `npm test`，预期两个子页面测试通过。

### Task 4: 响应式完善与最终验证

**Files:**
- Modify: `src/styles.css`
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Footer.jsx`
- Modify: `index.html`

**Interfaces:**
- Consumes: 三个已完成页面。
- Produces: PC、移动端一致的集团视觉和可访问交互。

- [ ] **Step 1: Add regression assertions** 覆盖移动菜单标签、外链安全属性、媒体资源路径和中英文内容结构。
- [ ] **Step 2: Run tests to verify any missing behavior fails** 执行 `npm test` 并确认失败原因对应缺失行为。
- [ ] **Step 3: Complete responsive and accessibility styles** 完成断点、焦点态、视频比例、图片裁切和 reduced-motion 规则。
- [ ] **Step 4: Verify production output** 依次执行 `npm test` 与 `npm run build`，并对三个路径进行本地响应检查。

