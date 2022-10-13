import { Button, Card, Col, Empty, PaginationProps, Row, Spin, Table, Tag } from "antd";
import { PlusOutlined, RollbackOutlined, SendOutlined } from "@ant-design/icons";
import { initPaginationConfig, tacitPagingProps } from "../../shared/ajax/request"
import { useEffect, useState } from "react";

import ConfigOperation from "./operation";
import ConfigRelease from "./configRelease";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ConfigPage = (props: any) => {
    const history = useHistory();
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const _environmentService: IEnvironmentService = useHookProvider(IocTypes.EnvironmentService);
    const [loading, setLoading] = useState<boolean>(false);
    const [appId, setAppId] = useState<string>();
    const [environmentList, setEnvironmentList] = useState<Array<any>>([]);
    const [currentEnvironmentId, setCurrentEnvironmentId] = useState<string>("");
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [configOperationElement, setconfigOperationElement] = useState<any>(null);
    const [configRelease, setConfigRelease] = useState<any>(null);

    const columns = [
        {
            title: "唯一标识",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Value内容",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "分组",
            dataIndex: "group",
            key: "group",
            // : 100
        },
        {
            title: "是否公开",
            dataIndex: "isOpen",
            key: "id",
            render: (text: any, record: any) => {
                return <div>
                    {record.isOpen ? <Tag color="cyan">是</Tag> : <Tag color="orange">否</Tag>}
                </div>
            }
        },
        {
            title: "是否发布",
            dataIndex: "isPublish",
            key: "id",
            render: (text: any, record: any) => {
                return <div>
                    {record.isPublish ? <Tag color="cyan">是</Tag> : <Tag color="orange">否</Tag>}
                </div>
            }
        }


    ]
    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total: paginationConfig.total,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
        showTotal: ((total) => {
            return `共 ${total} 条`;
        }),
        onShowSizeChange: (current: number, pageSize: number) => {
            setPaginationConfig((Pagination) => {
                Pagination.pageSize = pageSize;
                Pagination.current = current;
                return Pagination;
            });

        },
        onChange: (page: number, pageSize?: number) => {
            setPaginationConfig((Pagination) => {
                Pagination.current = page;
                if (pageSize) {
                    Pagination.pageSize = pageSize;
                }
                return Pagination;
            });
        }
    };

    /**
     * 页面初始化事件
     */
    useEffect(() => {
        getEnvironmentList()
    }, [paginationConfig, currentEnvironmentId]);

    /**
     * 获取环境列表信息
     */
    const getEnvironmentList = () => {
        if (props.location.state.appId) {
            setAppId(props.location.state.appId)
            setLoading(true);
            props.location.state.appId && console.log(props.location.state.appId)
            props.location.state.appId && _environmentService.getEnvironmentList(props.location.state.appId).then((x) => {
                if (x.success) {
                    setEnvironmentList(x.result);
                    setLoading(false);
                }
            })
        }
    }

    /**
     * 获取环境列表信息
     */
    const getConfigList = (_environmentId: any) => {
        let _param = {
            pageSize: paginationConfig.pageSize,
            pageIndex: paginationConfig.current,
        }
        setCurrentEnvironmentId(_environmentId)
        _environmentService.getConfigListForEnvironmentId(_environmentId, _param).then(rep => {
            if (rep.success) {
                console.log(rep)
                setPaginationConfig((Pagination) => {
                    Pagination.total = rep.result.total;
                    return Pagination;
                });
                setTableData(rep.result.data);
            }
        })
    }

    /**
     * 清除弹框
     */
    const claerConfigOperation = () => {
        setconfigOperationElement(null);
        getConfigList(currentEnvironmentId);
    }


    /**
     * 添加配置弹框
     */
    const addChangeConfig = () => {
        setconfigOperationElement(<ConfigOperation onCallbackEvent={claerConfigOperation} operationType={OperationTypeEnum.add} envId={currentEnvironmentId}></ConfigOperation>)
    }


    const publishConfig = () => {
        setConfigRelease(<ConfigRelease onCallbackEvent={claerConfigRelease} operationType={OperationTypeEnum.view} envId={currentEnvironmentId}></ConfigRelease>)
    }

    /**
     * 跳转到配置中心
     * @param _appId 
     */
    const backToApplicationList = () => {
        history.push({
            pathname: "/application/list"
        });
    }
    const claerConfigRelease = () => {
        setConfigRelease(null);
    }

    return (
        <div>
            <Spin spinning={loading}>
                <Row>
                    <Col span="24">
                        <Card title="应用运行环境">
                            {
                                environmentList.map((item: any) => {
                                    return (<Button style={{ margin: '8px 8px' }} onClick={() => getConfigList(item.id)} shape="round" type={item.id == currentEnvironmentId ? "primary" : "dashed"}>{item.environmentName}</Button>)
                                })
                            }
                        </Card>
                    </Col>

                </Row>
                {
                    currentEnvironmentId ? <><Row>
                        <Col span="24" style={{ textAlign: 'right' }}>
                            <Button type="primary" shape="round" style={{ margin: '8px 8px' }} onClick={() => { addChangeConfig() }}><PlusOutlined />添加</Button>
                            <Button type="primary" shape="round" style={{ margin: '8px 8px ' }} onClick={() => { publishConfig() }}><SendOutlined rotate={-40}/>发布</Button>
                            <Button type="primary" shape="round" style={{ margin: '8px 8px ' }} onClick={() => { backToApplicationList() }}><RollbackOutlined />返回应用列表</Button>
                        </Col>
                    </Row>
                        <Row>
                            <Col span={24}>
                                {
                                    <Table columns={columns} dataSource={tableData} pagination={pagination}  scroll={{ y: 600 }} />
                                }
                            </Col>
                        </Row>
                    </> : <Empty style={{ margin: '20px 8px' }}
                        description={
                            <span>
                                未选择环境
                            </span>
                        }>
                    </Empty>
                }
                {configOperationElement}
                {configRelease}
            </Spin>
        </div>)
}
export default ConfigPage;