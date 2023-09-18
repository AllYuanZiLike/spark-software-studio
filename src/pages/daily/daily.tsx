import './daily.less'
import {useEffect, useState} from "react";
import baseService from '../../axios/config'
const {withRouter} = require('react-router-dom')

function Daily(){
    const [img1,setImg1] = useState(require('../../assets/daily/study/t1.png'))
    const [img2,setImg2] = useState(require('../../assets/daily/study/t2.png'))
    const [img3,setImg3] = useState(require('../../assets/daily/study/t3.png'))
    const [img4,setImg4] = useState(require('../../assets/daily/study/t4.png'))
    const [img5,setImg5] = useState(require('../../assets/daily/study/t5.png'))
    const getImg = ()=>{
        baseService.get('/activity/selectActivity/0').then(res=>{
            if(res.status!==200) return false
            setImg1(res.data.data[0].photo)
        })
        baseService.get('/activity/selectActivity/1').then(res=>{
            if(res.status!==200) return false
            setImg2(res.data.data[0].photo)
        })
        baseService.get('/activity/selectActivity/2').then(res=>{
            if(res.status!==200) return false
            setImg3(res.data.data[0].photo)
        })
        baseService.get('/activity/selectActivity/3').then(res=>{
            if(res.status!==200) return false
            setImg4(res.data.data[0].photo)
        })
        baseService.get('/activity/selectActivity/4').then(res=>{
            if(res.status!==200) return false
            setImg5(res.data.data[0].photo)
        })
    }
    useEffect(()=>{
        getImg()
    },[])
    return(
        <div className="box">
            <div className='pic1' tabIndex={1} style={{backgroundImage:`url(${img1})`}}>
                <h1>学习时</h1>
            </div>
            <div className='pic2' tabIndex={2} style={{backgroundImage:`url(${img2})`}}>
                <h1>开会时</h1>
            </div>
            <div className='pic3' tabIndex={3} style={{backgroundImage:`url(${img3})`}}>
                <h1>运动时</h1>
            </div>
            <div className='pic4' tabIndex={4} style={{backgroundImage:`url(${img4})`}}>
                <h1>团建时</h1>
            </div>
            <div className='pic5' tabIndex={5} style={{backgroundImage:`url(${img5})`}}>
                <h1>娱乐时</h1>
            </div>
        </div>
    )
}

export default withRouter(Daily)
