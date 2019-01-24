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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/cat',
      name: 'Cat',
      component: Cat
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/reject',
      name: 'Reject',
      component: Reject
    },
    {
      path: '/collect',
      name: 'Collect',
      component: Collect
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/mouths',
      name: 'Mouths',
      component: Mouths
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/code',
      name: 'Code',
      component: Code
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/base',
      name: 'Base',
      component: Base
    },
    {
      path: '/safe',
      name: 'Safe',
      component: Safe
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/address_add',
      name: 'AddAddress',
      component: AddAddress
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
