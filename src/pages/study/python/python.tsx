import React, {useEffect, useState} from "react";
import baseService from "../../../axios/config";
import {Timeline} from "antd";

const {withRouter} = require('react-router-dom')
function Python(){
    const [python,setPython] = useState([
        {
            stage: "6",
            description: "大数据",
            photo: "6"
        }
    ])
    const items = python.map(item=>{
        return {
            label:item.stage,
            color:'#f8a673',
            children:item.description
        }
    })
    const getPython = ()=>{
        baseService.get('/direction/byName',{params:{directionName:"前端"}}).then(res=>{
                console.log(res)
                if(res.status!==200) return false
                setPython(res.data.data)
            }
        )
    }
    useEffect(()=>{
        getPython()
    },[])
    return(
        <div className='python-box'>
            <Timeline mode='alternate' className='timelines'
                      items={items}
            />
            <div className="img-box">
                {python.map((items,index)=>{
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
export default withRouter(Python)
