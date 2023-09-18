import './intro.less'
import Teachers from "./collapse";
import {useCallback, useEffect, useState} from "react";

import baseService from '../../axios/config'
const {withRouter} = require('react-router-dom')

function Intro(){
    const [introText,setIntroText] = useState('')
    const [introPhoto,setIntroPhoto] = useState(require('../../assets/intro/logo.png'))
    const [charge,setCharge] = useState([
        {
            id:'1',
            photo:require('../../assets/intro/charge/zcs.png'),
            name:'总负责人：张宸菘'},
        {
            id:'2',
            photo:require('../../assets/intro/charge/dmj.png'),
            name:'总负责人：张宸菘'
        },
        {
            id:'3',
            photo:require('../../assets/intro/charge/zcs.png'),
            name:'总负责人：张宸菘'
        },
    ])
    const getIntroText = ()=>{
        baseService.get('/introduction/getIntro').then(res=>{
            console.log(res)
            if(res.status!==200) return false
            setIntroText(res.data.data.content)
            setIntroPhoto(res.data.data.photo)
        })
    }
    const getCharge = ()=>{
        baseService.get('/leader/getLeader').then(res=>{
            console.log(res)
            if(res.status!==200) return false
            setCharge(res.data.data)
        })
    }
    useEffect(()=>{
        getIntroText()
        getCharge()
    },[])
    return(
        <div className="main">
            <div className="top">
                <div className="bg">
                    <img src={require('../../assets/intro/intro-bg.png')} alt=""/>
                </div>
                <div className="word-box">
                    <div className="top-box">
                        <div className="left">简介</div>
                        <div className="right">
                            <img src={introPhoto} alt=""/>
                            SPARK
                        </div>
                    </div>
                    <div className="word">{introText}</div>
                </div>
            </div>
            <Teachers></Teachers>
            <div className="charge">
                {charge.map((item,index) => (
                    <div className="person" key={index}>
                        <div className="img">
                            <img src={item.photo} alt=""/>
                        </div>
                        <div className="name">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withRouter(Intro)
