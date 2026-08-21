import { useEffect } from 'react'
import { initRevealAnimations } from '../reveal.js'

function SectionHeading({ eyebrow, title, lead, action }) {
  return (
    <div className="home-section-heading">
      <div>
        {eyebrow && <span>{eyebrow}</span>}
        <h2>{title}</h2>
        {lead && <p>{lead}</p>}
      </div>
      {action && <a href={action.href}>{action.label}<b aria-hidden="true">→</b></a>}
    </div>
  )
}

export default function HomePage({ content, locale }) {
  const isZh = locale === 'zh'
  const highValueCards = [
    { ...content.highValueBlocks[0], href: '/business/ecommerce', image: '/assets/home/ecommerce-meeting.jpg' },
    { ...content.highValueBlocks[1], href: content.exhibitionHref, image: '/assets/home/exhibition-team.jpg', external: true },
    { ...content.highValueBlocks[2], href: '/companies/enterprise-services', image: '/assets/enterprise-services/government-exchange.jpg' },
    { ...content.highValueBlocks[3], href: '/companies/education', image: '/assets/education/education-hero.jpg' },
    {
      number: '05',
      title: isZh ? '更多业务' : 'More Business',
      subtitle: isZh ? '八大业务矩阵' : 'Eight-business matrix',
      text: isZh ? '进入集团业务总览，查看八大海外业务及对应服务入口。' : 'Explore the complete eight-business matrix and service destinations.',
      href: '/business',
      image: '/assets/group-office.jpg',
      more: true,
    },
  ]
  const news = isZh ? [
    { category: '会展现场', title: '赣企出海组织企业赴巴西国际新能源汽配展', image: '/assets/home/exhibition-team.jpg', status: '真实业务现场' },
    { category: '企业服务', title: '企业服务与政企交流动态', image: '/assets/enterprise-services/government-exchange.jpg', status: '详细内容待补充' },
    { category: '产教融合', title: '校企合作与教学能力提升动态', image: '/assets/education/school-enterprise-2.jpg', status: '详细内容待补充' },
  ] : [
    { category: 'EXHIBITION', title: 'Ganqi Overseas at the Brazil new energy auto parts exhibition', image: '/assets/home/exhibition-team.jpg', status: 'Real project activity' },
    { category: 'ENTERPRISE SERVICES', title: 'Enterprise and public-sector service exchange', image: '/assets/enterprise-services/government-exchange.jpg', status: 'Details pending' },
    { category: 'EDUCATION', title: 'Industry-education cooperation and teaching development', image: '/assets/education/school-enterprise-2.jpg', status: 'Details pending' },
  ]

  useEffect(() => initRevealAnimations(document), [])

  return (
    <>
      <section className="group-home-hero" data-home-section="hero">
        <img src="/assets/home/global-hero.png" alt="" aria-hidden="true" />
        <div className="group-home-hero-shade" aria-hidden="true" />
        <div className="page-shell group-home-hero-content">
          <p data-home-enter="1">GANQI OVERSEAS · GANQI TECHNOLOGY GROUP</p>
          <h1 data-home-enter="2">{content.hero.title}</h1>
          <strong data-home-enter="3">{content.hero.description}</strong>
          <a href="/business" className="button button-primary" data-hero-cta="primary" data-home-enter="4">{isZh ? '了解集团业务' : 'Explore our business'}<span aria-hidden="true">→</span></a>
        </div>
        <div className="hero-pagination" aria-hidden="true"><b>01</b><span /><small>03</small></div>
      </section>

      <section className="home-intro section-space" data-home-section="group-intro" data-reveal="section">
        <div className="page-shell home-intro-grid">
          <div className="film-frame home-film">
            <video src="/assets/company-film.mp4" poster="/assets/group-office.jpg" controls playsInline preload="metadata" aria-label={isZh ? '赣企科技集团企业宣传片' : 'Ganqi Technology Group corporate film'} />
            <span>{isZh ? '集团宣传片' : 'CORPORATE FILM'}</span>
          </div>
          <div className="home-intro-copy">
            <p className="home-eyebrow">GROUP PROFILE</p>
            <h2>{isZh ? '赣企科技集团' : 'Ganqi Technology Group'}</h2>
            <p>{content.intro.text}</p>
            <div className="story-stats" data-core-stats="3">
              {content.stats.slice(0, 3).map((stat) => <div key={stat.key}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
            </div>
            <a className="text-link" href="/about">{isZh ? '了解集团更多' : 'Discover the group'} <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="home-pillars section-space" data-home-section="pillars" data-reveal="section">
        <div className="page-shell">
          <SectionHeading eyebrow="GROUP BUSINESS" title={content.blocksTitle} lead={isZh ? '四项核心业务板块，连接集团八大业务及对应专业子站。' : 'Four core pillars connected to the complete eight-business matrix.'} action={{ href: '/business', label: isZh ? '查看八大业务' : 'View all business' }} />
          <div className="pillar-grid">
            {highValueCards.map((card) => (
              <a
                key={card.number}
                data-high-value-card={card.number}
                data-more-business={card.more ? 'true' : undefined}
                className={`pillar-card ${card.more ? 'pillar-card-more' : ''}`}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noreferrer' : undefined}
              >
                <img src={card.image} alt="" /><div className="pillar-card-shade" />
                <div><span>{card.number}</span><small>{card.subtitle}</small><h3>{card.title}</h3><p>{card.text}</p><b>{card.more ? (isZh ? '查看完整矩阵 →' : 'View full matrix →') : (isZh ? '了解详情 →' : 'Learn more →')}</b></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-news section-space" data-home-section="news" data-reveal="section">
        <div className="page-shell">
          <SectionHeading eyebrow="NEWS CENTER" title={isZh ? '新闻资讯' : 'News & Insights'} lead={isZh ? '集团动态、真实业务现场与项目进展。' : 'Group updates, real business activity and project progress.'} action={{ href: '/news', label: isZh ? '查看全部新闻' : 'View all news' }} />
          <div className="home-news-grid">{news.map((item) => <a href="/news" key={item.title} className="home-news-card"><img src={item.image} alt="" /><div><span>{item.category}</span><small>{item.status}</small><h3>{item.title}</h3><b aria-hidden="true">→</b></div></a>)}</div>
        </div>
      </section>

      <section className="home-cooperation" data-home-section="cooperation" data-reveal="section">
        <div className="page-shell"><p className="home-eyebrow">{content.cta.eyebrow}</p><h2>{content.cta.title}</h2><p>{content.cta.text}</p><a href="/contact" className="button button-primary">{content.cta.button}</a></div>
      </section>
    </>
  )
}
