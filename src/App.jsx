import { useState } from 'react'
import SiteLayout from './components/SiteLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import CompanyPage from './pages/CompanyPage.jsx'
import GroupInfoPage from './pages/GroupInfoPage.jsx'
import BusinessOverviewPage from './pages/BusinessOverviewPage.jsx'
import BusinessDetailPage from './pages/BusinessDetailPage.jsx'
import NewsPage from './pages/NewsPage.jsx'
import NewsDetailPage from './pages/NewsDetailPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { siteContent } from './content/siteContent.js'
import { companyContent } from './content/companyContent.js'
import { getPageContent } from './content/pageContent.js'
import { resolveRoute } from './router.js'

export const getNextLocale = (locale) => locale === 'zh' ? 'en' : 'zh'

export default function App({ initialPath }) {
  const [locale, setLocale] = useState('zh')
  const content = siteContent[locale]
  const pathname = initialPath || (typeof window === 'undefined' ? '/' : window.location.pathname)
  const route = resolveRoute(pathname)
  const company = route.type === 'business-site' ? companyContent[locale][route.key] : null
  const toggleLocale = () => setLocale((current) => getNextLocale(current))
  const groupPage = route.type === 'group' ? getPageContent(locale, route.key) : null

  if (company) {
    return <CompanyPage company={company} locale={locale} onToggleLocale={toggleLocale} />
  }

  return (
    <SiteLayout
      content={content}
      locale={locale}
      onToggleLocale={toggleLocale}
      currentPath={pathname}
    >
      {route.key === 'home' && <HomePage content={content} locale={locale} />}
      {route.key === 'business' && groupPage && <BusinessOverviewPage page={groupPage} content={content} locale={locale} />}
      {route.key === 'news' && groupPage && <NewsPage page={groupPage} locale={locale} />}
      {route.key === 'contact' && groupPage && <ContactPage page={groupPage} locale={locale} />}
      {groupPage && !['home', 'business', 'news', 'contact'].includes(route.key) && <GroupInfoPage pageKey={route.key} page={groupPage} content={content} locale={locale} />}
      {route.type === 'business-detail' && <BusinessDetailPage businessKey={route.key} locale={locale} />}
      {route.type === 'news-detail' && <NewsDetailPage slug={route.slug} locale={locale} />}
      {route.type === 'not-found' && (
        <section className="not-found page-shell">
          <span>404</span><h1>{locale === 'zh' ? '页面不存在' : 'Page not found'}</h1>
          <a href="/" className="button button-primary">{locale === 'zh' ? '返回集团首页' : 'Back to home'}</a>
        </section>
      )}
    </SiteLayout>
  )
}
