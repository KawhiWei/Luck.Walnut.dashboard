import { Button, Col, Form, Input, PaginationProps, Row, Table, message, Modal } from "antd";
import { formItemLayout, tailLayout } from "@/constans/layout/optionlayout";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useState } from "react";

import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";

const EnvironmentPage  = () => {
    const _environmentService: IEnvironmentService = useHookProvider(IocTypes.EnvironmentService);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [loading, setloading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rowId, setRowId] = useState(null);
    const [subOperationElement, setOperationElement] = useState<any>(null);

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

    // var rowId:any = "";

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
                        <Button type="primary" danger onClick={() => deleteClick(record.id)}>删除</Button>
                        {/*  */}
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

    /**
     * 删除某行
     * @param id 
     */
    const deleteRow = (id:any) => {
        _environmentService.delete(id).then(x => {
            if(x.success){
                message.success('删除成功');
                getTable();
            }else{
                message.error(x.errorMessage, 3);
            }
        })
    }

    const deleteClick=(id:any)=>{
        setRowId(id);
        setIsModalVisible(true);

    }

    const handleOk = () => {
        setIsModalVisible(false);
        deleteRow(rowId);
    }

    const handleCancel = () =>{
        setIsModalVisible(false);
    }

    const addChange=()=>{
        setOperationElement(<Operation onCallbackEvent={clearsubAllocationRoleElement} operationType={OperationTypeEnum.add} />)
    }

    const clearsubAllocationRoleElement = () => {
        setOperationElement(null);
        getTable();
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
                <Button type="primary" style={{ margin: '8px 8px' }} onClick={() => { addChange() }}>添加</Button>
            </Col>
        </Row>
        <Row>
        <Col span={24}><Table bordered  columns={columns} dataSource={tableData} loading={loading} pagination={pagination}/></Col>
        </Row>
        <Modal title="提示" visible={isModalVisible} onOk={handleOk} 
                onCancel={handleCancel} 
                okText="确认"
                cancelText="取消">
            <p>是否确认删除?</p>
        </Modal>
        {subOperationElement}
    </div>)
}

export default EnvironmentPage;