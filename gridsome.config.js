const path = require("path");

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/_variables.scss'),
        path.resolve(__dirname, './src/assets/scss/_breakpoints.scss')
      ],
    })
}

module.exports = {
  siteName: 'gensducoin',
  siteUrl: process.env.GRIDSOME_SITE_URL,
  plugins: [
    'gridsome-plugin-robots',
    '@gridsome/plugin-sitemap'
  ],
  templates: {},
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    // or if you use scss
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
	}
}