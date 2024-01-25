// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-snackbar',
    'dayjs-nuxt',
    '@zadigetvoltaire/nuxt-gtm'
  ],
  gtm: {
    id: 'GTM-WS7KDGV5',
    enableRouterSync: true,
    queryParams: {
      gtm_auth: 'init',
      gtm_cookies_win: 'init',
      gtm_preview: 'init'
    }
  },
  dayjs: {
    locales: ['pt'],
    defaultLocale: 'pt',
  },
  runtimeConfig: {
    public: {
      api_url: process.env.API_URL,
      gtm: {
        id: 'GTM-WS7KDGV5',
        queryParams: {
          gtm_auth: 'test',
          gtm_cookies_win: 'test',
          gtm_preview: 'test'
        }
      }
    }
  },
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
  snackbar: {
    top: true,
    right: true,
    duration: 5000
  },
  image: {
    provider: process.env.VERCEL_ENV ? 'vercel' : 'ipx',
  }
})