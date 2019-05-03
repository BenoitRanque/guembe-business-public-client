import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

import oauth from './oauth'
import khipu from './khipu'
import purchase from './purchase'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
      oauth,
      khipu,
      purchase
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
