import React, {useCallback, useEffect, useState} from "react";
import './members.less'
import baseService from '../../axios/config'

const {withRouter} = require('react-router-dom')

function Members(){
    const initMem = [
        {
            key:1,
            username:'Mario',
            realName:'',
            blog:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            photo:require('../../assets/members/avatar/mario.png'),
            classes:'计科211',
            direction:'大前端',
            phone:'12345678999'
        },
        {
            key:2,
            username:'段梦洁',
            realName:'',
            blog:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            photo:require('../../assets/members/avatar/mario.png'),
            classes:'计科211',
            direction:'大前端',
            phone:'12345678999'
        },
        {
            key:3,
            username:'Mario',
            realName:'',
            blog:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            photo:require('../../assets/members/avatar/mario.png'),
            classes:'计科211',
            direction:'大前端',
            phone:'12345678999'
        },
        {
            key:4,
            username:'Mario',
            realName:'',
            blog:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            photo:require('../../assets/members/avatar/mario.png'),
            classes:'计科211',
            direction:'大前端',
            phone:'12345678999'
        },
        {
            key:5,
            username:'Mario',
            realName:'',
            blog:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            photo:require('../../assets/members/avatar/mario.png'),
            classes:'计科211',
            direction:'大前端',
            phone:'12345678999'
        },
        {
            key:6,
            username:'Mario',
            realName:'',
            blog:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            photo:require('../../assets/members/avatar/mario.png'),
            classes:'计科211',
            direction:'大前端',
            phone:'12345678999'
        },]
    const [members,setMembers] = useState(initMem)
    const memData = {
        currentPage:1,
        pageSize:30,
        entity:{
            username:'',
            realName:'',
            grade:'',
            directionId:'',
            isMapper:1
        }
    }
    const getMembers = ()=>{
        baseService.get("/user/getUsers", {params: {data: JSON.stringify(memData)}}).then(res=>{
            console.log(res)
            if(res.status!==200) return false
            setMembers(res.data.data.records)
            console.log(members)
        })
    }
    useEffect(()=>{
        getMembers()
    },[])
    return(
        <div className='main-box'>
            <div className="content">
                {members.map((item,index)=>(
                    <div className="card" tabIndex={index} key={index}>
                        <div className="show-wrapper">
                            <div className="pic-wrapper">
                                <img src={item.photo}  alt="" />
                            </div>
                            <h2 className="title">{item.realName}</h2>
                            <div className="intro">
                                <span>{item.classes}</span>
                                <span>{item.direction}</span>
                                <span>{item.phone}</span>
                            </div>
                        </div>
                        <div className="hover-wrapper">
                            <button className="btn"><a href={item.blog} target="_blank">See More</a></button>
                        </div>
                        <div className="background" style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.7) 20%, rgb(255, 255, 255) 60%, rgb(255, 255, 255) 100%),url(${item.photo})`}}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withRouter(Members)
