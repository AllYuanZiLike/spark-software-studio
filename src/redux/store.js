import { createStore } from "redux";
// 引入为count组件服务的reducer
import countReducer from "./count_reducer";

const store = createStore(countReducer);
export default store;
