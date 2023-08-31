import './study.less'
import React from "react";
import Web from "./web/web";
import Java from "./java/java";
import Data from "./data/data";
import Python from "./python/python";
import Ui from "./ui/ui";
const {Route,BrowserRouter,Redirect,useHistory,Switch} =require( "react-router-dom");
const {withRouter} = require('react-router-dom')

function Study(){
    const history = useHistory();
    const toWeb = ()=> {
        history.push('/study/web')
    }
    const toJava = ()=> {
        history.push('/study/java')
    }
    const toData = ()=> {
        history.push('/study/data')
    }
    const toPython = ()=> {
        history.push('/study/python')
    }
    const toUI = ()=> {
        history.push('/study/ui')
    }

    return(
        <div className='study-box'>
            <div className='tabs'>
                <ul>
                    <li className='web' onClick={toWeb} tabIndex={1}>大前端</li>
                    <li className='java' onClick={toJava} tabIndex={2}>Java后端</li>
                    <li className='data' onClick={toData} tabIndex={3}>大数据</li>
                    <li className='python' onClick={toPython} tabIndex={4}>Python</li>
                    <li className='ui' onClick={toUI} tabIndex={5}>UI设计</li>
                </ul>

            </div>
            <div className="content">
                {/*<BrowserRouter>*/}
                    <Switch>
                        <Redirect from='/study' to='/study/web' exact></Redirect>
                        {/*<Route path="/study" exact component={Study}></Route>*/}
                        <Route path="/study/web" component={Web}></Route>
                        <Route path="/study/java" component={Java}></Route>
                        <Route path="/study/data" component={Data}></Route>
                        <Route path="/study/python" component={Python}></Route>
                        <Route path="/study/ui" component={Ui}></Route>
                    </Switch>
                {/*</BrowserRouter>*/}
            </div>
        </div>
    )
}

export default withRouter(Study)
