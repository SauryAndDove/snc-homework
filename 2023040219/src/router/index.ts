import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import News from '@/views/News/index.vue'

import Activity from '@/views/Activity/index.vue'
import ActivityList from '@/views/Activity/sections/ActivityList.vue'
import BeforeRegister from '@/views/Activity/sections/BeforeRegister.vue'
import MyRegister from '@/views/Activity/sections/MyRegister.vue'
import Question from '@/views/Activity/sections/Question.vue'
import RegisterDetail from '@/views/Activity/sections/RegisterDetail.vue'

import About from '@/views/About/About.vue'
import Login from '@/views/Login/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home
    },
    {
      name: 'News',
      path: '/news',
      component: News,
      children: [

      ]
    },
    {
      name: 'Activity',
      path: '/activity',
      component: Activity,
      redirect: '/activity/activity-list',
      children: [
        {
          name: 'ActivityList',
          path: 'activity-list',
          component: ActivityList
        },
        {
          name: 'BeforeRegister',
          path: 'before-register',
          component: BeforeRegister
        },
        {
          name: 'RegisterDetail',
          path: 'register-detail',
          component: RegisterDetail
        },
        {
          name: 'Question',
          path: 'question',
          component: Question
        },
        {
          name: 'MyRegister',
          path: 'my-register',
          component: MyRegister
        }
      ]
    },
    {
      name: 'About',
      path: '/about',
      component: About
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    }
  ],
})

export default router
