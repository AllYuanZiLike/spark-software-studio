import {Switch,Route,BrowserRouter,Redirect} from "react-router-dom";
import React from "react";
import Intro from '../pages/intro/intro'
import Members from "../pages/members/members";
import Daily from "../pages/daily/daily";
import Study from "../pages/study/study";
import Enrollment from "../pages/enrollment/enrollment";

function Index(){
    return(
        <BrowserRouter>
            <Switch>
                <Redirect from='/' to='/intro' exact></Redirect>
                <Route component={Intro} path="/intro"></Route>
                <Route component={Members} path="/members"></Route>
                <Route component={Daily} path="/daily"></Route>
                <Route component={Study} path="/study"></Route>
                <Route component={Enrollment} path="/enrollment"></Route>
            </Switch>
        </BrowserRouter>
    )
}
export default Index
