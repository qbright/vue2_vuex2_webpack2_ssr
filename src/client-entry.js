import { app, store } from './app'
//将服务端渲染时候的状态写入vuex
if(window.__INITIAL_STATE__){
    store.replaceState(window.__INITIAL_STATE__)
}

//挂载到dom元素
app.$mount('#app')
