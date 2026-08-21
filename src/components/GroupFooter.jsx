import { siteMap } from '../content/siteMap.js'
import { siteNetwork } from '../content/siteNetwork.js'

export default function GroupFooter({ content, locale }) {
  const map = siteMap[locale]
  const contactLabel = locale === 'zh' ? '商务合作' : 'Business cooperation'

  return (
    <footer className="group-footer" data-home-section="footer">
      <div className="page-shell group-footer-main">
        <div className="group-footer-brand">
          <a href="/" className="brand-lockup brand-lockup-light" aria-label={locale === 'zh' ? '赣企科技集团首页' : 'Ganqi Technology Group home'}>
            <img src="/assets/ganqi-logo.png" alt="赣企出海 Ganqi Overseas" />
            <span><strong>{locale === 'zh' ? '赣企出海' : 'GANQI OVERSEAS'}</strong><small>{locale === 'zh' ? '赣企科技集团 · GANQI GROUP' : 'GANQI TECHNOLOGY GROUP'}</small></span>
          </a>
          <p>{content.footer.slogan}</p>
          <div className="footer-site-network" aria-label={locale === 'zh' ? '友情链接' : 'Site network'}>
            <strong>{locale === 'zh' ? '友情链接' : 'SITE NETWORK'}</strong>
            {siteNetwork.filter((site) => site.id !== 'group').map((site) => (
              <a key={site.id} href={site.href} {...(site.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                {locale === 'zh' ? site.labelZh : site.labelEn}<span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="group-footer-links">
          {map.footerGroups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
            </div>
          ))}
        </div>

        <div className="group-footer-contact">
          <h2>{contactLabel}</h2>
          <p>{locale === 'zh' ? '江西省南昌市青山湖区高新大道1918号8栋9楼' : '9F, Building 8, No.1918 Gaoxin Avenue, Nanchang, Jiangxi'}</p>
          <a href="/contact">{locale === 'zh' ? '联系集团业务团队' : 'Contact the group team'} <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div className="group-footer-bottom">
        <div className="page-shell">
          <span>{content.footer.copyright}</span>
          <span>{locale === 'zh' ? '中文 / English · 隐私政策 · 网站地图' : '中文 / English · Privacy · Sitemap'}</span>
        </div>
      </div>
    </footer>
  )
}
