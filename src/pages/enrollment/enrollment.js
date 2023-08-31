import React from 'react';
import {Button, Tabs} from 'antd';
import './enrollment.less'

const {withRouter} = require('react-router-dom')

function Enrollment(){
    const items = [
        {
            label: `招新对象`,
            key: 1,
            children: `2023级信息工程学院与计算机科学与技术学院新生。`,
        },
        {
            label: `招新要求`,
            key: 2,
            children: `责任心强，对编程感兴趣，有较强的逻辑思维能力。`,
        },
        {
            label: `招新时间`,
            key: 3,
            children: `2023年9月9日至2023年10月9日`,
        },
        {
            label: `招新地点`,
            key: 4,
            children: `河南科技学院新东校区弘毅楼507`,
        },
        {
            label: `招新方式`,
            key: 5,
            children: `申请人将报名表交到指定地点进行登记报名，统一进行面试。`,
        },
    ];
    return(
        <div className='enrollment-box'>
            <Tabs defaultActiveKey="1" type="card" size='large' items={items}/>
            <div className="enroll-media">
                <div className="enroll-media-left">
                    {items.map((item,index)=>(
                        <span className='enroll-item'>{item.label}：</span>
                    ))}
                </div>
                <div className="enroll-media-right">
                    {items.map((item,index)=>(
                        <span className='enroll-item'>{item.children}</span>
                    ))}
                </div>
            </div>
            <div className="process">
                <div className="process-l">
                    <ol>
                        <li>扫码加入招新群，了解更多关于我们的信息</li>
                        <li>下载简历模板，填写简历<br/>(<a href='#'>点击下载简历模板</a>)</li>
                        <li>点击二维码下方按钮上传简历，等待面试通知</li>
                        <li>进行面试，加入我们</li>
                    </ol>
                </div>
                <div className="process-r">
                    <div className="img">
                        <img src={require("../../assets/enrollment/erweima.png")} alt=""/>
                    </div>
                    <Button type='primary'>点击上传简历</Button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Enrollment)
