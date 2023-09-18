import React, {ReactElement, useEffect, useState} from 'react';
import { Tabs } from 'antd';
import Teacher from "./teacher";
import baseService from '../../axios/config'

function Teachers() {
    const { TabPane } = Tabs;
    const [teacher,setTeacher] = useState<Array<any>>([
        {
            name:'侯老师',
            intro:'男，硕士，副教授，数据科学与大数据教研室主任。研究方向: 数据库技术、工作流管理技术、软件工程、嵌入式。承担课程: 操作系统、数据结构、专业英语',
            study:'1997年9月-2001年7月在河南科技学院机电技术教育专业学习;获工学学士学位; 2004年9月-2007年7月在武汉理工大学计算机应用专业学习，获工学硕士学位；西安电子科技大学博士学位。',
            success:'发表学术论文数十余篇，其中EI检索8篇、核心论文3篇;出版学术著作2部;获得软件著作权登记1项。'
        },
        {
            name:'焦老师',
            intro:'西安电子科技大学博士',
            study:'',
            success:''
        },
        {
            name:'冀老师',
            intro:'星火软件工作室第一届，北京工业大学博士',
            study:'',
            success:''
        }
    ])
    const getTeacher = ()=>{
        baseService.get('/adviser/1/10').then(res=>{
            console.log(res)
            if(res.status!==200) return false
            setTeacher(res.data.data.records)
        })
    }
    useEffect(()=>{
        getTeacher()
    },[])
    return(
        <Tabs centered defaultActiveKey="0">
            {teacher.map((item, index) => (
                <TabPane key={index} tab={`指导老师${index+1}`}>
                    <Teacher props={item} />
                </TabPane>
            ))}
        </Tabs>
    )
}

export default Teachers
