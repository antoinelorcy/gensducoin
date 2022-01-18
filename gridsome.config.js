// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

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
  siteName: 'Gensducoin',
  plugins: [
    // {
    //   use: '@gridsome/source-strapi', ONLY WORK WITH STRAPIV3 :(
    //   options: {
    //     apiURL: 'http://localhost:1337',
    //     queryLimit: 1000, // Defaults to 100
    //     contentTypes: ['people', 'category', 'job'],
    //     // Possibility to login with a Strapi user,
    //     // when content types are not publicly available (optional).
    //     loginData: {
    //       identifier: '',
    //       password: ''
    //     }
    //   }
    // }
  ],
  templates: {
    // StrapiGrowers: [
    //   { 
    //     path: (node) => {
    //       console.log(node.name);
    //       return `/grower/${slugify(node.name)}`
    //     },
    //     component: './src/templates/Grower.vue'
    //   }
    // ]
  },
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    // or if you use scss
    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
	}
}

function slugify(text) {
  return text
    .toString()                     // Cast to string
    .toLowerCase()                  // Convert the string to lowercase letters
    .normalize('NFD')       // The normalize() method returns the Unicode Normalization Form of a given string.
    .trim()                         // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}