module.exports = {
  title: '小蜗牛之家',
  description: 'Just playing around',
  // base: '/blog/',
  base: './',

  markdown: {
    lineNumbers: true
  },
  description: '学习经验总结',
  themeConfig: {
    nav: [
      { text: 'home', link: '/' },
      { text: '学习笔记', link: '/dbMsg/' }
    ],
    sidebar: [
      {
        title: 'node与数据库操作',
        path: '/dbMsg/',
        // children: [
        //   { title: '第一篇', path: '/dbMsg/' },
        //   { title: '第二篇', path: '/dbMsg/booksys.md' }
        // ],
        // initialOpenGroupIndex: 1,
        collapsable: true
        // sidebarDepth: 2
      },
      {
        title: 'Ajax数据请求',
        path: '/dbMsg/booksys.md',
        // children: [
        //   { title: '第一篇', path: '/dbMsg/' },
        //   { title: '第二篇', path: '/dbMsg/booksys.md' }
        // ],
        // initialOpenGroupIndex: 1,
        collapsable: true
        // sidebarDepth: 2
      }
    ]
  }
}
