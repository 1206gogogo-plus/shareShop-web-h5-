import axios from 'axios'
import store from '../store';
import router from '../router';
import vueCookies from 'vue-cookies'

const TIME_OUT_MS= 10 * 1000 ;  // 请求超时时间
//const BASE_URL='http://112.74.165.55:8080/shareshop/';  //wang
//const BASE_URL='http://10.120.203.64:8080/shareshop/';   //chen
const BASE_URL='/api';

let handleURL = function(url){
    url=BASE_URL +'/'+url;
    return  url;
} 

let handleParams = function(data){


    return data;
}

//拦截器
// axios.interceptors.request.use(config=>{

// },
// error=>{
//     return  Promise.reject(error);
// });

axios.interceptors.request.use(
    request=>{
        request.headers.Authorization=vueCookies.get("token");



        return request;
    }
)

axios.interceptors.response.use(
    response=>{
        
        //tep 等登录的解决后再去掉
        //return response;
        //console.log("请求回执：");
        //console.log(typeof(response.data));
       switch(response.data.code){
           //未登录
           case 403:{
             console.log("need logined, path in :"+ router.currentRoute.fullPath );
            // console.log(response);
                store.commit('update_isLogined',{isLogined:false});
                router.push({
                    path:'login',
                    query:{
                        redirect:router.currentRoute.fullPath,
                    }
                });
               
           };break;
       }
       return response;
    }
)



export default {

    //封装的 POST 方法
     post:function(url,data,response,exception){
        axios({
            method:'post',
            url:handleURL(url),
            data:handleParams(data),
            timeout:TIME_OUT_MS,
            withCredentials:false,
            headers:{
                'Content-Type':'application/json; charset=UTF-8',
                'Access-Control-Allow-Orgin':'*',
            },
        }).then((result)=>{
            response(result);
        }).catch((error)=>{
            if(exception){
                exception(error);
            }else{
                console.log(error)
            }
        })

    },

    //封装的get请求
    get(url,params,response,exception){
        axios({
            method:'get',
            url:handleURL(url),
            params:params,
            timeout:TIME_OUT_MS,
            withCredentials:false,
            headers:{
                'Content-Type':'application/json; charset=UTF-8'
            }

        }).then((result)=>{
            response(result);
        }).catch((error)=>{
            if(exception){
                exception(error);
            }else{
                console.log(error);
            }
        })
    }

}