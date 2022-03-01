import Vue from 'vue'
import Router from 'vue-router'
// 引入一级组件
import MyLayout from '@/views/Layout/MyLayout.vue'
import MyLogin from '@/views/Login/MyLogin.vue'
import MyHome from "@/views/Home/MyHome.vue"
// 懒加载二级组件
const MyGoods = () => import('@/views/Goods/MyGoods')
const MyOrders = () => import('@/views/Orders/MyOrders')
const MyCenter = () => import('@/views/MyCenter/MyCenter')
const AddGoods = () => import('@/views/Goods/AddGoods')
// 懒加载三级组件
const OrderList = () => import('@/views/Orders/OrderList/OrderList')
const ReturnList = () => import('@/views/Orders/ReturnList/ReturnList')

Vue.use(Router)

const routes = [
    {
    	path: '',
    	component: MyLayout,
      // 路由元信息，拦截登录后的页面
      meta:{
        isLogin: true
      },
    	children: [
    		{
    			path: '/',
    			name: 'MyHome',
    			component: MyHome
    		},
    		{
    			path: '/MyGoods',
    			name: 'MyGoods',
    			component: MyGoods
    		},
        {
        	path: '/AddGoods',
        	name: 'AddGoods',
        	component: AddGoods
        },
    		{
    			path: '/MyOrders',
    			name: 'MyOrders',
    			component: MyOrders,
          redirect: '/MyOrders/OrderList',
          children:[
            {
              // 不加/，/MyOrders/OrderList
              // 加/，/OrderList
              path:'OrderList',
              name: 'OrderList',
              component: OrderList
            },
            {
              path:'ReturnList',
              name: 'ReturnList',
              component: ReturnList
            }
          ]
    		},
    		{
    			path: '/MyCenter',
    			name: 'MyCenter',
    			component: MyCenter
    		}
    	]
    },
    {
    	path: '/MyLogin',
    	name: 'MyLogin',
    	component: MyLogin
    }
  ]

const router = new Router({
  routes
})


export default router
