import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const name = 'mymygames';
export default new Vuex.Store({
  state: {
    userInfo: {},
    hasLogin: window.sessionStorage.getItem(name + 'hasLogin'),
  },
  mutations: {
    login(state, data) {
      state.hasLogin = 'true';
      window.sessionStorage.setItem(name + 'hasLogin', state.hasLogin);
    },
    setUserInfo(state, data) {
      state.userInfo = data;
      window.sessionStorage.setItem(name + 'userInfo', JSON.stringify(state.userInfo));
    },
    getUserInfo(state) {
      let userInfoS = window.sessionStorage.getItem(name + 'userInfo');
      if (!userInfoS) {
        state.userInfo = null;
      } else {
        state.userInfo = JSON.parse(userInfoS);
      }
      return state.userInfo;
    },

  },
  getters: {
  },
  actions: {

  }
})
