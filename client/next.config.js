require('dotenv').config()
module.exports = {
  productionBrowserSourceMaps: true,
  outputStandalone: true,
  images:{
    domains: ['localhost:8000','i.imgur.com'],
  },
  env: {
    //API_URL:'http://192.168.5.125:8000/api'
    API_URL: 'http://localhost:8000/api'
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
