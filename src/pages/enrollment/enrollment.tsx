import React, {useEffect, useState} from 'react';
import {Button, Tabs,Upload,message } from 'antd';
import type { UploadProps } from 'antd';
import baseService from '../../axios/config'
import './enrollment.less'
import store from "../../redux/store";

const {withRouter} = require('react-router-dom')

function Enrollment(props:any){
    const { TabPane } = Tabs;
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
    const [userId,setUserId] = useState(null)
    const [isLogin,setIsLogin] = useState(store.getState);
    useEffect(()=>{
        getItems()
        getTempFile()
        getProcess()

        setIsLogin(store.getState())
    },[props.getNavLogin,store.getState()])

    const propsUpload: UploadProps = {
        name: 'file',
        accept:'application/pdf',
        action: `http://192.168.137.165:8080/file/insertFiles/${userId}`,
        maxCount:1,
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: (file) => {
            console.log(isLogin)
            if(!isLogin) {
                return Promise.reject('请先登录');
            }
            const id = window.sessionStorage.getItem('userId');
            setUserId(id==null?null:userId)
            const ispdf = file.type === 'application/pdf';
            if (!ispdf) {
                message.error(`${file.name} 不是一个 pdf 类型的文件`);
            }
            return Promise.resolve();
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 上传成功`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败`);
            }
        },
    };
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
                    <Upload {...propsUpload}>
                        <Button type='primary'  style={{display:isLogin?'block':'none'}}>点击上传简历</Button>
                    </Upload>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Enrollment)
