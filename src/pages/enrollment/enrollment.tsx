import React, {useEffect, useState} from 'react';
import {Button, Tabs,Upload,message,Modal } from 'antd';
import type { UploadProps } from 'antd';
import baseService from '../../axios/config'
import './enrollment.less'
import store from "../../redux/store";

const {withRouter} = require('react-router-dom')

function Enrollment(props:any){
    const { TabPane } = Tabs;
    const { confirm } = Modal;
    const [items,setItems] = useState([
        {
            name: `招新对象`,
            id: 1,
            description: `2023级信息工程学院与计算机科学与技术学院新生。`,
            // photo:require(''),
            // video:require('')
        },
        {
            name: `招新要求`,
            id: 2,
            description: `责任心强，对编程感兴趣，有较强的逻辑思维能力。`,
        },
        {
            name: `招新时间`,
            id: 3,
            description: `2023年9月9日至2023年10月9日`,
        },
        {
            name: `招新地点`,
            id: 4,
            description: `河南科技学院新东校区弘毅楼507`,
        },
        {
            name: `招新方式`,
            id: 5,
            description: `申请人将报名表交到指定地点进行登记报名，统一进行面试。`,
        },
    ])
    const getItems = ()=>{
        baseService.get('/publicize/selectPublicize',{params:{name:''}}).then(res=>{
            console.log(res)
            if(res.status!==200) return false
            setItems(res.data.data)
        })
    }

    const [tempFile,setTempFile] = useState();
    const getTempFile = ()=>{
        baseService.get('/template/getTemplate').then(res=>{
            if(res.status!==200) return false
            setTempFile(res.data.data.template)
        })
    }
    const [process,setProcess] = useState({
        id: "",
        photo: require("../../assets/enrollment/erweima.png"),
        text1:"扫码加入招新群，了解更多关于我们的信息",
        text2:"下载简历模板，填写简历",
        text3:"点击二维码下方按钮上传简历，等待面试通知",
        text4:"进行面试，加入我们",
        text5:null,
        text6:null
    })
    const getProcess = ()=>{
        baseService.get('/Process/selectProcess').then(res=>{
            console.log(res)
            if(res.status!==200) return false
            setProcess(res.data.data)
        })
    }
    const [isLogin,setIsLogin] = useState(store.getState);
    useEffect(()=>{
        getItems()
        getTempFile()
        getProcess()
        console.log(window.sessionStorage.getItem('userId'))
        setIsLogin(store.getState())
    },[props.getNavLogin,store.getState()])
    const [fileList, setFileList] = useState([]);

    const customRequest = (options:any) => {
        console.log(options)
            baseService.put(`/file/insertFiles/byId`, {user_id:window.sessionStorage.getItem('userId'),file: options}).then(res=>{
                console.log(res)
                if (res.status!==200) return false
                message.success(res.data.data)
            })
            // 在这里编写自己的上传逻辑，例如使用 axios 发送请求
            // 可以使用 options.file 来获取上传的文件内容
            // 可以使用 options.onSuccess 来处理上传成功后的回调
            // 可以使用 options.onError 来处理上传失败后的回调
        };

    const beforeUpload = (options:any) => {
            // 可以在这里处理上传之前的逻辑，例如校验文件类型等
            if(!isLogin) {
                return Promise.reject('请先登录');
            }
            baseService.get(`/file/isDeliver/${window.sessionStorage.getItem('userId')}`,).then(res=>{
                console.log(res)
                if(res.status!==200) return false
                if(res.data.data==1) {
                    confirm({
                        content: '您已经上传过简历，再次上传将会覆盖之前的文件，确定继续上传吗？',
                        okText: '确定',
                        okType: 'danger',
                        cancelText:'取消',
                        onOk() {
                            const ispdf = options.type === 'application/pdf';
                            if (!ispdf) {
                                message.error(`${options.name} 不是一个 pdf 类型的文件`);
                            }
                            customRequest(options);
                        },
                        onCancel() {
                            message.info(`已取消`);
                        },
                    });
                } else {
                    const ispdf = options.type === 'application/pdf';
                    if (!ispdf) {
                        message.error(`${options.name} 不是一个 pdf 类型的文件`);
                    }
                    customRequest(options);
                }
            })

        };

    const handleChange = (info:any) => {
        setFileList(info.fileList);
        // if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        // }
        // if (info.file.status === 'done') {
        //     message.success(`${info.file.name} 上传成功`);
        // } else if (info.file.status === 'error') {
        //     return false
        // }
    };
    // const propsUpload: UploadProps = {
    //     name: '简历',
    {/*    accept:'application/pdf',*/}
    //     action: `http://123.249.27.251:8080/file/insertFiles/${window.sessionStorage.getItem('userId')}`,
    {/*    maxCount:1,*/}
    //     headers: {
    //         authorization: 'authorization-text',
    //     },
    //     beforeUpload: (file) => {
    //         console.log(isLogin)
    //         if(!isLogin) {
    {/*            return Promise.reject('请先登录');*/}
    {/*        }*/}
    {/*        const ispdf = file.type === 'application/pdf';*/}
    {/*        if (!ispdf) {*/}
    {/*            message.error(`${file.name} 不是一个 pdf 类型的文件`);*/}
    {/*        }*/}
    //         return Promise.resolve();
    //     },
    {/*    onChange(info) {*/}
    //         console.log(info)
    //         if (info.file.status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (info.file.status === 'done') {
    //             message.success(`${info.file.name} 上传成功`);
    //         } else if (info.file.status === 'error') {
    //             message.error(`${info.file.name} 上传失败`);
    //         }
    //     },
    // };
    return(
        <div className='enrollment-box'>
            <Tabs defaultActiveKey="1" type="card" size='large'>
                {items.map((tab, index) => (
                    <TabPane key={index} tab={tab.name}>
                        {tab.description}
                    </TabPane>
                ))}
            </Tabs>
            <div className="enroll-media">
                <div className="enroll-media-left">
                    {items.map((item,index)=>(
                        <span key={index} className='enroll-item'>{item.name}：</span>
                    ))}
                </div>
                <div className="enroll-media-right">
                    {items.map((item,index)=>(
                        <span key={index} className='enroll-item'>{item.description}</span>
                    ))}
                </div>
            </div>
            <div className="process">
                <div className="process-l">
                    <ol>
                        <li>{process.text1}</li>
                        <li>{process.text2}<br/></li>
                        <li>{process.text3}</li>
                        <li>{process.text4}</li>
                        <li style={{display:process.text5==null?'none':'block'}}>{process.text5}</li>
                        <li style={{display:process.text6==null?'none':'block'}}>{process.text6}</li>
                        (<a href={tempFile}>点击下载简历模板</a>)
                    </ol>
                </div>
                <div className="process-r">
                    <div className="img">
                        <img src={process.photo} alt=""/>
                    </div>
                    <Upload name="file" showUploadList={false} headers={{authorization: 'authorization-text'}} accept='application/pdf' fileList={fileList} beforeUpload={beforeUpload} onChange={handleChange}  >
                        <Button type='primary'  style={{display:isLogin?'block':'none'}}>点击上传简历</Button>
                    </Upload>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Enrollment)
