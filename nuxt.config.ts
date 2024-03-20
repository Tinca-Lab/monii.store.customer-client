// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    experimental: {
        componentIslands: true
    },

    app: {
        head: {
            htmlAttrs: {
                lang: 'es',
            },
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover'},
            ],
            title: 'MONII',
        },
    },

    devtools: {enabled: true},

    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_URL,
        }
    },

    components: {
        global: true,
        dirs: [
            '~/components',
        ],
    },

    css: [
        '~/assets/css/main.css',
    ],

    modules: [
        '@pinia/nuxt',
        '@nuxt/image',
        '@nuxtjs/tailwindcss',
    ],

    pinia: {
        storesDirs: ['./stores/**'],
    },

    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config',
    },

    image: {
        quality: 80,
        formats: ['webp'],
        inject: true,
        domains: [
            'cdn.monii.store'
        ],
    },


    build: {
        analyze: true,
    },

    nitro: {
        compressPublicAssets: {
            brotli: true,
            gzip: true,
        }
    },
})
