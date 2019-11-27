import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import QnABoard from '@/components/qna/QnABoard.vue'  
import QuestionWrite from '@/components/qna/QuestionWrite.vue'  
import QuestionDetail from '@/components/qna/QuestionDetail.vue' 

import FoodDetail from '@/components/food/FoodDetail.vue'
import FoodList from '@/components/food/FoodList.vue'
import FoodMain from '@/components/food/FoodMain.vue'
import TakeFood from '@/components/food/TakeFood.vue'

import Login from '@/components/user/Login.vue'
import Signup from '@/components/user/Signup.vue'
import UpdateUserInfo from '@/components/user/UpdateUserInfo.vue'

Vue.use(VueRouter)

const requireAuth = () => (to, from, next) => {
  if (store.getters.isAuthenticated) return next()
  next(`/login?returnPath=${encodeURIComponent(to.path)}`)
}


const routes = [
  ///// qna /////
  {
    path: '/qnaboard',
    name: 'qnaboard',
    component: QnABoard
  },
  {
    path: '/questionwrite',
    name: 'questionwrite',
    component: QuestionWrite,
    beforeEnter: requireAuth()
  },
  {
    path: '/questiondetail/:boardId',
    name: 'questiondetail',
    component: QuestionDetail,
    props: true
  },

  ///// food /////
  {
    path: '/fooddetail/:code',
    name: 'fooddetail',
    component: FoodDetail,
    props: true
  },
  {
    path: '/foodlist',
    name: 'foodlist',
    component: FoodList
  },
  {
    path: '/',
    name: 'foodmain',
    component: FoodMain
  },
  {
    path: '/takefood',
    name: 'takefood',
    component: TakeFood,
    beforeEnter: requireAuth()
  },

  ///// user /////
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/updateUserInfo',
    name: 'updateUserInfo',
    component: UpdateUserInfo
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router