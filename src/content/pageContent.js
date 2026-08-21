const media = {
  office: '/assets/group-office.jpg',
  exhibition: '/assets/enterprise-services/industry-dialogue.jpg',
  enterprise: '/assets/enterprise-services/team-meeting.jpg',
  education: '/assets/education/teaching-group.jpg',
}

const status = {
  zh: '内容将在集团正式资料确认后发布。',
  en: 'Content will be published after formal group approval.',
}

export const pageContent = {
  zh: {
    about: { eyebrow: 'GROUP PROFILE', title: '关于赣企科技集团', lead: '国内扎根，全球拓展，为中国企业构建稳健的出海服务连接。', heroImage: media.office },
    history: { eyebrow: 'MILESTONES', title: '发展历程', lead: '从 2018 到 2026，持续完善企业成长与出海服务能力。', heroImage: media.exhibition, years: ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'] },
    culture: { eyebrow: 'OUR CULTURE', title: '企业文化', lead: '以专业、诚信、创新与协作，陪伴企业走向更广阔的市场。', heroImage: media.enterprise },
    honors: { eyebrow: 'HONORS', title: '荣誉资质', lead: '集团荣誉与专业能力证明。', heroImage: media.office, notice: status.zh },
    business: { eyebrow: 'BUSINESS SYSTEM', title: '业务体系', lead: '覆盖市场连接、合规落地、贸易服务与国际人才培养。', heroImage: media.exhibition },
    strategy: { eyebrow: 'BEIDOU SEVEN-STAR MODEL', title: '北斗七星战略模型', lead: '围绕战略、市场、路径、资源、合规、共生与迭代建立全链路支持。', heroImage: media.office },
    companies: { eyebrow: 'GROUP COMPANIES', title: '旗下企业', lead: '专业分工、协同服务，构建集团业务生态。', heroImage: media.enterprise },
    global: { eyebrow: 'GLOBAL NETWORK', title: '全球网络', lead: '连接海外合作资源，为企业全球化布局提供支持。', heroImage: media.exhibition },
    news: { eyebrow: 'NEWS CENTER', title: '新闻中心', lead: '集团动态与出海行业观察。', heroImage: media.education, notice: status.zh },
    contact: { eyebrow: 'CONTACT US', title: '联系我们', lead: '告诉我们您的业务目标，获得对应服务方向。', heroImage: media.office },
  },
  en: {
    about: { eyebrow: 'GROUP PROFILE', title: 'About Ganqi Technology Group', lead: 'Rooted in China and connected globally, supporting sustainable expansion.', heroImage: media.office },
    history: { eyebrow: 'MILESTONES', title: 'Our Journey', lead: 'Building enterprise growth and globalization capabilities from 2018 to 2026.', heroImage: media.exhibition, years: ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'] },
    culture: { eyebrow: 'OUR CULTURE', title: 'Culture', lead: 'Professionalism, integrity, innovation and collaboration.', heroImage: media.enterprise },
    honors: { eyebrow: 'HONORS', title: 'Honors & Qualifications', lead: 'Recognition of the group and its professional capabilities.', heroImage: media.office, notice: status.en },
    business: { eyebrow: 'BUSINESS SYSTEM', title: 'Business System', lead: 'Market connection, compliant landing, trade services and global talent.', heroImage: media.exhibition },
    strategy: { eyebrow: 'BEIDOU SEVEN-STAR MODEL', title: 'Beidou Seven-Star Model', lead: 'A framework spanning strategy, market, path, resources, compliance, coexistence and iteration.', heroImage: media.office },
    companies: { eyebrow: 'GROUP COMPANIES', title: 'Group Companies', lead: 'Specialized teams working together across the group ecosystem.', heroImage: media.enterprise },
    global: { eyebrow: 'GLOBAL NETWORK', title: 'Global Network', lead: 'Connecting overseas partners and supporting enterprise expansion.', heroImage: media.exhibition },
    news: { eyebrow: 'NEWS CENTER', title: 'News Center', lead: 'Group updates and globalization insights.', heroImage: media.education, notice: status.en },
    contact: { eyebrow: 'CONTACT US', title: 'Contact Us', lead: 'Share your goals and connect with the relevant service team.', heroImage: media.office },
  },
}

export function getPageContent(locale, key) {
  return pageContent[locale]?.[key] || null
}

export const contentStatus = status
