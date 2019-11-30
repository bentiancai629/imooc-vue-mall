import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '../views/GoodsList'
import Title from '@/views/Title'
import Image from '@/views/Image'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
  //选择路由模式
  // model:'history',

  routes: [
    // {
      // path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
    // }
    {
      path: '/goods/123',
      // path: '/goods/:goodsId/user/:name',
      name: 'GoodsList',
      // component: GoodsList,
      // children:[
      //   {
      //     path: 'title',
      //     name: 'title',
      //     component: Title
      //   },
      //   {
      //     path: 'img',
      //     name: 'img',
      //     component: Image
      //   },
      // ]
      components: {
        default: GoodsList,
        title: Title,
        img: Image
      }
    },
    // 跳转到购物车
    {
      path: '/cart',
      component: Cart
    }
  ]
})
