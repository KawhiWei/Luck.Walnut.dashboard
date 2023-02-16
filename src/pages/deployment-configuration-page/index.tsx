import {
    Button,
    Col,
    Form,
    message,
    PaginationProps,
    Popconfirm,
    Row,
    Spin,
    Table,
    Tooltip
} from "antd";
import {
    PlusOutlined,
    ReloadOutlined,
    WarningOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import {
    initPaginationConfig,
    tacitPagingProps,
} from "../../shared/ajax/request";
import { useEffect, useState } from "react";

import { IDeploymentConfigurationOutputDto } from "@/domain/deployment-configurations/deployment-configuration-dto";
import { IDeploymentConfigurationService } from "@/domain/deployment-configurations/ideployment-configuration-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * 应用Id
     */
    appId?: string;


}
const DeploymentConfigurationPage = (props: IProp) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData] = Form.useForm();
    const [tableData, setTableData] = useState<Array<IDeploymentConfigurationOutputDto>>();
    const [paginationConfig, setPaginationConfig] =
        useState<initPaginationConfig>(new initPaginationConfig());
    const _deploymentConfigurationService: IDeploymentConfigurationService = useHookProvider(IocTypes.DeploymentConfigurationService);
    useEffect(() => {
        getPageList();
    }, [paginationConfig])

    const columns = [
        {
            title: "部署环境",
            dataIndex: "environmentName",
        },
        {
            title: "应用运行时类型",
            dataIndex: "applicationRuntimeType",
        },
        {
            title: "部署类型",
            dataIndex: "deploymentType",
        },
        {
            title: "中文名称",
            dataIndex: "chineseName",
        },
        {
            title: "名称",
            dataIndex: "name",
        },
        {
            title: "应用Id",
            dataIndex: "appId",
        },
        {
            title: "命名空间Id",
            dataIndex: "kubernetesNameSpaceId",
        },
        {
            title: "部署副本数量",
            dataIndex: "replicas",
        },
        {
            title: "最大不可用",
            dataIndex: "maxUnavailable",
        },
        {
            title: "镜像拉取证书",
            dataIndex: "imagePullSecretId",
        }, {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: any) => {
                return (
                    <div className="table-operation">
                        <Tooltip placement="top" title="删除">
                            <Popconfirm
                                placement="top"
                                title="确认删除?"
                                onConfirm={() => deleteRow(record.id)}
                                icon={<WarningOutlined />}
                            >
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

    }

    const getPageList = () => {
        setLoading(true);
        let param = formData.getFieldsValue();
        let _param = {
            pageSize: paginationConfig.pageSize,
            pageIndex: paginationConfig.current,
        }
        _deploymentConfigurationService.getPage("luck.walnut",_param).then((x) => {
            if(x.success){
                setTableData(x.result.data);
            }
        }).finally(() => {
            setLoading(false);
        })
        setLoading(false);
    }
    const addChange = () => {

    }
    const deleteRow = (_id: string) => {
        _deploymentConfigurationService.delete(_id).then(res => {
            if(!res.success){
                message.error(res.errorMessage, 3);
            }else{
                getPageList();
            }
        });
    }
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
                                    getPageList();
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
                                添加流水线
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
            </Spin>
        </div>
    )
}

export default DeploymentConfigurationPage;