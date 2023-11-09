// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: [
    //'@nuxtjs/stylelint-module',
    //'@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-swiper',
    '@nuxt/image',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    // '@nuxt/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
    '@samk-dev/nuxt-vcalendar'
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
    compilation: {
      jit: false,
    },
  },
  runtimeConfig: {
    public: {
      api_url: process.env.API_URL,
    }
  },
  // ui: {
  //   notifications: {
  //     position: 'top-0 right-0'
  //   }
  // },
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  }
})