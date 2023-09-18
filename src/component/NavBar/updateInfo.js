import {Button, Card, Drawer, Form, Input, Select, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useState} from "react";

function UpdateInfo(infoVisible){
    const [infoOpen,setInfoOpen] = useState(infoVisible)
    const collegeData = ['计算机科学与技术学院','软件学院','信息工程学院'];
    const professData = {
        计算机科学与技术学院:['计算机科学与技术','数据科学与大数据技术','物联网工程'],
        软件学院:['数据科学与大数据技术'],
        信息工程学院:['信息工程','通信工程','教育技术学']
    }
    const [college,setCollege] = useState(professData[collegeData[0]]);
    const [profession,setProfess] = useState(professData[collegeData[0]][0]);
    const handleCollegeChange = (value) => {
        setCollege(professData[value]);
        setProfess(professData[value][0]);
    };
    const onProfessChange = (value) => {
        setProfess(value);
        // baseService.put()
    };
    const [infoData,setInfoData] = useState({
        directionId: 1975,
        directionName:'大前端',
        delFlag: 46,
        realName: "便国斯花么程",
        id: 1983,
        isMapper: 67,
        classes: "Ut eiusmod deserunt",
        blog: "amet",
        email: "v.ftqsvshr@qq.com",
        direction: "non enim sit officia ipsum",
        password: "nisi",
        isAdmin: 50,
        college: "sit mollit nisi ex",
        directionPhoto: "http://dummyimage.com/400x400",
        grade: "ut incididunt",
        photo: "http://dummyimage.com/400x400",
        username: "蔡秀英",
        profession: "aliqua cillum anim",
        phone: "18125426426"
    })
    // setInfoData(Form.useForm)
    const updateInfo = (values) => {
        setInfoData(values)
    }
    return(
        <Drawer title="修改资料" placement="right" className="infoDrawer" onClose={setInfoOpen(false)} open={infoOpen}>
            <Card title="个人资料" style={{ width: '90%' }}>
                <Form name="normal_updateInfo" form={infoData} className="updateInfo-form" onFinish={updateInfo}>
                    <Form.Item name="username" label="用户名"
                               rules={[{ required: true, message: '请输入你的用户名!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="photo" label="头像">
                        <Upload action="/user/photos" listType="picture-card">
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>上传头像</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="email" label="邮箱"
                               rules={[
                                   {type: 'email', message: '所填写的不是邮箱!',},
                                   {required: true, message: '请填写你的邮箱!',},
                               ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="grade" label="年级"
                               rules={[
                                   {required: true, message: '请填写你的年级!',},
                               ]}
                    >
                        <Select
                            style={{ width: '17.3vw' }}
                            options={[
                                { value: '2021级', label: '2021级' },
                                { value: '2022级', label: '2022级' },
                                { value: '2023级', label: '2023级' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="college" label="学院"
                               rules={[
                                   {required: true, message: '请填写你的学院!',},
                               ]}
                    >
                        <Select
                            style={{ width: '17.3vw' }}
                            onChange={handleCollegeChange}
                            options={collegeData.map((college) => ({ label: college, value: college }))}
                        />
                    </Form.Item>
                    <Form.Item name="profession" label="专业"
                               rules={[
                                   {required: true, message: '请填写你的专业!',},
                               ]}
                    >
                        <Select
                            style={{ width: '17.3vw' }}
                            onChange={onProfessChange}
                            options={college.map((profess) => ({ label: profess, value: profess }))}
                        />
                    </Form.Item>
                    <Form.Item name="classes" label="班级"
                               rules={[
                                   {required: true, message: '请填写你的班级!',},
                               ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="realName" label="姓名"
                               rules={[
                                   {required: true, message: '请填写你的姓名!',},
                               ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="电话"
                               rules={[
                                   {required: true, message: '请填写你的手机号!',},
                               ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="updateInfo-form-button" onClick={updateInfo}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Drawer>

    )
}
export default UpdateInfo
