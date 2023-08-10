import {
    Button,
    Col,
    Form,
    PaginationProps,
    Popconfirm,
    Row,
    Spin,
    Table,
    Tooltip,
    message
} from "antd";
import {
    CloudUploadOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    ReloadOutlined,
    WarningOutlined
} from "@ant-design/icons";
import {
    initPaginationConfig,
    tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import { IDeploymentConfigurationOutputDto } from "@/domain/deployment-configurations/deployment-configuration-dto";
import { IDeploymentConfigurationService } from "@/domain/deployment-configurations/ideployment-configuration-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 应用Id
     */
    appId: string;


}
const DeploymentConfigurationPage = (props: IProp) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData] = Form.useForm();
    const [tableData, setTableData] = useState<Array<IDeploymentConfigurationOutputDto>>();
    const [subOperationElement, setOperationElement] = useState<any>(null);
    const [paginationConfig, setPaginationConfig] =
        useState<initPaginationConfig>(new initPaginationConfig());
    const _deploymentConfigurationService: IDeploymentConfigurationService = useHookProvider(IocTypes.DeploymentConfigurationService);
    useEffect(() => {
        getPageList();
    }, [paginationConfig])

    const columns = [
        {
            title: "中文名称",
            dataIndex: "chineseName",
        },
        {
            title: "名称",
            dataIndex: "name",
        },
        {
            title: "部署环境",
            dataIndex: "environmentName",
        },
        {
            title: "集群",
            dataIndex: "clusterName",
        },
        {
            title: "运行环境",
            dataIndex: "applicationRuntimeTypeName",
        },
        {
            title: "部署类型",
            dataIndex: "deploymentTypeName",
        },
        {
            title: "NameSpace",
            dataIndex: "nameSpace",
        },
        {
            title: "部署副本数量",
            dataIndex: "replicas",
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: IDeploymentConfigurationOutputDto) => {
                return (
                    <div className="table-operation">
                        <Tooltip placement="top" title="编辑">
                            <EditOutlined
                                style={{ color: "orange", marginRight: 10, fontSize: 16 }}
                                onClick={() => editRow(record.id, record.masterContainerId)} />
                        </Tooltip>
                        <Tooltip placement="top" title="发布">
                            <CloudUploadOutlined
                                style={{ color: "#1677ff", marginRight: 10, fontSize: 16 }}
                                onClick={() => publishDeploymentConfiguration(record.id)} />
                        </Tooltip>
                        <Tooltip placement="top" title="删除">
                            <Popconfirm
                                placement="top"
                                title="确认删除?"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={() => deleteRow(record.id)}
                                icon={<WarningOutlined />}>
                                <DeleteOutlined style={{ color: "red", fontSize: 16 }} />
                            </Popconfirm>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]
    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total: paginationConfig.total,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
        showTotal: (total) => {
            return `共 ${total} 条`;
        },
        onShowSizeChange: (current: number, pageSize: number) => {
            setPaginationConfig(Pagination => {
                Pagination.pageSize = pageSize;
                Pagination.current = current;
                return Pagination;
            });
            getPageList();
        },
        onChange: (page: number, pageSize?: number) => {
            setPaginationConfig((Pagination) => {
                Pagination.current = page;
                if (pageSize) {
                    Pagination.pageSize = pageSize;
                }
                return Pagination;
            });
            getPageList();
        }
    }

    const onSearch = () => {
        getPageList();
    }

    const getPageList = () => {
        setLoading(true);
        let param = formData.getFieldsValue();
        let _param = {
            pageSize: paginationConfig.pageSize,
            pageIndex: paginationConfig.current,
        }
        _deploymentConfigurationService.getPage(props.appId, _param).then((x) => {
            if (x.success) {
                setTableData(x.result.data);
            }
        }).finally(() => {
            setLoading(false);
        })
    }
    const addChange = () => {
        setOperationElement(<Operation operationType={OperationTypeEnum.add} appId={props.appId} onCallbackEvent={clearElement}></Operation>)
    }

    /***
     * 修改一个配置
     */
    const editRow = (_id: string, _masterContainerId: string) => {
        setOperationElement(<Operation operationType={OperationTypeEnum.edit} appId={props.appId} id={_id}  onCallbackEvent={clearElement}></Operation>)
    }

    /***
     * 发布一个部署配置
     */
    const publishDeploymentConfiguration = (_id: string) => {
        console.log('发布应用')

    }
    const deleteRow = (_id: string) => {
        _deploymentConfigurationService.deleteDeployment(_id).then(res => {
            if (!res.success) {
                message.error(res.errorMessage, 3);
            } else {
                getPageList();
            }
        });
    }
    const clearElement = () => {
        setOperationElement(null);
        getPageList();
    };

    return (
        <div>
            <Spin spinning={loading}>
                <Form form={formData}
                    name="query"
                    layout="horizontal"
                    {...searchFormItemDoubleRankLayout}
                    onFinish={onSearch}
                >
                    <Row>
                        <Col span="24" style={{ textAlign: "right" }}>
                            <ReloadOutlined
                                style={{ textAlign: "right", marginRight: 10, fontSize: 16 }}
                                onClick={() => {
                                    onSearch();
                                }}
                            />
                            <Button
                                shape="round"
                                type="primary"
                                style={{ margin: "8px 8px" }}
                                onClick={() => {
                                    addChange();
                                }}
                            >
                                <PlusOutlined />
                                添加部署
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columns}
                    dataSource={tableData}
                    pagination={pagination}
                    scroll={{ y: 700 }}
                    size="small"
                />
                {subOperationElement}
            </Spin>
        </div>
    )
}

export default DeploymentConfigurationPage;