import service from './request'
// import * as url from "url";

const getCodeApi = data => {
    return service.get({
        url:"/auth/captcha",
        data,
        responseType:"blob",
    })
}

const loginApi = data => {
    return service.post({
        url: '/auth/login',
        data
    })
}

const registerApi = data => {
    return service.get({
        url: '/user/register',
        data
    })
}

const homePage = data => {
    return service.get({
        url:'/goods/page',
        data
    })
}

const homeSave = data => {
    return service.post({
        url:'/goods/save',
        data
    })
}

const homeShow = data => {
    return service.get({
        url: '/goods/page',
        data
    })
}

const homeInfoShow = data => {
    return service.get({
        url: `/goods/${data}`,

    })
}

const homeUpdate = data => {
    return service.put({
        url: '/goods/update',
        data
    })
}
const homeDelete = data => {
    return service.get({
        url: `/goods/del`,
        data
    })
}

const userPage = data => {
    return service.get({
        url: '/user/list',
        data
    })
}

const userSave = data => {
    return service.post({
        url: '/user/save',
        data
    })
}

const userUpdate = data => {
    return service.put({
        url: '/user/update',
        data
    })
}

const userDelete = data => {
    return service.get({
        url: "/user/delete",
        data
    })
}
export default {
    getCodeApi,
    loginApi,
    registerApi,
    homePage,
    homeSave,
    homeShow,
    homeInfoShow,
    homeUpdate,
    homeDelete,
    userPage,
    userSave,
    userUpdate,
    userDelete,
}
