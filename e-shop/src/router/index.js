import Vue from 'vue'
// 1.安装vue-router路由模块，此处是导入
import Router from 'vue-router'
// 1.创建组件
const index=()=>import('@/pages/index');
const home=()=>import('@/pages/home/home');
const cart=()=>import('@/pages/cart/cart');
const confirmOrder=()=>import('@/pages/cart/confirm-order')
const mine=()=>import('@/pages/user/user-center');
const editmsg=()=>import('@/pages/user/user-editmsg');
const getcoupons=()=>import('@/pages/user/user-getcoupons');
const getfavorites=()=>import('@/pages/user/user-getfavorites');
const addressManager=()=>import('@/pages/user/user-address');
const addAddress=()=>import('@/pages/user/user-add-address');


const hotsale=()=>import('@/pages/home/hot-sale');
const onsale=()=>import('@/pages/home/on-sale');
const newArrival=()=>import('@/pages/home/new-arrival')
const search=()=>import('@/pages/search/search');
const login=()=>import('@/pages/user/login');
const register=()=>import('@/pages/user/register');
const product=()=>import('@/pages/product/product');

Vue.use(Router)
// 2.创建一个路由对象
export default new Router({
  //路由匹配规则
  routes: [
    {
      //每个路由规则都是一个对象，身上有两个必须的属性
      // 属性1 是path，表示监听哪个路由链接地址
      // 属性2 是component，表示如果路由是前面匹配到的path，则展示component属性对应的=那个组件
      path:'/',
      component:index,//必须放一个组件模板对象
      redirect:'home',
      children:[
        {
          name:'home',
          path:'/home',
          component:home,
        },
        {
          path:'/cart',
          name:'cart',
          component:cart,
          meta:{
            requiredAuth:true,
          }
        },
        {
          path:'/mine',
          name:'mine',
          component:mine,
          meta:{
            requiredAuth:true,
          }
          
        }
      ]
    },
    {
      name:'hotsale',
      path:'/hotsale',
      component:hotsale,
    },
    {
      name:'onsale',
      path:'/onsale',
      component:onsale
    },
    {
      name:'newArrival',
      path:'/newArrival',
      component:newArrival
    },
    {
      name:'login',
      path:'/login',
      component:login,
    },
    {
      path:'/product/:id',
      name:'product',
      component:product,
    },
    {
      path:'/search',
      name:'search',
      component:search,
    },
    {
      path:'/register',
      component:register,
    },
    {
      path:'/confirmOrder',
      component:confirmOrder,
      meta:{
        requiredAuth:true,
      }
    },
    {
      path:'/editmsg',
      name:'editmsg',
      component:editmsg,
      meta:{
        requiredAuth:true,
      }
    },
    {
      path:'/getfavorites',
      name:'getfavorites',
      component:getfavorites,
      meta:{
        requiredAuth:true,
      }
    },
    //
    {
      path:'/getcoupons',
      name:'getcoupons',
      component:getcoupons,
      meta:{
        requiredAuth:true,
      }
    },
    {
      path:'/addressManager',
      name:'addressManager',
      component:addressManager,
      meta:{
        requiredAuth:true,
      }
    },
    {
      path:'/addAddress',
      name:'addAddress',
      component:addAddress,
      meta:{
        requiredAuth:true,
      }
    },
    
  ]
})
