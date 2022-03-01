import router from './index.js'

// 获取vuex数据
import store from '../store/index.js'

// 路由拦截
router.beforeEach((to, from, next)=>{
  // 判断是否需要登陆
  if(to.matched.some(ele => ele.meta.isLogin)){
    // 判断是否已经登录
    let token = store.state.loginModule.userinfo.token;
    if(token){
      next()
    }else{
      next('./MyLogin')
    }
  }else{
    next();
  }
})
