import axios from 'axios'
// import service from "@/api/service";

//创建axios实例
const Service = axios.create({
    // 设置baseURL地址
    baseURL: 'http://localhost:8080',
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
