import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Vue3Mq } from "vue3-mq";

const app = createApp(App)

app.use(router)
app.use(Vue3Mq, {
   breakpoints: {
      mobile: 0,
      tablet: 500,
      desktop: 1100
   }
})

app.mount('#app')
