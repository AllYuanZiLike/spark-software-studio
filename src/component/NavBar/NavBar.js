import "./NavBar.less"
import React, {useEffect, useState} from "react";
import baseService from '../../axios/config'
import {
    Avatar,
    Button,
    Tooltip,
    Popover,
    Dropdown, Menu,
} from 'antd'
import {UserOutlined,ProfileFilled } from '@ant-design/icons'
import LoginForm from '../loginForm/login.tsx'
import UpdateInfo from "./updateInfo";
import {useHistory} from "react-router-dom";
import store from '../../redux/store'


function NavBar (props){
    const loginRef=React.createRef();
    const login = ()=>{
        loginRef.current.showModal()
    }
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
    // const toManage = ()=> {
    //     history.push('/manage')
    // }
    const [infoOpen,setInfoOpen] = useState(false)
    const [isLogin,setIsLogin] = useState(store.getState)
    const dropItems = [
        {
            key: '1',
            label: <Avatar style={{display:!isLogin?'none':'block'}} src={<img src={require('../../assets/NavBar/avatar.png')} alt="avatar" />} />,
            children:[
                {
                    key: '2',
                    label: <a>修改资料</a>,
                },
                {
                    key: '3',
                    label: <a>退出登录</a>,
                },
            ]
        }
    ]

    const [logoNav,setLogoNav] = useState(require('../../assets/NavBar/logo_nav.png'))
    const getLogoNav = ()=>{
        baseService.get("/top/getTop").then(res =>{
            console.log(res)
            if(res.status!==200) return false
            // setLogoNav(require(res.data.data[0].topLogo))
        })
    }
    const isLoginValue = (value)=>{
        // store.dispatch('updateIsLogin',value)
        setIsLogin(value)
    }
    useEffect(()=>{
        getLogoNav()
        setIsLogin(store.getState)
    },[store.getState()])
    return(
        <div className="nav">
            <div className="left">
                <img src={logoNav} alt=""/>
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
                </ul>
            </div>
            <div className="right">
                <Button style={{display:isLogin?'none':'block'}} className="login" onClick={login} size="large" type="primary" icon={<UserOutlined />}>登录</Button>
                <Button style={{display:!isLogin?'none':'block'}} className="login" onClick={()=>{store.dispatch({type:'updateIsLogin',data: isLogin});window.sessionStorage.setItem('userId',null);props.sendIsLogin(isLogin);setIsLogin(!isLogin)}} size="large" type="primary" icon={<UserOutlined />}>退出</Button>
                <LoginForm ref={loginRef} getIsLogin={isLoginValue}></LoginForm>

                {/*<Avatar style={{display:!isLogin?'none':'block'}} src={<img src={require('../../assets/NavBar/avatar.png')} alt="avatar" />} />*/}
                {/*<Menu selectedKeys={['1']} mode="horizontal" items={dropItems} />*/}
                {/*<UpdateInfo infoVisible={infoOpen}></UpdateInfo>*/}
            </div>
        </div>
    )
}

export default NavBar
