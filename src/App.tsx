import './App.css';
import NavBar from './component/NavBar/NavBar'
import Footer from "./component/footer/footer";
import React, {useCallback, useState} from "react";
import Intro from './pages/intro/intro'
import Members from "./pages/members/members";
import Daily from "./pages/daily/daily";
import Study from "./pages/study/study";
import Enrollment from "./pages/enrollment/enrollment";
import Manage from "./pages/manage/index";
import {ConfigProvider} from 'antd'
import baseService from './axios/config'
import store from "./redux/store";
import { createBrowserHistory } from 'history';
const {Route,BrowserRouter,Redirect} =require( "react-router-dom");
const history = createBrowserHistory()
function App() {
    const [bgApp,setBgApp] = useState(require('./assets/home_bg.png'))
    const getBgApp = useCallback(()=>{
        baseService.get("/background/selectBackground").then(res=>{
            if(res.status!==200) return false
            // setBgApp(require(res.data.data.photo))
        })
    },[])
    getBgApp()
    const [navIsLogin,setNavIsLogin] = useState(store.getState())
    const isLoginValue = (values:boolean)=>{
        setNavIsLogin(values)
    }
      return (
      <div className="App" style={{backgroundImage:`url(${bgApp})`}}>
          <ConfigProvider theme={{token: {// Seed Token，影响范围大
                  colorPrimary: '#92c78a',
                  borderRadius: 2,
                  // 派生变量，影响范围小
                  colorBgContainer: '#e9f3e0',},
          }}>
          <BrowserRouter history={history}>
              <NavBar sendIsLogin={isLoginValue}></NavBar>
                  <Redirect from='/' to='/intro' exact></Redirect>
                  <Route component={Intro} path="/intro"></Route>
                  <Route component={Members} path="/members"></Route>
                  <Route component={Daily} path="/daily"></Route>
                  <Route component={Study} path="/study"></Route>
                  <Route component={Enrollment} path="/enrollment" getNavLogin={isLoginValue}></Route>
                  <Route component={Manage} path="/manage"></Route>
              <Footer></Footer>
          </BrowserRouter>
          </ConfigProvider>
      </div>
  );
}

export default App;
