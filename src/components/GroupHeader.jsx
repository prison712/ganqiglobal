import { useEffect, useState } from 'react'
import { siteMap } from '../content/siteMap.js'

const childPaths = (item) => item.children?.map((child) => child.href) || []

function isItemActive(item, currentPath) {
  if (item.href === '/') return currentPath === '/'
  return currentPath === item.href || childPaths(item).includes(currentPath)
}

export default function GroupHeader({ locale, onToggleLocale, currentPath = '/' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigation = siteMap[locale].primaryNav
  const contactLabel = locale === 'zh' ? '商务合作' : 'Cooperate'

  useEffect(() => {
    if (!menuOpen || typeof document === 'undefined') return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header className="group-header" data-group-header="true">
      <div className="page-shell group-header-inner">
        <a href="/" className="brand-lockup group-brand" aria-label={locale === 'zh' ? '返回赣企科技集团首页' : 'Back to Ganqi Technology Group home'}>
          <img src="/assets/ganqi-logo.png" alt="赣企出海 Ganqi Overseas" />
          <span>
            <strong>{locale === 'zh' ? '赣企出海' : 'GANQI OVERSEAS'}</strong>
            <small>{locale === 'zh' ? '赣企科技集团 · GANQI GROUP' : 'GANQI TECHNOLOGY GROUP'}</small>
          </span>
        </a>

        <nav className="group-nav" aria-label={locale === 'zh' ? '集团主导航' : 'Group navigation'}>
          {navigation.map((item) => {
            const active = isItemActive(item, currentPath)
            return (
              <div className={`group-nav-item ${item.children ? 'has-children' : ''}`} key={item.href}>
                <a href={item.href} aria-current={active ? 'page' : undefined}>
                  {item.label}
                  {item.children && <span className="nav-chevron" aria-hidden="true">⌄</span>}
                </a>
                {item.children && (
                  <div className="group-nav-dropdown" role="menu">
                    {item.children.map((child) => (
                      <a key={child.href} href={child.href} role="menuitem" aria-current={currentPath === child.href ? 'page' : undefined}>
                        <span>{child.label}</span><b aria-hidden="true">→</b>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="group-header-actions">
          <button type="button" className="language-button" onClick={onToggleLocale} aria-label={locale === 'zh' ? '切换到英文' : 'Switch to Chinese'}>
            {locale === 'zh' ? 'EN' : '中'}
          </button>
          <a href="/contact" className="button button-primary button-sm">{contactLabel}</a>
        </div>

        <button
          type="button"
          className={`menu-button group-menu-button ${menuOpen ? 'is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? (locale === 'zh' ? '关闭菜单' : 'Close menu') : (locale === 'zh' ? '打开菜单' : 'Open menu')}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div id="mobile-navigation" className={`group-mobile-drawer ${menuOpen ? 'is-open' : ''}`} data-mobile-drawer="true" aria-hidden={!menuOpen}>
        <nav className="page-shell" aria-label={locale === 'zh' ? '移动端导航' : 'Mobile navigation'}>
          {navigation.map((item) => (
            <div className="mobile-nav-group" key={item.href}>
              <a href={item.href} onClick={() => setMenuOpen(false)} aria-current={isItemActive(item, currentPath) ? 'page' : undefined}>{item.label}</a>
              {item.children && (
                <div>
                  {item.children.map((child) => <a key={child.href} href={child.href} onClick={() => setMenuOpen(false)}>{child.label}</a>)}
                </div>
              )}
            </div>
          ))}
          <div className="mobile-nav-actions">
            <button type="button" className="language-button" onClick={() => { onToggleLocale(); setMenuOpen(false) }}>{locale === 'zh' ? 'English' : '中文'}</button>
            <a href="/contact" className="button button-primary" onClick={() => setMenuOpen(false)}>{contactLabel}</a>
          </div>
        </nav>
      </div>
    </header>
  )
}
