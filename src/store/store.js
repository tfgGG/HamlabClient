import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    roomid:'',
    useritem:[]
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    },
    setroomid(state,roomid){
      console.log("Vuex Store setroomid",roomid)
      state.roomid = roomid
    },
    setItem(state,useritem){
      state.useritem = useritem
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setroomid({commit},roomid){
      commit('setroomid',roomid)
    },
    setItem({commit}, useritem){
      /*Processing the item*/
      commit('setItem',useritem) 
    }
  }
})