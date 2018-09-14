import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hot from '@/components/Hot_page'
import First from '@/components/First'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hot',
      component: Hot
    },
    {
      path: '/hot',
      component: Hot
    },{
      path: '/first',
      component: First
    }
  ]
})
