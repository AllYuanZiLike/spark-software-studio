import Service from "./config";

//封装get请求
const get = (config) => {
    // console.log(config);
    return Service({
        ...config,
        // headers: config.headers,
        method: 'get',
        params: config.data
    })
}

//封装post请求
const post = (config) => {
    // console.log(...config);
    return Service({
        ...config,
        // headers: config.headers,
        // Service.headers,
        method: 'post',
        data: config.data
    })
}

//封装put请求
const put = (config) => {
    return Service({
        ...config,
        method:'put',
        data: config.data
    })
}

//封装delete请求
const remove = (config) => {
    return Service({
        ...config,
        method:'delete',
        data: config.data
    })
}

export default {
    get,
    post,
    put,
    remove
}