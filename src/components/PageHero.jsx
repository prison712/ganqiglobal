export default function PageHero({ page, locale }) {
  return (
    <section className="group-page-hero" data-page-hero="true">
      <img src={page.heroImage} alt="" aria-hidden="true" />
      <div className="group-page-hero-shade" />
      <div className="page-shell">
        <p>{page.eyebrow}</p><h1>{page.title}</h1><span>{page.lead}</span>
        <nav aria-label={locale === 'zh' ? '面包屑' : 'Breadcrumb'}><a href="/">{locale === 'zh' ? '首页' : 'Home'}</a><b>/</b><strong>{page.title}</strong></nav>
      </div>
    </section>
  )
}
