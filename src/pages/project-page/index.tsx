import { Button, Col, Form, Input, PaginationProps, Popconfirm, Row, Spin, Table, Tag, Tooltip, message } from "antd";
import { DeleteOutlined, SettingOutlined, WarningOutlined } from "@ant-design/icons";
import { initPaginationConfig, tacitPagingProps } from "../../shared/ajax/request"
import { useEffect, useState } from "react";

import { IMatterService } from "@/domain/matters/imatter-service";
import { IProjectService } from "@/domain/projects/iproject-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import ProjectOperation from "./operation";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ProjectPage = () => {
    const columns = [
        {
            title: "项目名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "项目状态",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: any) => {
                return <div>
                    <Tag color="blue">{record.projectStatusName}</Tag>
                </div>
            }
        },
        {
            title: "负责人",
            dataIndex: "businessLine",
            key: "businessLine",
        },
        {
            title: "计划开始-结束时间",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: any) => {
                return <div>
                    {record.planStartTime}-{record.planEndTime?record.planEndTime:"无限期"}
                </div>
            }
        },
        {
            title: "工作完成度",
            dataIndex: "mainProductManager",
            key: "mainProductManager",
        },
        {
            title: "需求数量",
            dataIndex: "productAim",
            key: "productAim",
        },
        {
            title: "Bug数量",
            dataIndex: "productPrincipal",
            key: "productPrincipal",
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: any) => {
                return <div className="table-operation">
                    <Tooltip placement="top" title="应用配置">
                        <SettingOutlined style={{ color: '#108ee9', marginRight: 10, fontSize: 16 }} onClick={() => { }} />
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

    const [subOperationElement, setOperationElement] = useState<any>(null);


    const _projectService: IProjectService = useHookProvider(IocTypes.ProjectService);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [loading, setloading] = useState<boolean>(false);
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [formData] = Form.useForm();

    const addChange = () => {
        setOperationElement(<ProjectOperation onCallbackEvent={clearElement} operationType={OperationTypeEnum.add} />)
    }

    const clearElement = () => {
        setOperationElement(null);
        getTable();
    }

    /**
     * 页面初始化事件
     */
    useEffect(() => {
        getTable();
    }, [paginationConfig]);
    
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



    /**
     * 页面初始化获取数据
     */
    const getTable = () => {
        setloading(true);
        let param = { pageSize: paginationConfig.pageSize, pageIndex: paginationConfig.current }
        _projectService.getPageList(param).then(rep => {
            if (rep.success) {
                setPaginationConfig((Pagination) => {
                    Pagination.total = rep.result.total;
                    return Pagination;
                });
                rep.result.data.map((item: any, index: number) => {
                    item.key = item.id;
                    return item;
                });
                setTableData(rep.result.data)
                setloading(false);
            }
            else {
                setloading(false);
            }
        })
    };

    const deleteRow = (_id: string) => {

    };

    return (<div>
        <Spin spinning={loading} >
            <Row >
                <Form form={formData}
                    name="horizontal_login" layout="inline">
                    <Form.Item
                        name="name"
                        label="项目名称">
                        <Input  style = {{borderRadius:8 }}/>
                    </Form.Item>
                    <Button type="primary" shape="round"  htmlType="submit" onClick={() => { getTable() }}>查询</Button>
                </Form>
            </Row>
            <Row>
                <Col span="24" style={{ textAlign: 'right' }}>
                    <Button type="primary" shape="round" style={{ margin: '8px 8px' }} onClick={() => { addChange()}}>添加</Button>
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

export default ProjectPage;