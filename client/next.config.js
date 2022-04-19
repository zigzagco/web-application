require('dotenv').config()
module.exports = {
  productionBrowserSourceMaps: true,
  outputStandalone: true,
  images:{
    domains: ['localhost:8000','i.imgur.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  env: {
    API_URL:'http://192.168.5.125:8000/api'
    //API_URL: 'http://192.168.5.15:8000/api'
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
