const exhibitionHref = import.meta.env?.VITE_EXHIBITION_SITE_URL || 'http://127.0.0.1:4174/'

export const siteNetwork = [
  { id: 'group', labelZh: '赣企科技集团官网', labelEn: 'Ganqi Technology Group', href: '/', external: false },
  { id: 'exhibition', labelZh: '赣企出海国际会展', labelEn: 'Ganqi Global Exhibitions', href: exhibitionHref, external: true },
  { id: 'enterprise-services', labelZh: '赣企出海创业服务', labelEn: 'Ganqi Enterprise Services', href: '/companies/enterprise-services', external: false },
  { id: 'education', labelZh: '赣教出海国际教育', labelEn: 'Ganjiao International Education', href: '/companies/education', external: false },
]
