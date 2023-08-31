import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import {Button, Card, Form, Input, Modal, Popconfirm, Table} from 'antd';
import type { FormInstance } from 'antd/es/form';
import './in-m.less'

const {withRouter} = require('react-router-dom')
function IntroManage() {
    const [introText,setIntroText] = useState('暂未设置')
    const EditableContext = React.createContext<FormInstance<any> | null>(null);
    const {TextArea} = Input
    const [newIntro,setNewIntro]=useState('')
    interface chargeItem {
        key: string;
        name: string;
        role: string;
    }

    interface chargeEditableRowProps {
        index: number;
    }

    const ChargeEditableRow: React.FC<chargeEditableRowProps> = ({index, ...props}) => {
        const [formCharge] = Form.useForm();
        return (
            <Form form={formCharge} component={false}>
                <EditableContext.Provider value={formCharge}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    interface chargeEditableCellProps {
        title: React.ReactNode;
        editableCharge: boolean;
        children: React.ReactNode;
        dataIndex: keyof chargeItem;
        record: chargeItem;
        handleChargeSave: (record: chargeItem) => void;
    }

    const ChargeEditableCell: React.FC<chargeEditableCellProps> = ({
                                                           title,
                                                           editableCharge,
                                                           children,
                                                           dataIndex,
                                                           record,
                                                           handleChargeSave,
                                                           ...restProps
                                                       }) => {
        const [editingCharge, setEditingCharge] = useState(false);
        const inputChargeRef = useRef<InputRef>(null);
        const formCharge = useContext(EditableContext)!;

        useEffect(() => {
            if (editingCharge) {
                inputChargeRef.current!.focus();
            }
        }, [editingCharge]);

        const toggleChargeEdit = () => {
            setEditingCharge(!editingCharge);
            formCharge.setFieldsValue({[dataIndex]: record[dataIndex]});
        };

        const saveCharge = async () => {
            try {
                const values = await formCharge.validateFields();

                toggleChargeEdit();
                handleChargeSave({...record, ...values});
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNodeCharge = children;

        if (editableCharge) {
            childNodeCharge = editingCharge ? (
                <Form.Item
                    style={{margin: 0}}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputChargeRef} placeholder='点击进行填写' onPressEnter={saveCharge} onBlur={saveCharge}/>
                </Form.Item>
            ) : (
                <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleChargeEdit}>
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNodeCharge}</td>;
    };

    type chargeEditableTableProps = Parameters<typeof Table>[0];

    interface chargeDataType {
        key: React.Key;
        name: string;
        role: string;
    }

    type ColumnTypes = Exclude<chargeEditableTableProps['columns'], undefined>;

        const [dataSourceCharge, setdataSourceCharge] = useState<chargeDataType[]>([
            {
                key: '0',
                name: '张宸菘',
                role: '总负责人',
            },
            {
                key: '1',
                name: '张宸菘',
                role: '总负责人',
            },
            {
                key: '2',
                name: '张宸菘',
                role: '总负责人',
            }
        ]);

        const [countCharge, setCountCharge] = useState(3);

        const handleChargeDelete = (key: React.Key) => {
            const newData = dataSourceCharge.filter((item) => item.key !== key);
            setdataSourceCharge(newData);
        };

        const defaultChargeColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
            {
                title: '名字',
                dataIndex: 'name',
                width: '30%',
                editable: true,
            },
            {
                title: '身份',
                dataIndex: 'role',
                editable: true
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) =>
                    dataSourceCharge.length > 1 ?
                        <Popconfirm title="确定删除?" okText='确定' cancelText='取消' onConfirm={() => handleChargeDelete(record.key)}>
                            <a>删除</a>
                        </Popconfirm> : null

            },
        ];

        const handleChargeAdd = () => {
            const newData: chargeDataType = {
                key: countCharge,
                name: ``,
                role: '',
            };
            setdataSourceCharge([...dataSourceCharge, newData]);
            setCountCharge(countCharge + 1);
        };

        const handleChargeSave = (row: chargeDataType) => {
            const newData = [...dataSourceCharge];
            const index = newData.findIndex((item) => row.key === item.key);
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
            setdataSourceCharge(newData);
        };

        const chargeComponents = {
            body: {
                row: ChargeEditableRow,
                cell: ChargeEditableCell,
            },
        };

        const chargeColumns = defaultChargeColumns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record: chargeDataType) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleChargeSave,
                }),
            };
        });


    interface TeacherItem {
        key: string;
        name: string;
        intro: string;
        study:string;
        success:string;
    }

    interface TeacherEditableRowProps {
        index: number;
    }

    const TeacherEditableRow: React.FC<TeacherEditableRowProps> = ({index, ...props}) => {
        const [formTeacher] = Form.useForm();
        return (
            <Form form={formTeacher} component={false}>
                <EditableContext.Provider value={formTeacher}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    interface TeacherEditableCellProps {
        title: React.ReactNode;
        editableTeacher: boolean;
        children: React.ReactNode;
        dataIndex: keyof TeacherItem;
        record: TeacherItem;
        handleTeacherSave: (record: TeacherItem) => void;
    }

    const TeacherEditableCell: React.FC<TeacherEditableCellProps> = ({
                                                                       title,
                                                                       editableTeacher,
                                                                       children,
                                                                       dataIndex,
                                                                       record,
                                                                       handleTeacherSave,
                                                                       ...restProps
                                                                   }) => {
        const [editingTeacher, setEditingTeacher] = useState(false);
        const inputTeacherRef = useRef<InputRef>(null);
        const formTeacher = useContext(EditableContext)!;

        useEffect(() => {
            if (editingTeacher) {
                inputTeacherRef.current!.focus();
            }
        }, [editingTeacher]);

        const toggleTeacherEdit = () => {
            setEditingTeacher(!editingTeacher);
            formTeacher.setFieldsValue({[dataIndex]: record[dataIndex]});
        };

        const saveTeacher = async () => {
            try {
                const values = await formTeacher.validateFields();

                toggleTeacherEdit();
                handleTeacherSave({...record, ...values});
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNodeTeacher = children;

        if (editableTeacher) {
            childNodeTeacher = editingTeacher ? (
                <Form.Item
                    style={{margin: 0}}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputTeacherRef} placeholder='点击进行填写' onPressEnter={saveTeacher} onBlur={saveTeacher}/>
                </Form.Item>
            ) : (
                <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleTeacherEdit}>
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNodeTeacher}</td>;
    };

    type teacherEditableTableProps = Parameters<typeof Table>[0];
    interface teacherDataType {
        key: React.Key;
        name: string;
        intro: string;
        study:string;
        success:string;
    }

    type teacherColumnTypes = Exclude<teacherEditableTableProps['columns'], undefined>;

    const [dataSourceTeacher, setdataSourceTeacher] = useState<teacherDataType[]>([
        {
            key: '0',
            name: '张宸菘',
            intro: '个人介绍',
            study:'学习经历',
            success:'学术成果',
        },
        {
            key: '1',
            name: '张宸菘',
            intro: '个人介绍',
            study:'学习经历',
            success:'学术成果',
        },
        {
            key: '2',
            name: '张宸菘',
            intro: '个人介绍',
            study:'学习经历',
            success:'学术成果',
        }
    ]);

    const [countTeacher, setcountTeacher] = useState(3);

    const handleTeacherDelete = (key: React.Key) => {
        const newData = dataSourceTeacher.filter((item) => item.key !== key);
        setdataSourceTeacher(newData);
    };

    const defaultTeacherColumns: (teacherColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: '名字',
            dataIndex: 'name',
            width: '15%',
            editable: true,
        },
        {
            title: '个人简介',
            dataIndex: 'intro',
            editable: true
        },
        {
            title: '学习经历',
            dataIndex: 'study',
            editable: true
        },
        {
            title: '学术成果',
            dataIndex: 'success',
            editable: true
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) =>
                dataSourceTeacher.length > 1 ?
                    <Popconfirm title="确定删除?" okText='确定' cancelText='取消' onConfirm={() => handleTeacherDelete(record.key)}>
                        <a>删除</a>
                    </Popconfirm> : null

        },
    ];

    const handleTeacherAdd = () => {
        const newData: teacherDataType = {
            key: countTeacher,
            name: ``,
            intro: '',
            study:'',
            success:'',
        };
        setdataSourceTeacher([...dataSourceTeacher, newData]);
        setcountTeacher(countTeacher + 1);
    };

    const handleTeacherSave = (row: teacherDataType) => {
        const newData = [...dataSourceTeacher];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setdataSourceTeacher(newData);
    };

    const TeacherComponents = {
        body: {
            row: TeacherEditableRow,
            cell: TeacherEditableCell,
        },
    };

    const TeacherColumns = defaultTeacherColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: teacherDataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleTeacherSave,
            }),
        };
    });
        const getNewIntro = (e:any) =>{
            setNewIntro(e.target.value)
        }
        const introTextBtn = ()=>{
            setIntroText(newIntro)
            setIntroOpen(false)
        }
        const [introOpen, setIntroOpen] = useState(false);
        const showIntroModal = () => {
            setIntroOpen(true);
        };
        return (
            <div className='in-m-box'>
                <div className="in-m-box-top">
                    <div className="intro-text">
                        <Card style={{ width: '95%', display:"flex",flexDirection:"column",justifyContent:"center"}} bodyStyle={{display:"flex",flexDirection:"column",justifyContent:"center"}} title='简介内容'>
                            <div className="text">{introText}</div>
                            <Button type='primary' onClick={showIntroModal}>点击修改</Button>
                        </Card>
                        <Modal title="修改简介内容" cancelText='取消' okText='提交' open={introOpen} onOk={introTextBtn} onCancel={()=>setIntroOpen(false)}>
                            <TextArea rows={4} value={newIntro} onChange={getNewIntro}/>
                        </Modal>
                    </div>
                </div>
                <div className="in-m-box-bottom">
                    <div className="teachers">
                        <Button onClick={handleTeacherAdd} type="primary" style={{marginBottom: 16}}>
                            添加指导老师信息
                        </Button>
                        <Table
                            components={TeacherComponents}
                            rowClassName={() => 'editable-row'}
                            bordered
                            dataSource={dataSourceTeacher}
                            columns={TeacherColumns as teacherColumnTypes}
                        />
                    </div>
                    <div className="charge">
                        <Button onClick={handleChargeAdd} type="primary" style={{marginBottom: 16}}>
                            添加负责人信息
                        </Button>
                        <Table
                            components={chargeComponents}
                            rowClassName={() => 'editable-row'}
                            bordered
                            dataSource={dataSourceCharge}
                            columns={chargeColumns as teacherColumnTypes}
                        />
                    </div>
                </div>
            </div>
        )
}
export default withRouter(IntroManage)
