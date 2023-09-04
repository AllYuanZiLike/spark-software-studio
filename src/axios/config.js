import axios from 'axios'
// import service from "@/api/service";

//创建axios实例
const Service = axios.create({
    // 设置baseURL地址
    baseURL: 'http://127.0.0.1:4523/m1/3206006-0-default',
    // headers:{
    //     "Content-Type":"application/json; charset=UTF-8"
    // },
    time: 5000
})

Service.interceptors.request.use(config=>{

    if(window.sessionStorage.getItem("token") !== null){
        config.headers.Authorization = window.sessionStorage.getItem("token");
    }
    return config;
})

export default Service
