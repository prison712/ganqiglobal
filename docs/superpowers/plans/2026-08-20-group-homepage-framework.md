# 赣企科技集团首页基础框架 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立独立、可运行、双语响应式的赣企科技集团首页基础框架。

**Architecture:** 在 `group-site` 中使用 Vite、React、Tailwind CSS 和 Vitest。内容集中在双语数据文件，页面组件按导航、业务内容和页脚拆分；本轮只有首页路由。

**Tech Stack:** Vite, React, Tailwind CSS, Vitest, Testing Library

**Spec:** `docs/superpowers/specs/2026-08-20-group-homepage-framework-design.md`

## Global Constraints

- 不修改父目录现有会展子站。
- 国际会展只做外链入口，不建设详情。
- 表单只做前端展示，不发送或存储数据。
- 只使用简章已确认的业务、文化、数据和企业名称。
- 首期只交付集团首页框架。

---

### Task 1: 项目脚手架与内容契约

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/styles.css`
- Create: `src/content/siteContent.js`
- Test: `src/content/siteContent.test.js`

- [ ] 写内容契约测试，验证中英文、四大板块、八大业务和会展外链标记。
- [ ] 运行测试并确认因内容模块缺失而失败。
- [ ] 创建最小项目配置和内容模块。
- [ ] 运行测试并确认通过。

### Task 2: 首页结构与关键交互

**Files:**
- Create: `src/App.jsx`
- Create: `src/components/Header.jsx`, `src/components/BusinessGrid.jsx`, `src/components/Footer.jsx`
- Test: `src/App.test.jsx`

- [ ] 写首页行为测试，覆盖集团标题、语言切换、八项业务、会展外链和咨询入口。
- [ ] 运行测试并确认因组件缺失而失败。
- [ ] 实现首页结构与交互。
- [ ] 运行测试并确认通过。

### Task 3: 响应式视觉与验收

**Files:**
- Modify: `src/styles.css`, `src/App.jsx`, `src/components/*.jsx`

- [ ] 完成蓝橙视觉、响应式导航、移动菜单和可访问焦点状态。
- [ ] 运行全部测试。
- [ ] 运行生产构建。
- [ ] 启动本地预览并检查桌面与移动端关键区域。
