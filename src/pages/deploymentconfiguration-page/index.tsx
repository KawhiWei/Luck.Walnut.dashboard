import { useEffect, useState } from "react";
import {
    Button,
    Col,
    Form,
    Row,
    Spin,
    Table
} from "antd";
import {
    ReloadOutlined,
    PlusOutlined
} from "@ant-design/icons";
import {
    initPaginationConfig,
    tacitPagingProps,
} from "../../shared/ajax/request";

import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import { IApplicationDeploymentOutputDto } from "@/domain/applicationdeployments/applicationdeployment-dto";

const DeploymentConfigurationPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData] = Form.useForm();
    const [tableData,setTableData]=useState<Array<IApplicationDeploymentOutputDto>>();
    const [paginationConfig, setPaginationConfig] =
    useState<initPaginationConfig>(new initPaginationConfig());
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
        },{
            title: "操作",
            dataIndex: "id",
            key:"id",
            render:(text: any, record: any) => {
                return (
                    <div>

                    </div>
                )
            }
        }

    ]
    // const pagination: PaginationProps = {
    //     ...tacitPagingProps,
    //     total: paginationConfig.total,
    //     current: paginationConfig.current,
    //     pageSize: paginationConfig.pageSize,
    //     showTotal: (total) => {
    //         return `共 ${total} 条`;
    //     }
    // }

    const onSearch = () => {

    }

    const getPageList = () => {

    }
    const addChange = () => {

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
                    dataSource = {tableData}
                    scroll={{y:700}}
                    pagination={pagination}
                />
            </Spin>
        </div>
    )
}

export default DeploymentConfigurationPage;