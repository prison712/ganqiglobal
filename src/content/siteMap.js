const exhibitionHref = import.meta.env?.VITE_EXHIBITION_SITE_URL || 'http://127.0.0.1:4174/'

const routeSets = {
  zh: {
    primaryNav: [
      { label: '首页', href: '/' },
      { label: '关于集团', href: '/about', children: [
        { label: '集团介绍', href: '/about' }, { label: '发展历程', href: '/history' },
        { label: '企业文化', href: '/culture' }, { label: '荣誉资质', href: '/honors' },
      ] },
      { label: '业务体系', href: '/business', children: [
        { label: '业务总览', href: '/business' }, { label: '北斗七星战略', href: '/strategy' },
      ] },
      { label: '旗下企业', href: '/companies' }, { label: '全球网络', href: '/global' },
      { label: '新闻中心', href: '/news' }, { label: '联系我们', href: '/contact' },
    ],
    footerGroups: [
      { title: '关于集团', links: [['集团介绍', '/about'], ['发展历程', '/history'], ['企业文化', '/culture'], ['荣誉资质', '/honors']] },
      { title: '业务体系', links: [['业务总览', '/business'], ['北斗七星战略', '/strategy'], ['旗下企业', '/companies'], ['全球网络', '/global']] },
      { title: '资讯与联系', links: [['新闻中心', '/news'], ['联系我们', '/contact']] },
    ],
  },
  en: {
    primaryNav: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about', children: [
        { label: 'Group Profile', href: '/about' }, { label: 'Milestones', href: '/history' },
        { label: 'Culture', href: '/culture' }, { label: 'Honors', href: '/honors' },
      ] },
      { label: 'Business', href: '/business', children: [
        { label: 'Overview', href: '/business' }, { label: 'Beidou Strategy', href: '/strategy' },
      ] },
      { label: 'Companies', href: '/companies' }, { label: 'Global Network', href: '/global' },
      { label: 'News', href: '/news' }, { label: 'Contact', href: '/contact' },
    ],
    footerGroups: [
      { title: 'ABOUT', links: [['Group Profile', '/about'], ['Milestones', '/history'], ['Culture', '/culture'], ['Honors', '/honors']] },
      { title: 'BUSINESS', links: [['Overview', '/business'], ['Beidou Strategy', '/strategy'], ['Companies', '/companies'], ['Global Network', '/global']] },
      { title: 'NEWS & CONTACT', links: [['News', '/news'], ['Contact', '/contact']] },
    ],
  },
}

export const siteMap = {
  zh: { ...routeSets.zh, exhibitionHref },
  en: { ...routeSets.en, exhibitionHref },
}

export { exhibitionHref }
