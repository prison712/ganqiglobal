import { useState } from 'react'
import { siteNetwork } from '../content/siteNetwork.js'

function Brand({ company, light = false }) {
  return (
    <a href="/" data-group-home="true" className={`business-site-brand ${light ? 'business-site-brand-light' : ''}`} aria-label="返回赣企科技集团官网">
      <img src="/assets/ganqi-logo.png" alt="赣企科技集团" />
      <span><strong data-company-full-name="true">{company.name}</strong><small>GANQI TECHNOLOGY GROUP</small></span>
    </a>
  )
}

function SectionHeading({ eyebrow, title, text, inverse = false }) {
  return (
    <div className={`business-section-heading ${inverse ? 'business-section-heading-light' : ''}`}>
      <p>{eyebrow}</p><h2>{title}</h2><span>{text}</span>
    </div>
  )
}

export default function CompanyPage({ company, locale, onToggleLocale }) {
  const isZh = locale === 'zh'
  const [submitted, setSubmitted] = useState(false)
  const anchors = ['#top', '#services', '#advantages', '#process', '#projects', '#faq', '#contact']

  function handleInquiry(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="business-site" data-business-site={company.route} lang={isZh ? 'zh-CN' : 'en'}>
      <div className="business-site-topbar">
        <div className="page-shell"><span>{company.topbar}</span><a href="/">{isZh ? '返回集团官网' : 'Group Website'} ↗</a></div>
      </div>

      <header className="business-site-header">
        <div className="page-shell business-site-header-inner">
          <Brand company={company} />
          <nav aria-label={isZh ? '子站主导航' : 'Subsite navigation'}>
            {company.nav.map((item, index) => <a key={item} href={anchors[index]}>{item}</a>)}
          </nav>
          <button type="button" className="language-button" onClick={onToggleLocale} aria-label={isZh ? 'Switch to English' : '切换至中文'}>{isZh ? 'EN' : '中'}</button>
        </div>
      </header>

      <main>
        <section id="top" className="business-site-hero" data-company-section="hero">
          <img src={company.heroImage} alt={company.heroAlt} data-ratio="wide" fetchPriority="high" />
          <div className="business-site-hero-shade" aria-hidden="true" />
          <div className="page-shell business-site-hero-content">
            <div>
              <p>{company.eyebrow}</p>
              <h1>{company.title}</h1>
              <strong>{company.name}</strong>
              <span>{company.lead}</span>
              <div className="business-site-hero-actions">
                <a className="button button-primary" href="#contact">{company.primaryCta}<b aria-hidden="true">→</b></a>
                <a className="button button-ghost" href="#services">{isZh ? '了解业务体系' : 'Explore Services'}</a>
              </div>
            </div>
          </div>
          <div className="page-shell business-trust-panel">
            {company.trustPoints.map((point, index) => (
              <div key={point.title}><span>0{index + 1}</span><strong>{point.title}</strong><small>{point.text}</small></div>
            ))}
          </div>
        </section>

        <section id="services" className="business-services section-space scroll-mt-20" data-company-section="services">
          <div className="page-shell">
            <SectionHeading eyebrow="SERVICE SYSTEM" title={isZh ? '核心业务体系' : 'Core Service System'} text={company.sectionIntro} />
            <div className={`business-service-grid ${company.modules.length === 3 ? 'business-service-grid-three' : ''}`}>
              {company.modules.map((module) => (
                <article key={module.number}>
                  <span>{module.number}</span><i aria-hidden="true">↗</i><h3>{module.title}</h3><p>{module.text}</p>
                  <a href="#contact">{isZh ? '咨询此项服务' : 'Discuss this service'} →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="advantages" className="business-advantages section-space scroll-mt-20" data-company-section="advantages">
          <div className="page-shell business-advantages-layout">
            <figure>
              <img src={company.advantagesImage} alt={isZh ? `${company.shortName}业务合作现场` : `${company.shortName} cooperation in action`} loading="lazy" />
              <figcaption><span>{company.shortName}</span><strong>{isZh ? '真实团队 · 真实项目 · 专业协同' : 'Real team · Real projects · Professional coordination'}</strong></figcaption>
            </figure>
            <div>
              <SectionHeading eyebrow="WHY GANQI" title={isZh ? '从需求出发，让合作更稳健' : 'Built Around Real Needs'} text={isZh ? '清晰的业务边界、专业的协同方式和可持续的服务连接。' : 'Clear scope, professional coordination and sustainable service connections.'} />
              <div className="business-advantage-list">
                {company.advantages.map((item, index) => (
                  <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="business-process section-space scroll-mt-20" data-company-section="process">
          <div className="page-shell business-process-layout">
            <SectionHeading inverse eyebrow="SERVICE PROCESS" title={isZh ? (company.route === 'education' ? '合作流程' : '服务流程') : 'Our Process'} text={isZh ? '以标准化流程衔接需求、资源与项目执行。' : 'A structured path from needs and resources to delivery.'} />
            <ol className="business-process-list">
              {company.process.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}
            </ol>
          </div>
        </section>

        <section id="projects" className="business-projects section-space scroll-mt-20" data-company-section="projects">
          <div className="page-shell">
            <SectionHeading eyebrow="REAL PROJECTS" title={isZh ? '真实项目实景' : 'Projects in Action'} text={isZh ? '根据现场图片比例组织版位，呈现真实业务活动与合作场景。' : 'Real business activities presented in image-first layouts.'} />
            <div className="business-project-grid">
              {company.images.map((image, index) => (
                <figure key={image.src} className={`project-${image.ratio}`}>
                  <img src={image.src} alt={image.alt} loading="lazy" data-ratio={image.ratio} />
                  <figcaption><span>0{index + 1}</span><strong>{image.label}</strong><small>{image.alt}</small></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="business-faq section-space scroll-mt-20" data-company-section="faq">
          <div className="page-shell business-faq-layout">
            <SectionHeading eyebrow="FAQ" title={isZh ? '常见问题' : 'Frequently Asked Questions'} text={isZh ? '先了解合作中最常见的问题，再与业务团队进一步沟通。' : 'Answers to common questions before a deeper conversation with our team.'} />
            <div className="business-faq-list">
              {company.faqs.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary><span>0{index + 1}</span>{item.question}<i aria-hidden="true">+</i></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="business-site-contact scroll-mt-20" data-company-section="contact">
          <div className="page-shell business-contact-layout">
            <div className="business-contact-copy">
              <p>BUSINESS COOPERATION</p>
              <h2>{company.contactTitle}</h2>
              <span>{isZh ? '留下您的基本信息与需求方向，业务团队将根据实际情况与您进一步沟通。' : 'Share your organization and needs so the relevant team can continue the conversation.'}</span>
              <a href="mailto:1470077062@qq.com">1470077062@qq.com <b aria-hidden="true">↗</b></a>
            </div>
            <form className="business-inquiry-form" data-inquiry-ui="frontend-only" onSubmit={handleInquiry}>
              <div><label htmlFor={`${company.route}-name`}>{isZh ? '姓名' : 'Name'}</label><input id={`${company.route}-name`} name="name" required /></div>
              <div><label htmlFor={`${company.route}-organization`}>{isZh ? '企业 / 院校 / 机构' : 'Organization'}</label><input id={`${company.route}-organization`} name="organization" required /></div>
              <div><label htmlFor={`${company.route}-phone`}>{isZh ? '联系电话' : 'Phone'}</label><input id={`${company.route}-phone`} name="phone" type="tel" required /></div>
              <div><label htmlFor={`${company.route}-direction`}>{isZh ? '需求方向' : 'Direction'}</label><select id={`${company.route}-direction`} name="direction" required defaultValue=""><option value="" disabled>{isZh ? '请选择' : 'Select'}</option>{company.inquiryOptions.map((option) => <option key={option}>{option}</option>)}</select></div>
              <div className="business-inquiry-message"><label htmlFor={`${company.route}-message`}>{isZh ? '需求说明' : 'Message'}</label><textarea id={`${company.route}-message`} name="message" rows="4" /></div>
              <button className="button button-primary" type="submit">{company.primaryCta} <span aria-hidden="true">→</span></button>
              <p className="business-form-status" aria-live="polite">{submitted ? (isZh ? '信息已记录（当前为前端演示，尚未接入后台）。' : 'Information recorded in this front-end demo.') : (isZh ? '当前表单仅作前端展示，不会自动发送数据。' : 'Front-end demonstration only; data is not transmitted.')}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="business-site-footer" data-company-section="footer">
        <div className="page-shell business-site-footer-main">
          <div className="business-site-footer-brand">
            <Brand company={company} light />
            <p>{company.name}</p>
            <span>{isZh ? '赣企科技集团旗下业务平台' : 'A business platform of Ganqi Technology Group'}</span>
          </div>
          <div className="business-site-friend-links">
            <h2>{isZh ? '友情链接' : 'SITE NETWORK'}</h2>
            {siteNetwork.map((site) => {
              const isCurrent = site.id === company.route
              return isCurrent ? (
                <span key={site.id} aria-current="page">{isZh ? site.labelZh : site.labelEn}</span>
              ) : (
                <a key={site.id} href={site.href} {...(site.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {isZh ? site.labelZh : site.labelEn}<i aria-hidden="true">↗</i>
                </a>
              )
            })}
          </div>
          <div className="business-site-footer-nav">
            <h2>{isZh ? '快速导航' : 'QUICK LINKS'}</h2>
            {company.nav.slice(1).map((item, index) => <a key={item} href={anchors[index + 1]}>{item}</a>)}
          </div>
          <a className="business-site-group-return" href="/">{isZh ? '返回集团首页' : 'Back to Group Home'} →</a>
        </div>
        <div className="business-site-footer-bottom"><div className="page-shell">© 2026 {company.shortName}<span>{isZh ? '集团站群 · 中文 / English' : 'Group network · 中文 / English'}</span></div></div>
      </footer>

      <a href="#contact" className="floating-contact" aria-label={company.primaryCta}><span>+</span><strong>{isZh ? '咨询' : 'Talk'}</strong></a>
    </div>
  )
}
