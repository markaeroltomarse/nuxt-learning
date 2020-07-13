
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Home - Nuxt lessons',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", type: "text/css", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" },
      { rel: "stylesheet", type: "text/css", href:'https://unpkg.com/aos@2.3.1/dist/aos.css'},    
    ],
    script:[
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/all.min.js'},
      
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'teal' },
  /*
  ** Global CSS
  */

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "@/plugins/aos", ssr: false },
    { src: "@/plugins/vClickOutside", ssr: false },
    { src: '~/plugins/vue-datepicker', ssr: false },
    { src: '~/plugins/vuecarousel', ssr: false },
    {src:'~/plugins/vue-socket.js', ssr:false},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    ['@nuxtjs/vuetify', { 
      icons: {
        iconfont: 'mdi', // default - only for display purposes
      },
     }],
    

    //['bootstrap-vue/nuxt', { css: false }],
  ],

 

  axios: {
    
    credentials: true,
    baseURL:'http://localhost:5000'
  },

  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  css: [
    //'~/assets/main.css'
  ],

  router: {
    // Run the middleware/user-agent.js on every page
    middleware: ['exist']
  }
}
