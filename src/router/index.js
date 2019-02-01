import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/Auth/login'
import Register from '@/components/Auth/Register'
import ChoosePic from '@/components/Auth/ChoosePic'
import RegisterMain from '@/components/Auth/RegisterMain'
import Game from '@/components/Game/Game'
import Begin from '../components/Game/Begin'
import Shop from '@/components/Person/Shop'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode:'history',
  base: __dirname,
  routes: [  
    {
      path: '/ChoosePic',
      name: 'choosepic',
      component: ChoosePic
    },
    {
      path:'/register',
      name:'registermain',
      component: RegisterMain
    },
    {
      path: '/game',
      name: 'game',
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
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    
  ]
})
