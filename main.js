import App from './App'
// 引入 uView UI
import uView from './uni_modules/vk-uview-ui'
import * as Pinia from 'pinia';


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  // 使用 uView UI
  app.use(uView)
  // 使用pinia
  app.use(Pinia.createPinia());
  return {
    app,
	Pinia
  }
}
// #endif