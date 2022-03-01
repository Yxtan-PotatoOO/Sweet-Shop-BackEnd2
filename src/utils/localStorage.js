import store from '../store/index.js'
// 持久化
let adminID = localStorage.getItem('adminID')
if(adminID){
  adminID = JSON.parse(adminID);
  store.commit('loginModule/setUser', adminID)
}
