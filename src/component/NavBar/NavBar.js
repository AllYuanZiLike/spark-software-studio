import "./NavBar.less"
import React,{useCallback} from "react";
import {Button,Tooltip,Popover,ConfigProvider} from 'antd'
import {UserOutlined,ProfileFilled} from '@ant-design/icons'
import LoginForm from '../loginForm/login.tsx'
import {useHistory} from "react-router-dom";


function NavBar (){
    const loginRef=React.createRef();
    const login = useCallback(()=>{
        loginRef.current.showModal()
        console.log("打开登录弹窗")
    },[loginRef])
    const history = useHistory();
    const toIntro = ()=> {
        history.push('/intro')
    }
    const toMembers = ()=> {
        history.push('/members')
    }
    const toDaily = ()=> {
        history.push('/daily')
    }
    const toStudy = ()=> {
        history.push('/study')
    }
    const toEnrollment = ()=> {
        history.push('/enrollment')
    }
    const toManage = ()=> {
        history.push('/manage')
    }

    return(
        <div className="nav">
            <div className="left">
                <img src={require('../../assets/NavBar/logo_nav.png')} alt=""/>
            </div>
            <div className="menu">
                <Popover className='popover-box' content={()=>(
                    <ul>
                        <li className="intro" tabIndex="0" onClick={toIntro}> {'简介 >'}</li>
                        <li className="members" tabIndex="1" onClick={toMembers}> {'成员 >'}</li>
                        <li className="daily" tabIndex="2" onClick={toDaily}> {'日常 >'}</li>
                        <li className="study" tabIndex="3" onClick={toStudy}> {'学习 >'}</li>
                        <li className="enrollment" tabIndex="4" onClick={toEnrollment}> {'招新 >'}</li>
                    </ul>
                )} trigger="click">
                    <Button type="primary" shape="circle" icon={<ProfileFilled />} />
                </Popover>
            </div>
            <div className="center">
                <ul>
                    <li className="intro" tabIndex="0" onClick={toIntro}>简介</li>
                    <li className="members" tabIndex="1" onClick={toMembers}>成员</li>
                    <li className="daily" tabIndex="2" onClick={toDaily}>日常</li>
                    <li className="study" tabIndex="3" onClick={toStudy}>学习</li>
                    <li className="enrollment" tabIndex="4" onClick={toEnrollment}>招新</li>
                    {/*<li className="audit" tabIndex="5" onClick={toManage}>管理</li>*/}
                </ul>
            </div>
            <div className="right">
                <Tooltip>
                    <Button className="login" onClick={login} size="large" type="primary" icon={<UserOutlined />}>登录</Button>
                </Tooltip>
                <LoginForm ref={loginRef}></LoginForm>
            </div>
        </div>
    )
}

export default NavBar
