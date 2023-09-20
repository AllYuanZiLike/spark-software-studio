import './footer.less'
import {useEffect, useState} from "react";
import baseService from '../../axios/config'

function Footer(){
    const [imgs,setImgs] = useState({
        schoolBadgeImg:require('../../assets/footer/hist-logo.png'),
        schoolNameImg:require('../../assets/footer/hist-logoText.png'),
        groupNameImg:require('../../assets/footer/spark-logo-text.png'),
        logo:require('../../assets/footer/spark-logo-white.png'),
        address:'河南科技学院星火软件实验室',
        phone:'18125848247',
        name:'',
        icp:'',
        copyrighted:''
    })
    const getImgs = ()=>{
        baseService.get('/bottom/query').then(res=>{
            console.log(res)
            if(res.status!==200) return false
            setImgs(res.data.data)
        })
    }
    useEffect(()=>{
        getImgs()
    },[])
    return(
        <div className='footer-main'>
            <div className="left">
                <div className="top">
                    <div className="top-left">
                        <img src={imgs.schoolBadgeImg} alt=""/>
                    </div>
                    <div className="top-right">
                        <img src={imgs.schoolNameImg} alt=""/>
                    </div>
                </div>
                <div className="bottom">
                    <div className="bottom-left">
                        <img src={imgs.logo} alt=""/>
                    </div>
                    <div className="bottom-right">
                        <img src={imgs.groupNameImg} alt=""/>
                    </div>
                </div>
            </div>
            <div className="right">
                {/*工信部备案：豫ICP备{imgs.icp}号-1<br/>*/}
                {/*豫公网安备：{imgs.icp}号<br />*/}
                © 2023 {imgs.address}<br/>
                版权所有：{imgs.copyrighted}<br/>
                联系方式：{imgs.phone}
            </div>
        </div>
    )
}
export default Footer
