import './intro.less'
import Teachers from "./collapse";
import {useCallback, useState} from "react";
import baseService from '../../axios/request'
const {withRouter} = require('react-router-dom')

function Intro(){
    const [introText,setIntroText] = useState('')
    const person = [
        {
            imgSrc:require('../../assets/intro/charge/zcs.png'),
            name:'总负责人：张宸菘'},
        {
            imgSrc:require('../../assets/intro/charge/dmj.png'),
            name:'总负责人：张宸菘'
        },
        {
            imgSrc:require('../../assets/intro/charge/zcs.png'),
            name:'总负责人：张宸菘'
        },
    ]
    const getIntroText = useCallback(()=>{
        baseService.get({url:'/introduction/getIntro'}).then(res=>{
            console.log(res)
        })
    },[])
    getIntroText()
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
                            <img src={require('../../assets/intro/logo.png')} alt=""/>
                            SPARK
                        </div>
                    </div>
                    <div className="word">
                        星火软件工作室始于2007年，工作室以创新为导向、以实践为手段、以真实项目为抓手、以培养学生成才为目的，在真实的项目实践中培养学生的创新实践能力。目前，已与多家企业建立了良好的合作关系。星火软件工作室成立十多年来，一直深受学校、学院领导老师的深切关怀和指导，形成了以校外实践导师、校内指导老师和小组学长学姐帮带为核心的计算机学科群实践培养模式。多年来培养了多位行业人才。
                    </div>
                </div>
            </div>
            <Teachers></Teachers>
            <div className="charge">
                {person.map((item,index) => (
                    <div className="person" key={index}>
                        <div className="img">
                            <img src={item.imgSrc} alt=""/>
                        </div>
                        <div className="name">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withRouter(Intro)
