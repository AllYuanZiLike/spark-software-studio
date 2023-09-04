import React, {forwardRef, useImperativeHandle,useState } from 'react';
import {Button,Checkbox,message, Form, Input,Modal} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.less'
import baseService from '../../axios/request'


const Login = forwardRef((props:any,ref)=>{
    const [messageApi,contextHolder] = message.useMessage();
    useImperativeHandle(ref,
        () => ({showModal})
    );

    const [open, setOpen] = useState(false);
    const [isLogin,setIsLogin] = useState(true);

    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const switchBox = ()=>{
        setIsLogin(!isLogin)
    };
    const [loginSubmit,setLoginSubmit] = useState({})
    const onLoginFinish = (values: any) => {
        console.log(values);
        setLoginSubmit(values)

    };
    const [loginForm] = Form.useForm()
    const login = ()=>{
        console.log(loginSubmit)
        baseService.get({url:'/user/login',loginSubmit}).then(res => {
            console.log(res)
            if(res.status!==200) return false
            messageApi.open({
                type: 'success',
                content: '登录成功',
            })
            setOpen(false)
        })
    }
    const [registerSubmit,setRegisterSubmit] = useState({})
    const onRegisterFinish = (values: any) => {
        console.log(values);
        setRegisterSubmit(values)
    };
    const [registerForm] = Form.useForm()
    const register = ()=>{
        console.log(registerSubmit)
        baseService.post({url:'/user/register',registerSubmit}).then(res => {
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
            <Modal className="modal-box1" width="60vw" title="" open={open} onOk={hideModal} onCancel={hideModal} footer={null} centered>
                <div className="login-box" style={{width: "50vw",display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column"}}>
                    <div className="top">{isLogin?'登录':'注册'}</div>
                    <Form name="normal_login" form={loginForm} hidden={!isLogin} className="login-form" initialValues={{ remember: false }} onFinish={onLoginFinish}>
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
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={login}>
                                {isLogin?'登录':'注册'}
                            </Button>
                            Or <a onClick={switchBox}>{isLogin?'立即注册':'去登录'}!</a>
                        </Form.Item>
                    </Form>
                    {/*注册表单*/}
                    <Form name="normal_register" form={registerForm} hidden={isLogin} className="register-form" onFinish={onRegisterFinish}>
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

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-button" onClick={register}>
                                {isLogin?'登录':'注册'}
                            </Button>
                            Or <a onClick={switchBox}>{isLogin?'立即注册':'去登录'}!</a>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
})

export default Login
