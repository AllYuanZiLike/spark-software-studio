import React from "react";
import './members.less'

const {withRouter} = require('react-router-dom')

function Members(){
    const members = [
        {
            key:1,name:'Mario',
            bloAdd:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            avatarUrl:require('../../assets/members/avatar/mario.png'),
            className:'计科211',
            direction:'大前端',
            tel:'12345678999'
        },
        {
            key:2,name:'段梦洁',
            bloAdd:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            avatarUrl:require('../../assets/members/avatar/dmj.png') ,
            className:'计科211',
            direction:'大前端',
            tel:'12345678999'
        },
        {
            key:3, name:'Mario',
            bloAdd:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            avatarUrl:require('../../assets/members/avatar/fsq.jpg'),
            className:'计科211',
            direction:'大前端',
            tel:'12345678999'
        },
        {key:4,name:'Mario',
            bloAdd:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            avatarUrl:require('../../assets/members/avatar/mario.png'),
            className:'计科211',
            direction:'大前端',
            tel:'12345678999'
        },
        {key:5,name:'Mario',
            bloAdd:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            avatarUrl:require('../../assets/members/avatar/mario.png'),
            className:'计科211',
            direction:'大前端',
            tel:'12345678999'
        },
        {key:6,name:'Mario',
            bloAdd:'https://blog.csdn.net/qq_63479468?spm=1010.2135.3001.5421',
            avatarUrl:require('../../assets/members/avatar/mario.png'),
            className:'计科211',
            direction:'大前端',
            tel:'12345678999'
        },
    ]
    return(
        <div className='main-box'>
            <div className="content">
                {members.map((item,index)=>(
                    <div className="card" tabIndex={index} key={index}>
                        <div className="show-wrapper">
                            <div className="pic-wrapper">
                                <img src={item.avatarUrl}  alt="" />
                            </div>
                            <h2 className="title">{item.name}</h2>
                            <div className="intro">
                                <span>{item.className}</span>
                                <span>{item.direction}</span>
                                <span>{item.tel}</span>
                            </div>
                        </div>
                        <div className="hover-wrapper">
                            <button className="btn"><a href={item.bloAdd} target="_blank">See More</a></button>
                        </div>
                        <div className="background" style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.7) 20%, rgb(255, 255, 255) 60%, rgb(255, 255, 255) 100%),url(${item.avatarUrl})`}}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withRouter(Members)
