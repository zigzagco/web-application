require('dotenv').config()
module.exports = {
  productionBrowserSourceMaps: true,
  env: {
    //API_URL:'http://192.168.5.125:8000/api'
    API_URL: 'http://localhost:80/api'
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
