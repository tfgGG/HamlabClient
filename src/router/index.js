import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/Auth/login'
import Register from '@/components/Auth/Register'
import Game from '@/components/Game/Game'
import Begin from '../components/Game/Begin'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode:'history',
  base: __dirname,
  routes: [  
    {
      path: '/first',
      name: 'Begin',
      component: Begin
    },
    {
      path:'/register',
      name:'register',
      component: Register
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/begin',
      name: 'Begin',
      component: Begin
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    
  ]
})
