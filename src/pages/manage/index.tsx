import './index.less'
import IntroManage from "./intro/intro-manage";
import MembersManage from "./members/members-manage";
import DailyManage from "./daily/daily-manage";
import StudyManage from "./study/study-manage";
import EnrollManage from "./enrollment/enroll-manage";
import Audit from "./audit/audit";
import React from "react";
const {Route,withRouter,Redirect,useHistory,Switch} =require( "react-router-dom");

function Index() {
    const history = useHistory();
    const toIntro = ()=> {
        history.push('/manage/intro')
    }
    const toMembers = ()=> {
        history.push('/manage/members')
    }
    const toDaily = ()=> {
        history.push('/manage/daily')
    }
    const toStudy = ()=> {
        history.push('/manage/study')
    }
    const toEnrollment = ()=> {
        history.push('/manage/enrollment')
    }
    const toAudit = ()=> {
        history.push('/manage/audit')
    }
    return (
        <div className='manage-box'>
            <div className="nav">
                <ul>
                    <li className="intro" tabIndex={0} onClick={toIntro}>简介</li>
                    <li className="members" tabIndex={1} onClick={toMembers}>成员</li>
                    <li className="daily" tabIndex={2} onClick={toDaily}>日常</li>
                    <li className="study" tabIndex={3} onClick={toStudy}>学习</li>
                    <li className="enrollment" tabIndex={4} onClick={toEnrollment}>招新</li>
                    <li className="audit" tabIndex={5} onClick={toAudit}>审核</li>
                </ul>
            </div>
            <div className="content">
                <Switch>
                    <Redirect from='/manage' to='/manage/intro' exact></Redirect>
                    <Route path="/manage/intro" component={IntroManage}></Route>
                    <Route path="/manage/members" component={MembersManage}></Route>
                    <Route path="/manage/daily" component={DailyManage}></Route>
                    <Route path="/manage/study" component={StudyManage}></Route>
                    <Route path="/manage/enrollment" component={EnrollManage}></Route>
                    <Route path="/manage/audit" component={Audit}></Route>
                </Switch>
            </div>
        </div>
    )
}
export default withRouter(Index)
