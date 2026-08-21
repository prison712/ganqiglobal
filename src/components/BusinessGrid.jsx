export default function BusinessGrid({ businesses, locale }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
      {businesses.map((business, index) => (
        <a
          key={business.id}
          href={business.href}
          target={business.external ? '_blank' : undefined}
          rel={business.external ? 'noreferrer' : undefined}
          className="business-card group"
          aria-label={business.external ? `${business.title}，${locale === 'zh' ? '进入外部会展子站' : 'open exhibition website'}` : business.title}
        >
          <span className="business-index">{String(index + 1).padStart(2, '0')}</span>
          <h3>{business.title}</h3>
          <p>{business.text}</p>
          <span className="business-link">
            {business.external
              ? (locale === 'zh' ? '进入会展子站 ↗' : 'Visit exhibition site ↗')
              : (locale === 'zh' ? '业务咨询 →' : 'Enquire →')}
          </span>
        </a>
      ))}
    </div>
  )
}
