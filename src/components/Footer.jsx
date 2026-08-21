export default function Footer({ content }) {
  return (
    <footer className="bg-[#061f3a] text-white">
      <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="brand-lockup brand-lockup-light">
            <img src="/assets/ganqi-logo.png" alt="赣企出海 Ganqi Overseas" />
            <span><strong>赣企出海</strong><small>GANQI TECHNOLOGY GROUP</small></span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100/70">{content.footer.slogan}</p>
        </div>
        <div>
          <h3 className="footer-heading">BUSINESS</h3>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-blue-100/70">
            {content.businesses.slice(0, 6).map((item) => (
              <a key={item.id} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="footer-heading">CONTACT</h3>
          <p className="mt-4 text-sm leading-7 text-blue-100/70">江西省南昌市青山湖区高新大道1918号8栋9楼</p>
          <a className="mt-3 inline-block text-sm text-orange-300" href="/#contact">{content.contact} →</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col gap-2 py-5 text-xs text-blue-100/50 sm:flex-row sm:items-center sm:justify-between">
          <span>{content.footer.copyright}</span>
          <span>中文 / English · Privacy · Sitemap</span>
        </div>
      </div>
    </footer>
  )
}
