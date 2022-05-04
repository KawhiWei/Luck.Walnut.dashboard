import { Form, Input, Row, Button, Col, Table, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import { formItemLayout, tailLayout } from "@/constans/layout/optionlayout";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"

import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import { IEnvironmentService } from "@/domain/environment/Ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";

const EnvironmentPage  = () => {
    const _environmentService: IEnvironmentService = useHookProvider(IocTypes.EnvironmentService);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [loading, setloading] = useState<boolean>(false);

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
            title: "应用Id",
            dataIndex: "applicationId",
            key: "applicationId",
        },{
            title: "环境名称",
            dataIndex: "environmentName",
            key: "environmentName",
        },{
            title: "AppId",
            dataIndex: "appId",
            key: "appId",
        },{
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text:any, record: any) => {
                return <div>
                    <Form.Item {...tailLayout}>
                    {/* onClick={() => editRow(record.id)} */}
                        <Button type="primary" >编辑</Button>
                        <Button type="primary" danger >删除</Button>
                        {/* onClick={() => deleteRow(record.id)} */}
                    </Form.Item>
                </div>
            }
        }
    ]

    useEffect(() => {
        getTable();
    }, [paginationConfig])

    /**
     * 获取列表信息
     */
    const getTable = () =>{
        _environmentService.getTable().then((x) => {
            if(x.success){
                setTableData(x.result);
                setloading(false);
            }
        })
    }

    return (<div>
        <Row>
            <Form layout="inline" name="horizontal_login">
                <Form.Item name="environmentName" label="环境名称"> 
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" >查询</Button>
            </Form>
        </Row>
        <Row>
            <Col span="24" style={{ textAlign: 'right' }}>
                {/* onClick={() => { addChange() }} */}
                <Button type="primary" style={{ margin: '8px 8px' }} >添加</Button>
            </Col>
        </Row>
        <Row>
        <Col span={24}><Table bordered  columns={columns} dataSource={tableData} loading={loading} pagination={pagination}/></Col>
        </Row>
    </div>)
}

export default EnvironmentPage;