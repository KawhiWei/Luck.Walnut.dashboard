import "../table.less"

import { Button, Col, Form, Input, PaginationProps, Popconfirm, Row, Select, Spin, Table, Tag, Tooltip, message } from "antd";
import { DeleteOutlined, EditOutlined, FundViewOutlined, SettingOutlined, WarningOutlined } from "@ant-design/icons";
import { formItemDoubleRankLayout, searchFormItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import { initPaginationConfig, tacitPagingProps } from "../../shared/ajax/request"
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { useHistory } from "react-router-dom"
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ApplicationPage = () => {
    const history = useHistory();
    const _applicationService: IApplicationService = useHookProvider(IocTypes.ApplicationService);
    const _projectService: IProjectService = useHookProvider(IocTypes.ProjectService);
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [loading, setloading] = useState<boolean>(false);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [subOperationElement, setOperationElement] = useState<any>(null);
    const [formData] = Form.useForm();
    const [projectArray, setProjectArray] = useState<Array<any>>([])

    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total: paginationConfig.total,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
        onShowSizeChange: (current: number, pageSize: number) => {

            setPaginationConfig((Pagination) => {
                Pagination.pageSize = pageSize;
                Pagination.current = current;
                return Pagination;
            });
            getTable();

        },
        onChange: (page: number, pageSize?: number) => {
            setPaginationConfig((Pagination) => {
                Pagination.current = page;
                if (pageSize) {
                    Pagination.pageSize = pageSize;
                }
                return Pagination;
            });
            getTable();
        }
    };
    const columns = [
        {
            title: "应用英文名",
            dataIndex: "englishName",
            key: "englishName",
        },
        {
            title: "应用中文名",
            dataIndex: "chinessName",
            key: "chinessName",
        },
        {
            title: "应用标识",
            dataIndex: "appId",
            key: "appId",
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
            render: (text: any, record: any) => {
                return <div>
                    <Tag color={getapplicationStateTag(record.applicationState)}>{record.applicationStateName}</Tag>
                    {/* <Tag color="blue">{record.projectStatusName}</Tag> */}
                </div>
            }
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
            render: (text: any, record: any) => {
                return <div className="table-operation">
                    <Tooltip placement="top" title="应用配置">
                        <SettingOutlined style={{ color: '#108ee9', marginRight: 10, fontSize: 16 }} onClick={() => goToConfig(record.appId)} />
                    </Tooltip>
                    <Tooltip placement="top" title="编辑">
                        <EditOutlined style={{ color: 'orange', marginRight: 10, fontSize: 16 }} onClick={() => editRow(record.id)} />
                    </Tooltip>
                    <Tooltip placement="top" title="删除">
                        <Popconfirm placement="top" title="确认删除?" onConfirm={() => deleteRow(record.id)} icon={<WarningOutlined />}>
                            <DeleteOutlined style={{ color: 'red', fontSize: 16 }} />
                        </Popconfirm>
                    </Tooltip>
                </div>
            }
        }
    ];

    /**
         * 处理标签
         * @param _projectStatus 
         * @returns 
         */
    const getapplicationStateTag = (_applicationState: any): string => {
        switch (_applicationState) {
            case "NotStart":
                return "orange";
            case "UnderDevelopment":
                return "processing";
            case "NotOnline":
                return "magenta";
            case "OnlineRunning":
                return "success";
            case "Offline":
                return "error";
            default:
                return "";
        }
    }

    const goToConfig = (_appId: string) => {
        history.push({
            pathname: "environment",
            state: {
                appId: _appId
            }
        });
    }
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        getTable();
        onGetProjectList();
    }, [paginationConfig]);


    const onSearch = () => {

    }

    const onGetProjectList = () => {
        let param = { pageSize: 1000, pageIndex: 1 }
        _projectService.getPageList(param).then(rep => {
            if (rep.success) {
                setProjectArray(rep.result.data)
                console.log(rep.result.data)
            }
        })
    }
    /**
     * 修改任务
     * @param _id 
     */
    const editRow = (_id: any) => {
        setOperationElement(<Operation onCallbackEvent={clearElement} operationType={OperationTypeEnum.edit} id={_id} projectArray={projectArray} />)
    }

    /**
     * 页面初始化获取数据
     */
    const getTable = () => {
        setloading(true);
        let param = { pageSize: paginationConfig.pageSize, pageIndex: paginationConfig.current }
        _applicationService.gettable(param).then((x) => {
            if (x.success) {
                setPaginationConfig((Pagination) => {
                    Pagination.total = x.result.total;
                    return Pagination;
                });
                setTableData(x.result.data);
                setloading(false);
            }
        });

    };

    const clearElement = () => {
        setOperationElement(null);
        getTable();
    }

    const deleteRow = (_id: string) => {
        _applicationService.delete(_id).then(res => {
            if (!res.success) {
                message.error(res.errorMessage, 3)
            }
            else {
                getTable();
            }
        });
    };

    const addChange = () => {
        setOperationElement(<Operation onCallbackEvent={clearElement} projectArray={projectArray} operationType={OperationTypeEnum.add} />)
    }

    return (<div>
        <Spin spinning={loading}>
            <Form form={formData}
                name="horizontal_login"
                layout="horizontal"
                {...searchFormItemDoubleRankLayout}
                onFinish={onSearch}>
                <Row >
                    <Col span="6">
                        <Form.Item
                            name="projectId"
                            label="项目：">
                            <Select allowClear={true} placeholder="请选择项目">
                                {projectArray.map((item: any) => {
                                    return <Select.Option value={item.id}>{item.name}</Select.Option>;
                                }
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item
                            name="appId"
                            label="应用标识：">
                            <Input style={{ borderRadius: 8 }} placeholder="请请输入应用标识" />
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item
                            name="englishName"
                            label="应用英文名称：">
                            <Input style={{ borderRadius: 8 }} placeholder="请请输入应用英文名称" />
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item
                            name="chinessName"
                            label="应用中文名称：">
                            <Input style={{ borderRadius: 8 }} placeholder="请请输入应用标识" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row >
                    <Col span="6">
                        <Form.Item
                            name="principal"
                            label="应用负责人：">
                            <Select allowClear={true} placeholder="请选择应用负责人">
                                {projectArray.map((item: any) => {
                                    return <Select.Option value={item.id}>{item.name}</Select.Option>;
                                }
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span="6">
                        <Form.Item
                            name="applicationStatus"
                            label="应用状态：">
                            <Input style={{ borderRadius: 8 }} placeholder="请请输入应用标识" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row >
                    <Col span="6" style={{ textAlign: 'center' }}>
                        <Button type="primary" shape="round" htmlType="submit" onClick={() => { getTable() }}>查询</Button>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col span="24" style={{ textAlign: 'right' }}>
                    <Button shape="round" type="primary" style={{ margin: '8px 8px' }} onClick={() => { addChange() }}>添加</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table size="small" columns={columns} dataSource={tableData} pagination={pagination} scroll={{ y: 700 }} />
                </Col>
            </Row>
            {subOperationElement}
        </Spin>
    </div>)
}
export default ApplicationPage;