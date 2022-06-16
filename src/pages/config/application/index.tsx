import "../table.less"

import { Button, Col, Form, Input, PaginationProps, Row, Table, message } from "antd";
import { formItemLayout, tailLayout } from "@/constans/layout/optionlayout";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { right } from "@antv/x6/lib/registry/port-layout/line";
import { useHistory } from "react-router-dom"
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const ApplicationPage = () => {
    const history = useHistory();
    const _applicationService: IApplicationService = useHookProvider(IocTypes.ApplicationService);
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
                        <Button type="primary" onClick={() => editRow(record.id)}>编辑</Button>
                        <Button type="primary" onClick={()=>goToConfig(record.appId)}>应用配置</Button>
                        <Button type="primary" danger onClick={() => deleteRow(record.id)}>删除</Button>
                </div>
            }
        }
    ];
    const goToConfig = (_appId: string) => {
        history.push({
            pathname: "environment",
            state:{
                appId:_appId
            }
        });
    }
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        getTable();
    }, [paginationConfig]);


    const onSearch = () => {

    }
    /**
     * 修改任务
     * @param _id 
     */
    const editRow = (_id: any) => {
        setOperationElement(<Operation onCallbackEvent={clearElement} operationType={OperationTypeEnum.edit} id={_id} />)
    }

    /**
     * 页面初始化获取数据
     */
    const getTable = () => {
        setloading(true);
        _applicationService.gettable().then((x) => {
            if (x.success) {
                // setPaginationConfig((Pagination) => {
                //     Pagination.total = x.data.total;
                //     return Pagination;
                // });
                // x.data.data.map((item: any, index: number) => {
                //     item.key = item.id;
                //     return item;
                // });
                setTableData(x.result);
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
        setOperationElement(<Operation onCallbackEvent={clearElement} operationType={OperationTypeEnum.add} />)
    }

    return (<div>
        <Row >
            <Form form={formData}
                name="horizontal_login" layout="inline"
                onFinish={onSearch}>
                <Form.Item
                    name="appId"
                    label="应用标识">
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" onClick={() => { getTable() }}>查询</Button>
            </Form>
        </Row>
        <Row>
            <Col span="24" style={{ textAlign: 'right' }}>
                <Button type="primary" style={{ margin: '8px 8px' }} onClick={() => { addChange() }}>添加</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}><Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} /></Col>
        </Row>
        {subOperationElement}
    </div>)

}

export default ApplicationPage;