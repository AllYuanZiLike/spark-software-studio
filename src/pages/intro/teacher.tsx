import React from 'react';
import './teacher.less'

function Teacher(props:any){
    const teacher = props
    const isShow = teacher.props.study===''?false:true;
    if(isShow) {
        return(
            <div className="card-box">
                <div className="card-top">{teacher.props.name}</div>
                <div className="card-intro">
                    <div className="first">
                        <div className="left">个人简介</div>
                        <div className="right">{teacher.props.intro}</div>
                    </div>
                    <div className="first" >
                        <div className="left">学习经历</div>
                        <div className="right">{teacher.props.study}</div>
                    </div>
                    <div className="first">
                        <div className="left">学术成果</div>
                        <div className="right">{teacher.props.success}</div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="card-box">
                <div className="card-top">{teacher.props.name}</div>
                <div className="card-intro">
                    <div className="first">
                        <div className="left">个人简介</div>
                        <div className="right">{teacher.props.intro}</div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Teacher
