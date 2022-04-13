require('dotenv').config()
module.exports = {
  productionBrowserSourceMaps: true,
  env: {
    //API_URL:'http://192.168.5.125:8080/api'
    API_URL: 'http://localhost:8080/api'
  },
  //i18n: {
 //   locales: ['ru', 'en'],
 //   defaultLocale: 'ru',
 // },
  future: {
    webpack5: true,
  },
  image: {
    domains: ['']
  }
}
