import Vue from 'vue'
import VueRouter from 'vue-router'
// 改写成异步组件

import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Shopcart from '@/views/layout/shopcart'
import User from '@/views/layout/user'
import Layout from '@/views/layout'
// 导入本地存入的是否有token
import { getInfo } from '@/utils/storage'

const Goodsdetail = () => import('@/views/goodsdetail')
const Login = () => import('@/views/login')
const Order = () => import('@/views/order')
const Pay = () => import('@/views/pay')
const Search = () => import('@/views/search/index')
const SearchList = () => import('@/views/search/searchlist')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/goodsdetail/:id', component: Goodsdetail },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/home/category', component: Category },
        { path: '/home/shopcart', component: Shopcart },
        { path: '/home/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/order', component: Order },
    { path: '/pay', component: Pay },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})

// 设置一个需要用户token的页面进行数组存放
const AuthUrl = ['/pay', '/order', '/home/user']
// , '/home/shopcart'

// 全局前置守卫beforeEach(to,from,next)
router.beforeEach((to, from, next) => {
  // 看to.path的路径是否在数组AuthUrl里

  const userToken = getInfo().token

  if (!AuthUrl.includes(to.path)) {
    next()
  } else {
    if (userToken) {
      next()
    } else {
      next({ path: '/login', replace: true })
    }
  }
})

export default router
