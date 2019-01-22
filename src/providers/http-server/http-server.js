import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
import Global from '../../data/global'
import Utils from '../utils/utils'



axios.interceptors.request.use(config => {
  // store.dispatch('showBottomLoad');//显示列表加载中
 /* config.headers.common['MALL_MEMBER_TOKEN_KEY'] = utils.getToken();*/
  return config
}, error => {
  return Promise.reject(error)
})


axios.interceptors.response.use(response => {
  // store.dispatch('hideBottomLoad');//关闭列表加载中
  return response
}, error => {
  return Promise.resolve(error.response)
})

function errorState(response) {
  // 如果http状态码正常，则直接返回数据
}

function successState(res) {
  console.log(res)
  //统一判断后端返回的错误码
  if(res.data.code == 502){
    var pathary = router.currentRoute.path.split('/');
    pathary.splice(0,1)
    router.push({path:'/login',query:pathary})
    return;
  }
}
const httpServer = (opts, data) => {
console.log(this.API1)
  let Public = { //公共参数
    MALL_MEMBER_TOKEN_KEY: Utils.getToken()
  }

  let httpDefaultOpts = { //http默认配置
    method: 'post',
    baseURL:this.API1,
    url:opts,
    timeout: 10000,
    params: Object.assign(data),
    data: qs.stringify(Object.assign(data)),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }

  if(opts.method=='get'){//筛选get或post需要的数据
    delete httpDefaultOpts.data
  }else{
    delete httpDefaultOpts.params
  }

  let promise = new Promise(function(resolve, reject) {//新建promise对象，调用axios，并返回数据
    axios(httpDefaultOpts).then(
      (res) => {
        // successState(res)
        console.log(res)
        // console.log(httpDefaultOpts)
        resolve(res)
      }
    ).catch(
      (response) => {
        errorState(response)
        reject(response)
      }
    )
  })
  return promise
}

export default httpServer
