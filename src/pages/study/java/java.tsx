import {Timeline} from "antd";
import React, {useEffect, useState} from "react";
import baseService from "../../../axios/config";
import './java.less'

const {withRouter} = require('react-router-dom')
function Java(){
    const [java,setJava] = useState([
        {
            stage: "6",
            description: "大数据",
            photo: "6"
        }
    ]);
   const items = java.map(item=>{
       return {
           label:item.stage,
           color:'#f8a673',
           children:item.description
       }
   })
    const getJava = ()=>{
        baseService.get('/direction/byName',{params:{directionName:"后端"}}).then(res=>{
                console.log(res)
            if(res.status!==200) return false
            setJava(res.data.data)
            }
        )
    }
    useEffect(()=>{
        getJava()
    },[])
    return(
        <div className='java-box'>
            <Timeline mode='alternate' className='timelines'
                      items={items}
            />
            <div className="img-box">
                    {java.map((items,index)=>{
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
export default withRouter(Java)
