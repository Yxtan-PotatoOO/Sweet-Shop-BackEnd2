// 请求的方法
import axios from 'axios'
import base from './base'

const api = {
  // 需要传一个page
  getsysInfoList(params){
    return axios.get(base.sysInfoList, {
      params
    });
  },
  searchsysInfoList(params){
    return axios.get(base.searchSysInfo, {
      params
    });
  },
  deleteItem(params){
    return axios.get(base.deleteItem, {
      params
    });
  },
  selectTitle(params){
    return axios.get(base.selectTitle, {
      params
    });
  },
  selectTitleTree(params){
    return axios.get(base.selectTitleTree, {
      params
    });
  },
  // 登录
  // params = {adminID, adminPwd}
  getLogin(params){
    return axios.post(base.login,require('queryString').stringify(params))
  }
}

export default api
