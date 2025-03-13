module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'),  // 排版插件
      require('daisyui')  // DaisyUI 组件库 [1](@ref)(https://blog.csdn.net/gitblog_00658/article/details/141208313)
    ],
    daisyui: {
      themes: ["light", "dark"],  // 启用多主题模式
    }
  }
  