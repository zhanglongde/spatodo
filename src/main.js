// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {util} from './utils'

Vue.config.productionTip = false

Vue.directive('time', {
  bind: function() {
  },
  update: function(value) {
    var self = this;
    console.log(this)
//     this.refs.innerHTML = util.time.getMagic(value);
//     this.timeout = setInterval(function() {
//       self.el.innerHTML = util.time.getMagic(value);
//     }, 60000);
  },
  unbind: function() {
//     clearInterval(this.timeout);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
