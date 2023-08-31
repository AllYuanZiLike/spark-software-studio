import React from 'react';
import './web.less'
import {  Timeline } from 'antd';

const {withRouter} = require('react-router-dom')
function Web(){
    const items = [
        {
            label: '大一第一学期',
            color:'#f8a673',
            children: '前端基础:\nHTML+CSS3+JavaScript',
        },
        {
            label: '大一第二学期+暑假',
            color:'#73f889',
            children: '服务器端:\nAjax Node',
        },
        {
            label: '大二第一学期+寒假',
            color:'#739df8',
            children: '前端框架:\nVUE REACT APP FLUTTER',
        },
        {
            label: '大二第二学期+暑假',
            color:'#bc73f8',
            children: '项目实践',
        },
    ]
    return(
        <div className='web-box'>
            <Timeline mode='alternate' className='timelines'
                items={items}
            />
            <div className="img-box">
                <div className="first">
                    <img src={require('../../../assets/study/web.png')} />
                </div>
                <div className="first">
                    <img src={require('../../../assets/study/web2.png')} />
                </div>
                <div className="first">
                    <img src={require('../../../assets/study/web3.png')} />
                </div>
                <div className="first">
                    <img src={require('../../../assets/study/web4.png')} />
                </div>
            </div>
        </div>
    )
}
export default withRouter(Web)
