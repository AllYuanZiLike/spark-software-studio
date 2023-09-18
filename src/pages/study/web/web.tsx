import React, {useEffect, useState} from 'react';
import './web.less'
import baseService from '../../../axios/config'
import {  Timeline } from 'antd';

const {withRouter} = require('react-router-dom')
function Web(){
    const [web,setWeb] = useState([
        {
            stage: "6",
            description: "大数据",
            photo: "6"
        }
    ])
    const items = web.map(item=>{
        return {
            label:item.stage,
            color:'#f8a673',
            children:item.description
        }
    })
    const getWeb = ()=>{
        baseService.get('/direction/byName',{params:{directionName:"前端"}}).then(res=>{
            console.log(res)
            if(res.status!==200) return false
            setWeb(res.data.data)
            }
        )
    }
    useEffect(()=>{
        getWeb()
    },[])
    return(
        <div className='web-box'>
            <Timeline mode='alternate' className='timelines'
                items={items}
            />
            <div className="img-box">
                {web.map((items,index)=>{
                    return(
                        <div key={index} className="first">
                            <img src={items.photo} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default withRouter(Web)
