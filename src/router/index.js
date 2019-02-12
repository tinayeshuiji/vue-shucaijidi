import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Cat from '@/pages/cat'
import Cart from '@/pages/cart'
import Mine from '@/pages/mine'
import About from '@/pages/about'
import Message from '@/pages/message'
import Reject from '@/pages/reject'
import Collect from '@/pages/collect'
import Order from '@/pages/order'
import Mouths from '@/pages/mouths'
import Login from '@/pages/login'
import Register from '@/pages/register'
import Code from '@/pages/code'
import Setting from '@/pages/setting'
import Base from '@/pages/base'
import Safe from '@/pages/safe'
import Address from '@/pages/address'
import AddAddress from '@/pages/address_add'
import Search from '@/pages/search'
import Good from '@/pages/good'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: '首页',
      component: Home
    },
    {
      path: '/cat',
      name: '分类',
      component: Cat
    },
    {
      path: '/cart',
      name: '购物车',
      component: Cart
    },
    {
      path: '/mine',
      name: '我的',
      component: Mine
    },
    {
      path: '/about',
      name: '关于我们',
      component: About
    },
    {
      path: '/message',
      name: '我的通知',
      component: Message
    },
    {
      path: '/reject',
      name: '我的退货',
      component: Reject
    },
    {
      path: '/collect',
      name: '我的收藏',
      component: Collect
    },
    {
      path: '/order',
      name: '我的订单',
      component: Order
    },
    {
      path: '/mouths',
      name: '我的档口',
      component: Mouths
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
    {
      path: '/code',
      name: 'Code',
      component: Code
    },
    {
      path: '/setting',
      name: '个人设置',
      component: Setting
    },
    {
      path: '/base',
      name: '基本资料',
      component: Base
    },
    {
      path: '/safe',
      name: '账号与安全',
      component: Safe
    },
    {
      path: '/address',
      name: '收货地址',
      component: Address
    },
    {
      path: '/address_add',
      name: '新增地址',
      component: AddAddress
    },
    {
      path: '/search',
      name: '搜索',
      component: Search
    },
    {
      path: '/good',
      name: '商品详情',
      component: Good
    }
  ]
})
