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
  ]
})
