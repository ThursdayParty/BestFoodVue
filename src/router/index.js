import Vue from 'vue'
import VueRouter from 'vue-router'

import QnABoard from '@/components/qna/QnABoard.vue'  
import QuestionWrite from '@/components/qna/QuestionWrite.vue'  
import QuestionDetail from '@/components/qna/QuestionDetail.vue' 

import FoodDetail from '@/components/food/FoodDetail.vue'
import FoodList from '@/components/food/FoodList.vue'
import FoodMain from '@/components/food/FoodMain.vue'
import TakeFood from '@/components/food/TakeFood.vue'

import Login from '@/components/user/Login.vue'

Vue.use(VueRouter)

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
    component: QuestionWrite
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
    // beforeEnter: requireAuth()
  },

  ///// user /////
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

/* const requireAuth = () => (from, to, next) => {
  const isAuthenticated = false
  if(isAuthenticated) return next()
  next('/login?returnPath=takefood')
} */