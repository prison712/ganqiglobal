import PageHero from '../components/PageHero.jsx'
import { contentStatus } from '../content/pageContent.js'

const detailMap = {
  zh: {
    ecommerce: ['跨境电商', '品牌出海加速器', '自营实战驱动品牌出海运营与市场验证。', '/assets/enterprise-services/monthly-review.jpg'],
    trade: ['传统外贸', '连接市场与贸易履约', '围绕市场调研、客户开发与供应链协同提供业务支持。', '/assets/enterprise-services/chamber-exchange.jpg'],
    inspection: ['海外考察团', '以实地连接辅助市场决策', '定制海外考察方向，连接当地市场、机构与产业资源。', '/assets/enterprise-services/government-exchange.jpg'],
    'enterprise-services': ['海外企服', '合规落地稳定器', '从市场准入到本地化运营，为企业提供合规支持方向。', '/assets/enterprise-services/russia-service.jpg'],
    study: ['来华留学', '连接国际人才培养', '围绕来华游学、人才培养与个性化规划提供服务方向。', '/assets/education/study-in-china.jpg'],
    education: ['产教融合与职教出海', '人才与标准先行者', '推动产业、专业、课程、教学与岗位协同连接。', '/assets/education/education-hero.jpg'],
  },
  en: {
    ecommerce: ['Cross-border E-commerce', 'Brand Globalization Accelerator', 'Hands-on brand operations and international market validation.', '/assets/enterprise-services/monthly-review.jpg'],
    trade: ['Foreign Trade', 'Connect markets and trade execution', 'Support market research, customer development and supply-chain collaboration.', '/assets/enterprise-services/chamber-exchange.jpg'],
    inspection: ['Overseas Market Visits', 'Ground market decisions in direct connections', 'Tailored visits connecting local markets, institutions and industry resources.', '/assets/enterprise-services/government-exchange.jpg'],
    'enterprise-services': ['Overseas Enterprise Services', 'Compliance and Landing Stabilizer', 'Support market entry and localized operations with a compliance focus.', '/assets/enterprise-services/russia-service.jpg'],
    study: ['Study in China', 'Connect international talent development', 'Study tours, talent programs and tailored planning.', '/assets/education/study-in-china.jpg'],
    education: ['Industry-Education Integration', 'Talent and Standards Pioneer', 'Connect industries, programs, curricula, teaching and jobs.', '/assets/education/education-hero.jpg'],
  },
}

export default function BusinessDetailPage({ businessKey, locale }) {
  const isZh = locale === 'zh'
  const [title, eyebrow, lead, image] = detailMap[locale][businessKey] || detailMap[locale].trade
  const page = { title, eyebrow: 'GANQI OVERSEAS BUSINESS', lead, heroImage: image }
  const steps = isZh ? ['需求沟通', '方向研判', '资源匹配', '协同推进'] : ['Discovery', 'Assessment', 'Resource Match', 'Coordinated Delivery']
  return (
    <div data-business-detail={businessKey}>
      <PageHero page={page} locale={locale} />
      <section className="section-space"><div className="page-shell business-detail-intro"><div className="group-content-heading"><span>BUSINESS DIRECTION</span><h2>{eyebrow}</h2><p>{lead}</p></div><div className="publication-status"><span>{isZh ? '内容边界' : 'CONTENT SCOPE'}</span><strong>{isZh ? '集团总站展示业务方向与服务框架' : 'The group portal presents the service direction and framework'}</strong><p>{contentStatus[locale]}</p></div></div></section>
      <section className="business-detail-process section-space"><div className="page-shell"><div className="group-content-heading"><span>SERVICE PROCESS</span><h2>{isZh ? '服务协同流程' : 'Service Coordination Process'}</h2></div><div>{steps.map((step, index) => <article key={step}><span>0{index + 1}</span><strong>{step}</strong></article>)}</div></div></section>
      <section className="home-cooperation"><div className="page-shell"><p className="home-eyebrow">BUSINESS INQUIRY</p><h2>{isZh ? '获取对应业务方案' : 'Request a Business Direction'}</h2><p>{isZh ? '告诉我们您的目标市场与当前需求，由集团匹配对应业务团队。' : 'Share your target market and current needs to connect with the relevant team.'}</p><a href="/contact" className="button button-primary">{isZh ? '联系商务顾问' : 'Contact Business Team'}</a></div></section>
    </div>
  )
}
