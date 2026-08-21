import PageHero from '../components/PageHero.jsx'
import { contentStatus } from '../content/pageContent.js'

export default function NewsDetailPage({ slug, locale }) {
  const isZh = locale === 'zh'
  const page = { eyebrow: 'NEWS CENTER', title: isZh ? '新闻内容框架' : 'News Article Framework', lead: contentStatus[locale], heroImage: '/assets/group-office.jpg' }
  return <article data-news-detail={slug}><PageHero page={page} locale={locale} /><div className="page-shell news-article"><span>CONTENT STATUS</span><h2>{isZh ? '内容将在集团正式资料确认后发布' : 'Content will be published after formal group approval'}</h2><p>{contentStatus[locale]}</p><a href="/news" className="text-link">{isZh ? '返回新闻中心' : 'Back to news'} <b aria-hidden="true">→</b></a></div></article>
}
