import {
    Button,
    Col,
    Form,
    Input,
    PaginationProps,
    Popconfirm,
    Row,
    Select,
    Spin,
    Table,
    Tag,
    Tooltip,
    message,
} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    SearchOutlined,
    SettingTwoTone,
    WarningOutlined,
} from "@ant-design/icons";
import {
    initPaginationConfig,
    tacitPagingProps,
} from "../../../shared/ajax/request";

import { searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import { useState } from "react";

const ApplicationDeploymentPage = () => {



    const [formData] = Form.useForm();
    const [paginationConfig, setPaginationConfig] =
        useState<initPaginationConfig>(new initPaginationConfig());
    const [loading, setLoading] = useState<boolean>(false);

    const [tableData, setTableData] = useState<Array<any>>([]);
    /**
       * 跳转到配置中心
       * @param _appId
       */
    const goToConfig = (_appId: string) => {

    };


    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total: paginationConfig.total,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
        showTotal: (total) => {
            return `共 ${total} 条`;
        },
        onShowSizeChange: (current: number, pageSize: number) => {
            setPaginationConfig((Pagination) => {
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
        },
    };

    /**
     * 页面初始化获取数据
     */
    const getPageList = () => {
        setLoading(true);
        let param = formData.getFieldsValue();
        let _param = {
            pageSize: paginationConfig.pageSize,
            pageIndex: paginationConfig.current,
            projectId: param.projectId,
            appId: param.appId,
            englishName: param.englishName,
            chineseName: param.chineseName,
            principal: param.principal,
            applicationState: param.applicationState,
        };
    };
    const onSearch = () => {
        setPaginationConfig((Pagination) => {
            Pagination.current = 1;
            return Pagination;
        });
        getPageList();
    };
    const columns = [
        {
            title: "应用英文名",
            dataIndex: "englishName",
            key: "englishName",
        },
        {
            title: "应用中文名",
            dataIndex: "chineseName",
            key: "chineseName",
        },
        {
            title: "应用标识",
            dataIndex: "appId",
            key: "appId",
        },
        {
            title: "应用类型",
            dataIndex: "developmentLanguage",
            key: "developmentLanguage",
        },
        {
            title: "所属项目",
            dataIndex: "projectName",
            key: "projectName",
        },
        {
            title: "所属部门",
            dataIndex: "departmentName",
            key: "departmentName",
        },
        {
            title: "应用状态",
            dataIndex: "id",
            key: "id",
            width: 120,
            // fixed: 'right',
            render: (text: any, record: any) => {
                return (
                    <div>
                    </div>
                );
            },
        },
        {
            title: "联系人",
            dataIndex: "linkMan",
            key: "linkMan",
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            _render: (text: any, record: any) => {
                return (
                    <div className="table-operation">
                        <Tooltip placement="top" title="应用看板">
                            <EyeOutlined
                                style={{ color: "#108ee9", marginRight: 10, fontSize: 16 }}
                                onClick={() => goToConfig(record.appId)}
                            />
                        </Tooltip>
                        <Tooltip placement="top" title="配置管理">
                            <SettingTwoTone
                                style={{ marginRight: 10, fontSize: 16 }}
                                onClick={() => goToConfig(record.appId)}
                            />
                        </Tooltip>
                        <Tooltip placement="top" title="编辑">
                            <EditOutlined
                                style={{ color: "orange", marginRight: 10, fontSize: 16 }}
                                onClick={() => goToConfig(record.id)}
                            />
                        </Tooltip>
                        <Tooltip placement="top" title="删除">
                            <Popconfirm
                                placement="top"
                                title="确认删除?"
                                onConfirm={() => goToConfig(record.id)}
                                icon={<WarningOutlined />}
                            >
                                <DeleteOutlined style={{ color: "red", fontSize: 16 }} />
                            </Popconfirm>
                        </Tooltip>
                    </div>
                );
            },
            get render() {
                return this._render;
            },
            set render(value) {
                this._render = value;
            },
        },
    ];

    return (
        <div>
            <Spin spinning={loading}>
                <Form
                    form={formData}
                    name="horizontal_login"
                    layout="horizontal"
                    {...searchFormItemDoubleRankLayout}
                    onFinish={onSearch}
                >
                    <Row>
                        <Col span="6">
                            <Form.Item name="projectId" label="项目：">
                                <Select allowClear={true} placeholder="请选择项目">

                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item name="appId" label="应用标识：">
                                <Input
                                    style={{ borderRadius: 8 }}
                                    placeholder="请请输入应用标识"
                                />
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item name="englishName" label="应用英文名称：">
                                <Input
                                    style={{ borderRadius: 8 }}
                                    placeholder="请请输入应用英文名称"
                                />
                            </Form.Item>
                        </Col>
                        <Col span="6">
                            <Form.Item name="chinessName" label="应用中文名称：">
                                <Input
                                    style={{ borderRadius: 8 }}
                                    placeholder="请请输入应用标识"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6" style={{ textAlign: "center" }}>
                            <Button
                                type="primary"
                                shape="round"
                                htmlType="submit"
                                onClick={() => {
                                    getPageList();
                                }}
                            >
                                <SearchOutlined />
                                查询
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col span="24" style={{ textAlign: "right" }}>
                        <Button
                            shape="round"
                            type="primary"
                            style={{ margin: "8px 8px" }}
                            onClick={() => {
                                goToConfig("");
                            }}
                        >
                            <PlusOutlined />
                            添加
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table
                            columns={columns}
                            dataSource={tableData}
                            pagination={pagination}
                            scroll={{ y: 700 }}
                        />
                    </Col>
                </Row>
                { }
            </Spin>
        </div>
    );
};
export default ApplicationDeploymentPage;