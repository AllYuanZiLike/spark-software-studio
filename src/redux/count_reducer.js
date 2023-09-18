
/**
 * 1. 该文件是用于创建一个为为Count组件服务的reducer,reducer的本质是一个函数
 * 2. reducer函数会接收到两个参数，分别为：之前的状态（preState），动作对象（action）
 */
var isLogin = window.sessionStorage.getItem('userId')===null?false:true; //初始化状态
// preState===undefined时，preState = intState
export default function countReducer(preState = isLogin, action) {
    // 从action对象中获取：type,data
    const { type, data } = action;
    // 根据type决定加工数据
    switch (type) {
        // 改变登录状态
        case "updateIsLogin":
            return !data;
    }
}
