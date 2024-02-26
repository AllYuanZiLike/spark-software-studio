import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Select,Button,Checkbox,message, Form, Input,Modal} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.less'
import baseService from '../../axios/config'
import store from "../../redux/store";
// import {useHistory} from "react-router-dom";
const {useHistory} = require('react-router-dom')

const Login = forwardRef((props:any,ref)=>{
    const [messageApi,contextHolder] = message.useMessage();
    useImperativeHandle(ref,
        () => ({showModal})
    );
    const history = useHistory();
    const collegeData = ['计算机科学与技术学院','软件学院','信息工程学院'];
    const professData = {
        计算机科学与技术学院:['计算机科学与技术','数据科学与大数据技术','物联网工程'],
        软件学院:['数据科学与大数据技术'],
        信息工程学院:['信息工程','通信工程','教育技术学']
    }
    type professName = keyof typeof professData;
    const [college,setCollege] = useState(professData[collegeData[0] as professName]);
    const [profession,setProfess] = useState(professData[collegeData[0] as professName][0]);
    const handleCollegeChange = (value: professName) => {
        setCollege(professData[value]);
        setProfess(professData[value][0]);
    };
    const onProfessChange = (value: professName) => {
        setProfess(value);
    };
    const [open, setOpen] = useState(false);
    const [isLoginBtn,setIsLoginBtn] = useState(true);

    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const switchBox = ()=>{
        setIsLoginBtn(!isLoginBtn)
    };
    const [loginSubmit,setLoginSubmit] = useState({})
    const onLoginFinish = (values: any) => {
        console.log(values);
        setLoginSubmit(values)
        login(values)

    };
    const [loginForm] = Form.useForm()
    const login = (values: any)=>{
        console.log(loginSubmit)
        console.log(store.getState())
            baseService.get('/user/login', {params: values}).then(res => {
                console.log(res)
                if(res.status!==200) return false
                window.sessionStorage.setItem('userId',res.data.data)
                messageApi.open({
                    type: 'success',
                    content: '登录成功',
                })
                history.push('/intro');
                setOpen(false)
                store.dispatch({type:'updateIsLogin',data: store.getState()})
                props.getIsLogin(store.getState())
                console.log(store.getState())
            })


    }
    const [registerSubmit,setRegisterSubmit] = useState({})
    const onRegisterFinish = (values: any) => {
        setRegisterSubmit(values)
        register(values)
    };
    const [registerForm] = Form.useForm()
    const register = (values:any)=>{
        console.log(registerSubmit)
        baseService.post('/user/register',values,{
            headers:{
                "Content-Type":"application/json;charset=UTF-8;"
            }
        }).then(res => {
            console.log(res)
            if(res.status!==200) return false
            messageApi.open({
                type: 'success',
                content: '注册成功，请登录'
            })
            switchBox()
        })
    }
    return(
        <div className='modal-box'>
            {contextHolder}
            <Modal className="modal-box1" width="20vw" title="" open={open&&window.innerWidth>500} onOk={hideModal} onCancel={hideModal} footer={null} centered>
                <div className="login-box">
                    <div className="top">{isLoginBtn?'登录':'注册'}</div>
                    <Form name="normal_login" form={loginForm} hidden={!isLoginBtn} className="login-form" initialValues={{ remember: false }} onFinish={onLoginFinish}>
                        <Form.Item name="username"
                                   rules={[{ required: true, message: '请输入你的用户名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item name="password"
                                   rules={[{ required: true, message: '请输入你的密码!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        {/*<Form.Item>*/}
                            {/*<Form.Item name="remember" valuePropName="checked" noStyle>*/}
                            {/*    <Checkbox>记住密码</Checkbox>*/}
                            {/*</Form.Item>*/}
                            {/*<a className="login-form-forgot" href="">*/}
                            {/*    忘记密码*/}
                            {/*</a>*/}
                        {/*</Form.Item>*/}
                        <Form.Item style={{marginBottom:0}}>
                            <div className="btn-box" style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    {isLoginBtn?'登录':'注册'}
                                </Button>
                                <Button type="primary" className="login-form-button" onClick={switchBox}>
                                    {!isLoginBtn?'登录':'注册'}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                    {/*注册表单*/}
                    <Form name="normal_register" form={registerForm} hidden={isLoginBtn} className="register-form" onFinish={onRegisterFinish}>
                        <Form.Item name="username" label="用户名"
                                   rules={[{ required: true, message: '请输入你的用户名!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="邮箱"
                                   rules={[
                                       {type: 'email', message: '所填写的不是邮箱!',},
                                       {required: true, message: '请填写你的邮箱!',},
                                   ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="password" label="密码" hasFeedback
                                   rules={[
                                       {required: true, message: '请填写你的密码!',},
                                   ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="confirm" label="确认密码" dependencies={['password']} hasFeedback
                                   rules={[
                                       {required: true, message: '请确认你的密码!',},
                                       ({ getFieldValue }) => ({
                                           validator(_, value) {
                                               if (!value || getFieldValue('password') === value) {
                                                   return Promise.resolve();
                                               }
                                               return Promise.reject(new Error('与输入的新密码不一致!'));
                                           },
                                       }),
                                   ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="grade" label="年级"
                                   rules={[
                                       {required: true, message: '请填写你的年级!',},
                                   ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                options={[
                                    { value: '2021级', label: '2021级' },
                                    { value: '2022级', label: '2022级' },
                                    { value: '2023级', label: '2023级' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item name="college" label="学院"
                                                   rules={[
                                                       {required: true, message: '请填写你的学院!',},
                                                   ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                onChange={handleCollegeChange}
                                options={collegeData.map((college) => ({ label: college, value: college }))}
                            />
                        </Form.Item>
                        <Form.Item name="profession" label="专业"
                                   rules={[
                                       {required: true, message: '请填写你的专业!',},
                                   ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                onChange={onProfessChange}
                                options={college.map((profess) => ({ label: profess, value: profess }))}
                            />
                        </Form.Item>
                        <Form.Item name="classes" label="班级"
                                   rules={[
                                       {required: true, message: '请填写你的班级!',},
                                   ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="realName" label="姓名"
                                   rules={[
                                       {required: true, message: '请填写你的姓名!',},
                                   ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="phone" label="电话"
                                   rules={[
                                       {required: true, message: '请填写你的手机号!',},
                                   ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="blog" label="博客地址">
                            <Input placeholder="CSDN个人主页地址（非必填）"/>
                        </Form.Item>
                        <Form.Item style={{marginBottom:0}}>
                            <div className="btn-box" style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                <Button type="primary" htmlType="submit" className="register-form-button">
                                    {isLoginBtn?'登录':'注册'}
                                </Button>
                                <Button type="primary" className="register-form-button" onClick={switchBox}>
                                    {!isLoginBtn?'登录':'注册'}
                                </Button>
                            </div>
                            {/*Or <a onClick={switchBox}>{isLoginBtn?'立即注册':'去登录'}!</a>*/}
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <Modal className="modal-box2" width="60vw" title="" open={open&&!(window.innerWidth>500)} onOk={hideModal} onCancel={hideModal} footer={null} centered>
                <div className="login-box">
                    <div className="top">{isLoginBtn?'登录':'注册'}</div>
                    <Form name="normal_login" form={loginForm} hidden={!isLoginBtn} className="login-form" initialValues={{ remember: false }} onFinish={onLoginFinish}>
                        <Form.Item name="username"
                                   rules={[{ required: true, message: '请输入你的用户名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item name="password"
                                   rules={[{ required: true, message: '请输入你的密码!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        {/*<Form.Item>*/}
                        {/*<Form.Item name="remember" valuePropName="checked" noStyle>*/}
                        {/*    <Checkbox>记住密码</Checkbox>*/}
                        {/*</Form.Item>*/}
                        {/*<a className="login-form-forgot" href="">*/}
                        {/*    忘记密码*/}
                        {/*</a>*/}
                        {/*</Form.Item>*/}
                        <Form.Item style={{marginBottom:0}}>
                            <div className="btn-box" style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    {isLoginBtn?'登录':'注册'}
                                </Button>
                                <Button type="primary" className="login-form-button" onClick={switchBox}>
                                    {!isLoginBtn?'登录':'注册'}
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                    {/*注册表单*/}
                    <Form name="normal_register" form={registerForm} hidden={isLoginBtn} className="register-form" onFinish={onRegisterFinish}>
                        <Form.Item name="username" label="用户名"
                                   rules={[{ required: true, message: '请输入你的用户名!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="邮箱"
                                   rules={[
                                       {type: 'email', message: '所填写的不是邮箱!',},
                                       {required: true, message: '请填写你的邮箱!',},
                                   ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name="password" label="密码" hasFeedback
                                   rules={[
                                       {required: true, message: '请填写你的密码!',},
                                   ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="confirm" label="确认密码" dependencies={['password']} hasFeedback
                                   rules={[
                                       {required: true, message: '请确认你的密码!',},
                                       ({ getFieldValue }) => ({
                                           validator(_, value) {
                                               if (!value || getFieldValue('password') === value) {
                                                   return Promise.resolve();
                                               }
                                               return Promise.reject(new Error('与输入的新密码不一致!'));
                                           },
                                       }),
                                   ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name="grade" label="年级"
                                   rules={[
                                       {required: true, message: '请填写你的年级!',},
                                   ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                options={[
                                    { value: '2021级', label: '2021级' },
                                    { value: '2022级', label: '2022级' },
                                    { value: '2023级', label: '2023级' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item name="college" label="学院"
                                   rules={[
                                       {required: true, message: '请填写你的学院!',},
                                   ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                onChange={handleCollegeChange}
                                options={collegeData.map((college) => ({ label: college, value: college }))}
                            />
                        </Form.Item>
                        <Form.Item name="profession" label="专业"
                                   rules={[
                                       {required: true, message: '请填写你的专业!',},
                                   ]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                onChange={onProfessChange}
                                options={college.map((profess) => ({ label: profess, value: profess }))}
                            />
                        </Form.Item>
                        <Form.Item name="classes" label="班级"
                                   rules={[
                                       {required: true, message: '请填写你的班级!',},
                                   ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="realName" label="姓名"
                                   rules={[
                                       {required: true, message: '请填写你的姓名!',},
                                   ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="phone" label="电话"
                                   rules={[
                                       {required: true, message: '请填写你的手机号!',},
                                   ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="blog" label="博客地址">
                            <Input placeholder="CSDN个人主页地址（非必填）"/>
                        </Form.Item>
                        <Form.Item style={{marginBottom:0}}>
                            <div className="btn-box" style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                                <Button type="primary" htmlType="submit" className="register-form-button">
                                    {isLoginBtn?'登录':'注册'}
                                </Button>
                                <Button type="primary" className="register-form-button" onClick={switchBox}>
                                    {!isLoginBtn?'登录':'注册'}
                                </Button>
                            </div>
                            {/*Or <a onClick={switchBox}>{isLoginBtn?'立即注册':'去登录'}!</a>*/}
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
})

export default Login
