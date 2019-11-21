import Vue from 'vue'
import VueRouter from 'vue-router'
import QnABoard from '@/components/qna/QnABoard.vue'  
import QuestionWrite from '@/components/qna/QuestionWrite.vue'  
import QuestionDetail from '@/components/qna/QuestionDetail.vue' 
import FoodDetail from '@/components/food/FoodDetail.vue'
import FoodList from '@/components/food/FoodList.vue'
import FoodMain from '@/components/food/FoodMain.vue'

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
    path: '/fooddetail',
    name: 'fooddetail',
    component: FoodDetail
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
