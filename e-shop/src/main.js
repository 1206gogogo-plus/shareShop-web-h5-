// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'


import 'babel-polyfill'
import VueCookies from 'vue-cookies'

import global from './assets/js/global'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Locale } from 'vant';
import { Lazyload } from 'vant';

import enUS from 'vant/lib/locale/lang/en-US';

import '@/assets/style/common.less';

import http from './request/http.js';
import api from './request/api.js';

Locale.use('en-US', enUS);
Vue.use(Vant);
Vue.use(Lazyload);
//Vue.use(ImagePreview);
Vue.use(VueCookies);

Vue.prototype.global=global;

Vue.prototype.http = http;
Vue.prototype.api = api;

Vue.config.productionTip = false;


router.beforeEach((to,from,next)=>{
  var isLogined = (VueCookies.get('token')!='null'&&store.state.isLogined)?true:false;

      if(to.meta.requiredAuth&&(!isLogined)){
          // console.log(from.fullPath);
           //console.log(store.state.isLogined);
        next({
          path:'/login',
        })
      }
      else{
        next();
      }

})

//filter
Vue.filter("formatDate",function(value){
  let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d ;
    //return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
  
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
