import GroupHeader from './GroupHeader.jsx'
import GroupFooter from './GroupFooter.jsx'

export default function SiteLayout({ content, locale, onToggleLocale, currentPath, children }) {
  return (
    <div className="min-h-screen bg-white text-slate-800" lang={locale === 'zh' ? 'zh-CN' : 'en'}>
      <GroupHeader locale={locale} onToggleLocale={onToggleLocale} currentPath={currentPath} />
      <main>{children}</main>
      <a href="/contact" className="floating-contact" aria-label={content.cta.button}>
        <span>+</span><strong>{locale === 'zh' ? '咨询' : 'Talk'}</strong>
      </a>
      <GroupFooter content={content} locale={locale} />
    </div>
  )
}
