import React, {useEffect, useState} from "react";
import baseService from "../../../axios/config";
import {Timeline} from "antd";
import './data.less'

const {withRouter} = require('react-router-dom')

function Data(){
    const [data,setData] = useState([
        {
            stage: "6",
            description: "大数据",
            photo: "6"
        }
    ])
    const items = data.map(item=>{
        return {
            label:item.stage,
            color:'#f8a673',
            children:item.description
        }
    })
    const getData = ()=>{
        baseService.get('/direction/byName',{params:{directionName:"大数据"}}).then(res=>{
                console.log(res)
                if(res.status!==200) return false
                setData(res.data.data)
            }
        )
    }
    useEffect(()=>{
        getData()
    },[])
    return(
        <div className='data-box'>
            <Timeline mode='alternate' className='timelines'
                      items={items}
            />
            <div className="img-box">
                {data.map((items,index)=>{
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
export default withRouter(Data)
