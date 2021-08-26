module.exports = {
  base: '/coder-notes/',
  lang: 'zh-CN',
  title: 'Coder Notes',
  description: 'Coder notes.',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],

  themeConfig: {
    logo: '/logo.png',
    navbar: [
      { text: '语言', link: '/language/' },
      { text: '算法', link: '/algorithm/' }
    ],
  }
}