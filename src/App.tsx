import './App.css';
import NavBar from './component/NavBar/NavBar'
import Footer from "./component/footer/footer";
import React from "react";
import Intro from './pages/intro/intro'
import Members from "./pages/members/members";
import Daily from "./pages/daily/daily";
import Study from "./pages/study/study";
import Enrollment from "./pages/enrollment/enrollment";
import Manage from "./pages/manage/index";
import {ConfigProvider} from 'antd'
const {Route,BrowserRouter,Redirect} =require( "react-router-dom");
function App() {
  return (
      <div className="App">
          <ConfigProvider theme={{token: {// Seed Token，影响范围大
                  colorPrimary: '#92c78a',
                  borderRadius: 2,
                  // 派生变量，影响范围小
                  colorBgContainer: '#e9f3e0',},
          }}>
          <BrowserRouter>
              <NavBar></NavBar>
                  <Redirect from='/' to='/intro' exact></Redirect>
                  <Route component={Intro} path="/intro"></Route>
                  <Route component={Members} path="/members"></Route>
                  <Route component={Daily} path="/daily"></Route>
                  <Route component={Study} path="/study"></Route>
                  <Route component={Enrollment} path="/enrollment"></Route>
                  <Route component={Manage} path="/manage"></Route>
              <Footer></Footer>
          </BrowserRouter>
          </ConfigProvider>
      </div>
  );
}

export default App;
