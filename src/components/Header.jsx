import { useState } from 'react'

const anchors = ['/#top', '/#about', '/#business', '/#strategy', '/#companies', '/#network', '/#news']

export default function Header({ content, locale, onToggleLocale }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="page-shell flex h-18 items-center justify-between gap-6">
        <a href="/#top" className="brand-lockup" onClick={closeMenu} aria-label="赣企科技集团首页">
          <img src="/assets/ganqi-logo.png" alt="赣企出海 Ganqi Overseas" />
          <span>
            <strong>{locale === 'zh' ? '赣企出海' : 'GANQI OVERSEAS'}</strong>
            <small>GANQI TECHNOLOGY GROUP</small>
          </span>
        </a>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="主导航">
          {content.nav.map((item, index) => (
            <a key={item} className="nav-link" href={anchors[index]}>{item}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button type="button" className="language-button" onClick={onToggleLocale} aria-label="切换网站语言">
            {content.switchLabel}
          </button>
          <a href="/#contact" className="button button-primary button-sm">{content.contact}</a>
        </div>

        <button
          type="button"
          className="menu-button md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" className="mobile-navigation md:hidden">
          <nav className="page-shell grid gap-1 py-5" aria-label="移动端导航">
            {content.nav.map((item, index) => (
              <a key={item} href={anchors[index]} onClick={closeMenu}>{item}</a>
            ))}
            <div className="mt-4 flex gap-3 border-t border-slate-200 pt-4">
              <button type="button" className="language-button" onClick={() => { onToggleLocale(); closeMenu() }}>
                {content.switchLabel}
              </button>
              <a href="/#contact" className="button button-primary flex-1" onClick={closeMenu}>{content.contact}</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
