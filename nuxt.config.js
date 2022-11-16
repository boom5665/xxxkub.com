import axios from "axios";
export default {
  // Target: https://go.nuxtjs.dev/config-target
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 8008, // default: 3000
  },
  head: {
    title: "xxxkub",
    htmlAttrs: {
      lang: "th",
      translate: "no",
    },
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: ""
      },
      {
        name: "format-detection",
        content: "telephone=no"
      },
    ],
    link: [{
        rel: "preconnect",
        href: process.env.BUCKET_URL || "https://movies-bdx.s3.ap-southeast-1.amazonaws.com"
      },
      {
        rel: "preconnect",
        href: process.env.BASE_URL || "https://dev-movie-api.pirate168.com"
      },
    ],
  },

  env: {
    PRODUCTNAME: process.env.PRODUCTNAME || "devmovie",
  },

  publicRuntimeConfig: {
    baseApiUrl: process.env.BASE_API_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.scss", '@fortawesome/fontawesome-svg-core/styles.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
      src: "@/plugins/inject"
    }, {
      src: "@/plugins/gtag"
    }, {
      src: "@/plugins/swiper"
    },
    {
      src: "@/plugins/fontawesome.js"
    },

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // "@nuxtjs/sitemap",
    "@nuxt/image",
    "bootstrap-vue/nuxt",
    "@nuxtjs/robots",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_API_URL || "https://dev-movie-api.pirate168.com/api/v1/",
    headers: {
      common: {
        domain: "devmovie",
      },
    },
  },

  // sitemap: {
  //     hostname: "https://www.365fullhd.com",
  //     gzip: true,
  //     cacheTime: 1000 * 60 * 60 * 24,
  //     routes: async () => {
  //         const response = await axios.post(
  //             (process.env.BASE_API_URL || "https://dev-movie-api.pirate168.com/api/v1/") + "gen-sitemap-rawdata",
  //             {},
  //             {
  //                 headers: {
  //                     domain: "ruaymovie",
  //                 },
  //             }
  //         );
  //         return response.data.result.map((x) => {
  //             return {
  //                 url: x.loc,
  //                 priority: x.priority,
  //             };
  //         });
  //     },
  // },

  robots: {
    UserAgent: "*",
    Allow: "/",
    Sitemap: "https://www.ruaymovie.com/sitemap.xml"
  },

  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: true,
  },

  image: {
    domains: ["movies-bdx.s3.ap-southeast-1.amazonaws.com", "api.vip-streaming.com"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
