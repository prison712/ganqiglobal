import PageHero from '../components/PageHero.jsx'
import { contentStatus } from '../content/pageContent.js'

export default function NewsPage({ page, locale }) {
  const isZh = locale === 'zh'
  const cards = [
    { slug: 'group-framework', tag: isZh ? '集团动态' : 'GROUP', title: isZh ? '集团新闻资料待正式确认后发布' : 'Group news will be published after formal approval', image: '/assets/group-office.jpg' },
    { slug: 'exhibition-material', tag: isZh ? '业务现场' : 'BUSINESS', title: isZh ? '国际会展业务现场素材' : 'International exhibition field material', image: '/assets/home/exhibition-team.jpg' },
    { slug: 'education-material', tag: isZh ? '产教融合' : 'EDUCATION', title: isZh ? '产教融合项目素材' : 'Industry-education project material', image: '/assets/education/school-enterprise-2.jpg' },
  ]
  return <div data-group-page="news"><PageHero page={page} locale={locale} /><section className="section-space"><div className="page-shell"><div className="group-content-heading"><span>GROUP NEWS</span><h2>{isZh ? '集团动态与出海观察' : 'Group Updates and Insights'}</h2><p>{contentStatus[locale]}</p></div><div className="news-directory">{cards.map((card) => <a key={card.slug} href={`/news/${card.slug}`}><img src={card.image} alt="" /><div><span>{card.tag}</span><small>CONTENT FRAMEWORK</small><h3>{card.title}</h3><b>{isZh ? '查看内容 →' : 'View article →'}</b></div></a>)}</div></div></section></div>
}
