import React from 'react';
import { Tabs } from 'antd';
import Teacher from "./teacher";

function Teachers() {
    const { TabPane } = Tabs;
    const tabs  = [
        {
            key: '1',
            label: '指导老师 1',
            children: <Teacher props={{name:'侯老师',intro:'男，硕士，副教授，数据科学与大数据教研室主任。研究方向: 数据库技术、工作流管理技术、软件工程、嵌入式。承担课程: 操作系统、数据结构、专业英语',
                study:'1997年9月-2001年7月在河南科技学院机电技术教育专业学习;获工学学士学位; 2004年9月-2007年7月在武汉理工大学计算机应用专业学习，获工学硕士学位；西安电子科技大学博士学位。',
                success:'发表学术论文数十余篇，其中EI检索8篇、核心论文3篇;出版学术著作2部;获得软件著作权登记1项。'}}/>,
        },
        {
            key: '2',
            label: '指导老师 2',
            children: <Teacher props={{name:'焦老师',intro:'西安电子科技大学博士',
                study:'',
                success:''}}/>,
        },
        {
            key: '3',
            label: '指导老师 3',
            children: <Teacher props={{name:'冀老师',intro:'星火软件工作室第一届，北京工业大学博士',
                study:'',
                success:''}}/>,
        },
    ];
    return(
        <Tabs centered defaultActiveKey="0">
            {tabs.map((tab, index) => (
                <TabPane key={index} tab={tab.label}>
                    {tab.children}
                </TabPane>
            ))}
        </Tabs>
    )
}

export default Teachers
