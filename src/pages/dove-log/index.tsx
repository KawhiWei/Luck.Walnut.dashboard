import "./table.less"

import { Button, Col, Form, Input, PaginationProps, Popconfirm, Row, Spin, Table, Tooltip, message } from "antd";
import { DeleteOutlined, SettingOutlined, WarningOutlined } from "@ant-design/icons";
import { initPaginationConfig, tacitPagingProps } from "../../shared/ajax/request"
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IDoveLogService } from "@/domain/logs/idovelog-service";
import { IocTypes } from "@/shared/config/ioc-types";
import { useHistory } from "react-router-dom"
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ApplicationPage = () => {
    const history = useHistory();
    const _doveLogService: IDoveLogService = useHookProvider(IocTypes.DoveLogService);
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [loading, setloading] = useState<boolean>(false);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [subOperationElement, setOperationElement] = useState<any>(null);
    const [formData] = Form.useForm();
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
    const [globalLoading, setGlobalLoading] = useState<boolean>(false);
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
            title: "状态",
            dataIndex: "status",
            key: "status",
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
                    <Tooltip placement="top" title="删除">
                        <Popconfirm placement="top" title="确认删除?" onConfirm={() => deleteRow(record.id)} icon={<WarningOutlined />}>
                            <DeleteOutlined style={{ color: 'red', fontSize: 16 }} />
                        </Popconfirm>
                    </Tooltip>
                </div>
            }
        }
    ];
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
    }, [paginationConfig]);

    /**
     * 页面初始化获取数据
     */
    const getTable = () => {
        setloading(true);
        setGlobalLoading(true);
        let param = { pageSize: paginationConfig.pageSize, pageIndex: paginationConfig.current }
        _doveLogService.getDoveLogList(param).then((x) => {
            // debugger
            // if (x.success) {
                
            //     setPaginationConfig((Pagination) => {
            //         Pagination.total = x.result.total;
            //         return Pagination;
            //     });
            //     // x.data.data.map((item: any, index: number) => {
            //     //     item.key = item.id;
            //     //     return item;
            //     // });
            //     setTableData(x.result.data);
                 setloading(false);
                 setGlobalLoading(false);
            // }
        });

    };

    const clearElement = () => {
        setOperationElement(null);
        getTable();
    }

    const deleteRow = (_id: string) => {
       
    };


    return (<div>
        <Spin spinning={globalLoading}>
            <Row >
                <Form form={formData}
                    name="horizontal_login" layout="inline">
                    <Form.Item
                        name="appId"
                        label="应用标识">
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => { getTable() }}>查询</Button>
                </Form>
            </Row>
            <Row>
            </Row>
            <Row>
                <Col span={24}>
                    <Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} scroll={{ y: 700 }} />
                    </Col>
            </Row>
            {subOperationElement}
        </Spin>
    </div>)
}
export default ApplicationPage;