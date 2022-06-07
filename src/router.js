import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Main from '@/views/Main.vue'
import Miner from '@/views/Miner.vue'
import NFT from '@/views/NFT.vue'
import Token from '@/views/Token.vue'
import Whitepaper from '@/views/Whitepaper.vue'
import Recruit from '@/views/Recruit.vue'


Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Games',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/miner',
      name: 'Miner',
      component: Miner
    },
    {
      path: '/nft',
      name: 'NFT',
      component: NFT
    },
    {
      path: '/token',
      name: 'Token',
      component: Token
    },
    {
      path: '/whitepaper',
      name: 'Whitepaper',
      component: Whitepaper
    },
    {
      path: '/recruit',
      name: 'Recruit',
      component: Recruit
    },
    { path: '*', redirect: '/' },	/*default when no match*/
  ]
})

//路由拦截
// let noLogin = ['/market', '/catdetail']
router.beforeEach((to, from, next) => {
  // 分发  触发事件
  Vue.prototype.$eventHub.$emit('tabnav', to)
  // chrome
  // document.body.scrollTop = 0
  document.querySelector("#app").scrollTop = 0
  // firefox
  // document.getElementById("#app").scrollTop = 0
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0

  next()
  // if (noLogin.indexOf(to.path) <= -1) {
  // 	console.log(noLogin.indexOf(to.path))
  // 	clearLocalStrorage()
  // 	clearSessionStrorage()
  // 	next({
  // 		path: '/'
  // 	})
  // } else next()
})

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
