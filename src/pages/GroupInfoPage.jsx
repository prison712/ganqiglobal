import PageHero from '../components/PageHero.jsx'
import { contentStatus } from '../content/pageContent.js'

function ContentHeading({ eyebrow, title, lead }) {
  return <div className="group-content-heading"><span>{eyebrow}</span><h2>{title}</h2>{lead && <p>{lead}</p>}</div>
}

function AboutContent({ content, locale }) {
  const isZh = locale === 'zh'
  return (
    <>
      <section className="section-space"><div className="page-shell group-about-grid"><div><ContentHeading eyebrow="ABOUT GANQI" title={content.intro.title} lead={content.intro.text} /><div className="group-inline-stats">{content.stats.slice(0, 3).map((item) => <div key={item.key}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div></div><figure><img src="/assets/group-office.jpg" alt={isZh ? '赣企科技集团办公环境' : 'Ganqi Technology Group office'} /></figure></div></section>
      <section className="group-dual-brands section-space"><div className="page-shell"><ContentHeading eyebrow="DUAL BRANDS" title={isZh ? '双品牌协同发展' : 'Two brands, one coordinated ecosystem'} /><div className="dual-brand-grid"><article><span>GANQI OVERSEAS</span><h3>{isZh ? '赣企出海' : 'Ganqi Overseas'}</h3><p>{isZh ? '聚焦中国企业全球化发展与出海服务连接。' : 'Focused on enterprise globalization and overseas service connections.'}</p></article><article><span>YASHUITONG</span><h3>{isZh ? '亚税通' : 'Yashuitong'}</h3><p>{isZh ? '集团旗下企业服务品牌，相关业务以正式资料为准。' : 'The group enterprise-service brand; details are subject to approved materials.'}</p></article></div></div></section>
    </>
  )
}

function HistoryContent({ page, locale }) {
  return <section className="section-space"><div className="page-shell"><ContentHeading eyebrow="2018—2026" title={locale === 'zh' ? '持续构建企业成长与出海服务能力' : 'Building enterprise growth and globalization capabilities'} lead={contentStatus[locale]} /><div className="history-timeline">{page.years.map((year) => <article key={year}><strong>{year}</strong><span>{contentStatus[locale]}</span></article>)}</div></div></section>
}

function CultureContent({ locale }) {
  const isZh = locale === 'zh'
  const values = isZh ? [['专业立身', '以专业能力创造长期价值'], ['诚信致远', '以诚信建立持续合作'], ['创新驱动', '以创新回应市场变化'], ['协作共赢', '以协作连接多方资源']] : [['Professionalism', 'Create long-term value through expertise'], ['Integrity', 'Build lasting relationships through trust'], ['Innovation', 'Respond to changing markets'], ['Collaboration', 'Connect resources for shared growth']]
  return <section className="section-space"><div className="page-shell"><ContentHeading eyebrow="CORE VALUES" title={isZh ? '核心价值观' : 'Core Values'} lead={contentStatus[locale]} /><div className="culture-grid">{values.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
}

function HonorsContent({ page, locale }) {
  return <section className="section-space"><div className="page-shell status-layout"><ContentHeading eyebrow="HONORS & QUALIFICATIONS" title={page.title} lead={page.notice || contentStatus[locale]} /><div className="publication-status"><span>{locale === 'zh' ? '资料状态' : 'CONTENT STATUS'}</span><strong>{locale === 'zh' ? '荣誉证书与资质图片待集团确认' : 'Honors and qualifications pending group approval'}</strong><p>{contentStatus[locale]}</p></div></div></section>
}

function StrategyContent({ content, locale }) {
  return <section className="section-space"><div className="page-shell"><ContentHeading eyebrow={content.strategy.eyebrow} title={content.strategy.title} lead={content.strategy.text} /><div className="strategy-detail-grid">{content.strategy.items.map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{contentStatus[locale]}</p></article>)}</div></div></section>
}

function CompaniesContent({ content, locale }) {
  const isZh = locale === 'zh'
  const companies = [
    { name: '赣企出海国际会展（江西省）有限公司', role: isZh ? '国际会展' : 'International exhibitions', href: content.exhibitionHref, external: true },
    { name: '赣企出海创业服务（江西省）有限公司', role: isZh ? '企业服务' : 'Enterprise services', href: '/companies/enterprise-services' },
    { name: '赣教出海国际教育科技（江西省）有限公司', role: isZh ? '产教融合与国际教育' : 'Education and industry integration', href: '/companies/education' },
    { name: isZh ? '亚税通' : 'Yashuitong', role: isZh ? '集团企业服务品牌' : 'Enterprise service brand' },
    { name: '赣企出海国际进出口贸易（江西省）有限公司', role: isZh ? '国际进出口贸易' : 'Import and export trade' },
    { name: '赣品出海国际供应链（江西省）有限公司', role: isZh ? '国际供应链' : 'International supply chain' },
  ]
  return <section className="section-space"><div className="page-shell"><ContentHeading eyebrow="GROUP ECOSYSTEM" title={isZh ? '旗下企业与品牌' : 'Group Companies and Brands'} lead={isZh ? '点击已建子站企业进入独立业务网站；其余信息将在资料确认后完善。' : 'Open available business sites or view confirmed group information.'} /><div className="company-directory">{companies.map((company, index) => { const Tag = company.href ? 'a' : 'article'; return <Tag key={company.name} href={company.href} target={company.external ? '_blank' : undefined} rel={company.external ? 'noreferrer' : undefined}><span>0{index + 1}</span><small>{company.role}</small><h3>{company.name}</h3><b>{company.href ? (company.external ? (isZh ? '进入会展子站 ↗' : 'Visit exhibition site ↗') : (isZh ? '进入业务子站 →' : 'Visit business site →')) : (isZh ? '集团成员企业' : 'Group company')}</b></Tag>})}</div></div></section>
}

function GlobalContent({ content, locale }) {
  const isZh = locale === 'zh'
  return <><section className="global-page-feature"><img src="/assets/home/global-hero.png" alt="" /><div className="page-shell"><ContentHeading eyebrow="GLOBAL CONNECTIONS" title={isZh ? '连接全球市场与专业资源' : 'Connecting global markets and professional resources'} lead={isZh ? '以海外合作机构、商协会、产业资源和院校网络，支持企业全球化布局。' : 'Supporting enterprise expansion with international partners, associations, industries and institutions.'} /><div className="group-inline-stats">{content.stats.slice(1, 3).map((item) => <div key={item.key}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div></div></section><section className="section-space"><div className="page-shell"><ContentHeading eyebrow="PARTNER NETWORK" title={content.partners.title} lead={content.partners.text} /><div className="partner-wall">{content.partners.categories.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><small>{isZh ? '合作资料待确认' : 'Partner details pending'}</small></div>)}</div></div></section></>
}

export default function GroupInfoPage({ pageKey, page, content, locale }) {
  const renderContent = () => {
    if (pageKey === 'about') return <AboutContent content={content} locale={locale} />
    if (pageKey === 'history') return <HistoryContent page={page} locale={locale} />
    if (pageKey === 'culture') return <CultureContent locale={locale} />
    if (pageKey === 'honors') return <HonorsContent page={page} locale={locale} />
    if (pageKey === 'strategy') return <StrategyContent content={content} locale={locale} />
    if (pageKey === 'companies') return <CompaniesContent content={content} locale={locale} />
    if (pageKey === 'global') return <GlobalContent content={content} locale={locale} />
    return null
  }

  return <div data-group-page={pageKey}><PageHero page={page} locale={locale} />{renderContent()}</div>
}
