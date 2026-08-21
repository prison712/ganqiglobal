import PageHero from '../components/PageHero.jsx'

const routeMap = {
  ecommerce: '/business/ecommerce', exhibition: null, trade: '/business/trade', inspection: '/business/inspection',
  services: '/companies/enterprise-services', study: '/companies/education', vocational: '/companies/education', education: '/companies/education',
}

export default function BusinessOverviewPage({ page, content, locale }) {
  const isZh = locale === 'zh'
  return (
    <div data-group-page="business">
      <PageHero page={page} locale={locale} />
      <section className="section-space"><div className="page-shell">
        <div className="group-content-heading"><span>OVERSEAS BUSINESS</span><h2>{content.businessesTitle}</h2><p>{content.businessesLead}</p></div>
        <div className="business-directory" data-business-count="8">
          {content.businesses.map((item, index) => {
            const href = item.id === 'exhibition' ? item.href : routeMap[item.id]
            return <a key={item.id} href={href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}><span>0{index + 1}</span><small>{item.external ? (isZh ? '独立会展子站' : 'EXHIBITION SITE') : 'GANQI OVERSEAS'}</small><h3>{item.title}</h3><p>{item.text}</p><b>{item.external ? (isZh ? '进入国际会展子站 ↗' : 'Visit exhibition site ↗') : (isZh ? '查看业务方向 →' : 'View business →')}</b></a>
          })}
        </div>
      </div></section>
    </div>
  )
}
