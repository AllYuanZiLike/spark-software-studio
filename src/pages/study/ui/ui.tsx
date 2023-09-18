import React, {useEffect, useState} from "react";
import baseService from "../../../axios/config";
import './ui.less'
import {Timeline} from "antd";

const {withRouter} = require('react-router-dom')
function UI(){
    const [ui,setUI] = useState([
        {
            stage: "6",
            description: "大数据",
            photo: "6"
        }
    ])
    const items = ui.map(item=>{
        return {
            label:item.stage,
            color:'#f8a673',
            children:item.description
        }
    })
    const getUI = ()=>{
        baseService.get('/direction/byName',{params:{directionName:"UI"}}).then(res=>{
                console.log(res)
                if(res.status!==200) return false
                setUI(res.data.data)
            }
        )
    }
    useEffect(()=>{
        getUI()
    },[])
    return(
        <div className='ui-box'>
            <Timeline mode='alternate' className='timelines'
                      items={items}
            />
            <div className="img-box">
                {ui.map((items,index)=>{
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
export default withRouter(UI)
