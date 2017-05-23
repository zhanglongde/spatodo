/**
 * Created by Administrator on 2017/5/23.
 */
/**
 * Created by JUEXINPC-008 on 2017/3/3.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import todo from './modules/todo'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    todo
  },
  strict: debug
})
