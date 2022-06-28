import { Button, Card, Col, Descriptions, Form, Input, Layout, List, Modal, PaginationProps, Row, Spin, Table, Tag, message } from "antd";
import { DeleteTwoTone, FileAddTwoTone, LeftOutlined } from '@ant-design/icons';
import { formItemLayout, tailLayout } from "@/constans/layout/optionlayout";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useState } from "react";

import ConfigOperation from "./configOperation";
import ConfigRelease from "./configRelease";
import { IApplication } from "@/domain/applications/application";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const EnvironmentPage = (props: any) => {
    const history = useHistory();

    const _environmentService: IEnvironmentService = useHookProvider(IocTypes.EnvironmentService);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [listData, setListData] = useState<Array<any>>([]);
    const [appId, setAppId] = useState<string>();
    const [applicationData, setApplicationData] = useState<IApplication>();

    const [loading, setloading] = useState<boolean>(false);
    const [globalLoading, setGlobalLoading] = useState<boolean>(false);
    

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rowId, setRowId] = useState(null);
    const [subOperationElement, setOperationElement] = useState<any>(null);
    const [configOperationElement, setconfigOperationElement] = useState<any>(null);
    const [configRelease, setConfigRelease] = useState<any>(null);

    const [currentEnvironment, setCurrentEnvironment] = useState<any>(null);

    const { Header, Footer, Sider, Content } = Layout;
    /**
     * 配置项ID
     */
    const [configid, setconfigid] = useState<any>(null);
    const [deltype, setDelType] = useState<any>(null);

    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total: paginationConfig.total,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
        onShowSizeChange: (current: number, pageSize: number) => {
            debugger
            setPaginationConfig((Pagination) => {
                Pagination.current = current;
                Pagination.pageSize = pageSize;
                return Pagination;
            });
            getConfigTable(currentEnvironment);
        },
        onChange: (page: number, pageSize?: number) => {
            debugger
            setPaginationConfig((Pagination) => {
                Pagination.current = page;
                if (pageSize) {
                    Pagination.pageSize = pageSize;
                }
                return Pagination;
            });
            getConfigTable(currentEnvironment);
        }
    };
    
    const columns = [
        {
            title: "配置项key",
            dataIndex: "key",
            key: "key",
            // : 100
        }, {
            title: "配置项Value",
            dataIndex: "value",
            key: "value",
        }, {
            title: "配置项类型",
            dataIndex: "type",
            key: "type",
        }, {
            title: "组",
            dataIndex: "group",
            key: "group",
        },{
            title: "是否公开",
            dataIndex: "isOpen",
            key: "id",
            render: (text: any, record: any) => {
                return <div>
                    {record.isOpen?<Tag color="cyan">是</Tag>:<Tag color="orange">否</Tag>}
                </div>
            }
        }, {
            title: "是否发布",
            dataIndex: "isPublish",
            key: "id",
            render: (text: any, record: any) => {
                return <div>
                    {record.isPublish?<Tag color="cyan">是</Tag>:<Tag color="orange">否</Tag>}
                </div>
            }
        }, {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: any) => {
                return <div className="table-operation">
                        {/*  */}
                        <Button type="primary" onClick={() => editRow(record.id)}>编辑</Button>
                        <Button type="primary" danger onClick={() => deleteClick(record.id, "config")}>删除</Button>
                        {/* onClick={() => deleteClick(record.id)} */}
                        {/*  */}
                </div>
            }
        }
    ]

    useEffect(() => {
        getEnvironmentList();
    }, [paginationConfig])

    /**
     * 获取列表信息
     */
    const getEnvironmentList = () => {
        if (props.location.state.appId) {
            setAppId(props.location.state.appId)
            setGlobalLoading(true);
            _environmentService.getEnvironmentList(props.location.state.appId).then((x) => {
                if (x.success) {
                    if (x.result.environmentLists.length > 0) {
                        getConfigTable(x.result.environmentLists[0]);
                    }
                    setListData(x.result.environmentLists);
                    setApplicationData(x.result.application)
                    setGlobalLoading(false);
                }
            })
        }
    }

    /**
 * 根据环境获取配置
 * @param _id 
 */
    const getConfigTable = (_currentEnvironment: any) => {
        setloading(true);
        setCurrentEnvironment(_currentEnvironment);
        _currentEnvironment.id && _environmentService.getConfigListForEnvironmentId(_currentEnvironment.id, {pageSize: paginationConfig.pageSize,pageCount:paginationConfig.current}).then(x => {
            if (x.success) {
                
                setPaginationConfig((Pagination) => {
                    Pagination.total = x.result.total;
                    return Pagination;
                });
                setTableData(x.result.data);
                setloading(false);
            }
        })
    }

    /**
     * 删除某行
     * @param id 
     */
    const deleteRow = (id: any) => {
        _environmentService.deleteEnvironment(id).then(x => {
            if (x.success) {
                message.success('删除成功');
                getEnvironmentList();
            } else {
                message.error(x.errorMessage, 3);
            }
        })
    }

    const deleteClick = (_id: any, type: any) => {
        switch (deltype) {
            case "env":
                setRowId(_id);
                break;
            case "config":
                console.log(_id)
                setconfigid(_id);
                break;
        }
        setDelType(type)
        setIsModalVisible(true);

    }

    const handleOk = () => {
        setIsModalVisible(false);
        switch (deltype) {
            case "env":
                deleteRow(rowId);
                break;
            case "config":
                // currentEnvironment && delConfigClick(currentEnvironment.id,);
                break;
        }

    }

    const backApplicationPage=()=>{
        history.push({
            pathname: "application",
        });
        
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const addChange = () => {

        
        setOperationElement(<Operation appId={appId} onCallbackEvent={clearsubAllocationRoleElement} operationType={OperationTypeEnum.add} />)
    }

    const clearsubAllocationRoleElement = () => {
        setOperationElement(null);
        getEnvironmentList();
    }

    const addChangeConfig = () => {
        setconfigOperationElement(<ConfigOperation onCallbackEvent={claerConfigOperation} operationType={OperationTypeEnum.add} envId={currentEnvironment.id}></ConfigOperation>)
    }
    const claerConfigOperation = () => {
        setconfigOperationElement(null);
        getConfigTable(currentEnvironment);
    }

    const releaseConfig = () => {
        setConfigRelease(<ConfigRelease onCallbackEvent={claerConfigRelease} operationType={OperationTypeEnum.add} envId={currentEnvironment.id}></ConfigRelease>)
    }
    const claerConfigRelease = () => {
        setConfigRelease(null);
    }

    
    /**
     * 删除
     * @param id 
     */
    const delConfigClick = (_currentEnvironmentId:any,_configid:string) => {
        currentEnvironment && _environmentService.deleteAppConfiguration(_currentEnvironmentId, _configid).then(p => {
            if (p.success) {
                message.success('删除成功');
                getConfigTable(currentEnvironment);
            } else {
                message.error(p.errorMessage, 3);
            }
        })
    }

    const editRow = (_id: any) => {
        setOperationElement(<ConfigOperation onCallbackEvent={() => getConfigTable(currentEnvironment)} operationType={OperationTypeEnum.edit} id={_id} envId={currentEnvironment.id} />)
    }

    return (
        <>
        <Spin spinning={globalLoading}>
            <Layout>
                <Sider theme="light" className="" >
                    <Card size="small" title="应用环境列表" >
                        <Button type="primary" onClick={() => { addChange() }} block>添加环境</Button>
                        {
                            listData.map(x => {
                                return <div>
                                    <Button style={{ marginTop: '10px' }} block onClick={p => getConfigTable(x)}>{x.environmentName}</Button>
                                    {/* <Button type="primary" shape="circle">A</Button> */}
                                </div>
                            })
                        }
                    </Card>
                    <div style={{ marginTop: '10px' }}>
                        <Card size="small" title="应用信息" >
                            <p>唯一标识：{applicationData?.appId}</p>
                            <p>应用名称：{applicationData?.appId}</p>
                            <p>中文名称：{applicationData?.chinessName}</p>
                            <p>英文名称：{applicationData?.englishName}</p>
                            <p>负责人{applicationData?.linkMan}</p>
                            <p>状态：{applicationData?.status}</p>
                        </Card>
                    </div>
                </Sider>
                <Content>
                    <Card title={"选择环境："+currentEnvironment?.environmentName} >
                        <Form layout="inline" name="horizontal_login">
                            <Form.Item name="environmentName">
                                <Input placeholder="查找key" />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" >查询</Button>
                        </Form>
                    </Card>
                    <Row>
                        <Col span="24" style={{ textAlign: 'right' }}>
                            <Button onClick={() => { backApplicationPage() }} ><LeftOutlined/>返回应用列表</Button>
                            <Button type="primary" style={{ margin: '8px 8px' }} onClick={() => { addChangeConfig() }}>添加</Button>
                            <Button type="primary" style={{ margin: '8px 8px '}} onClick={() => { releaseConfig() }}>发布环境</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}><Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} /></Col>
                    </Row>
                </Content>
                <Modal title="提示" visible={isModalVisible} onOk={handleOk}
                    onCancel={handleCancel}
                    okText="确认"
                    cancelText="取消">
                    <p>是否确认删除?</p>
                </Modal>
                {subOperationElement}
                {configOperationElement}
                {configRelease}
            </Layout>
            </Spin>
        </>)
}

export default EnvironmentPage;