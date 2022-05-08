import { Button, Col, Form, Input, PaginationProps, Row, Table, message, Modal, Layout, List} from "antd";
import { formItemLayout, tailLayout } from "@/constans/layout/optionlayout";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useState } from "react";
import { DeleteTwoTone,FileAddTwoTone } from '@ant-design/icons';

import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";

const EnvironmentPage  = () => {
    const _environmentService: IEnvironmentService = useHookProvider(IocTypes.EnvironmentService);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [listData, setListData] = useState<Array<any>>([]);
    const [loading, setloading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rowId, setRowId] = useState(null);
    const [subOperationElement, setOperationElement] = useState<any>(null);

    const { Header, Footer, Sider, Content } = Layout;

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
            title: "配置项key",
            dataIndex: "key",
            key: "key",
            // : 100
        },{
            title: "配置项Value",
            dataIndex: "value",
            key: "value",
        },{
            title: "配置项类型",
            dataIndex: "type",
            key: "type",
        },{
            title: "是否公开",
            dataIndex: "isOpen",
            key: "isOpen",
        },{
            title: "是否发布",
            dataIndex: "isPublish",
            key: "isPublish",
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
                        {/* onClick={() => deleteClick(record.id)} */}
                        {/*  */}
                    </Form.Item>
                </div>
            }
        }
    ]

    useEffect(() => {
        getList();
    }, [paginationConfig])

    /**
     * 获取列表信息
     */
    const getList = () =>{
        _environmentService.getList().then((x) => {
            if(x.success){
                setListData(x.result);
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
                getList();
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
        getList();
    }

    /**
     * 根据环境获取配置
     * @param _id 
     */
    const getTable=(_id:any)=>{
        setloading(true);
        _environmentService.getTable(_id).then(x => {
            if(x.success){
                setTableData(x.result);
                setloading(false);
            }
        })
    }   


    return (<div>
        <Layout>
            <Sider theme="light">
            {/* {border-bottom:1px solid #000} */}
                <List
                    header={<div style={{ borderBottom:"1px solid #000" }}>
                        <Row>应用名</Row>
                        <Row><FileAddTwoTone onClick={() => { addChange() }}/>
                            {/* <Button type="primary" style={{ margin: '8px 8px' }} onClick={() => { addChange() }}>添加应用</Button> */}
                            </Row>
                    </div>}
                    bordered
                    dataSource={listData}
                    split
                    renderItem={item => (
                        <List.Item key={item.id} onClick={p => getTable(item.id)}
                            actions={[<DeleteTwoTone onClick={p => deleteClick(item.id)}/>]}
                        >
                            <List.Item.Meta title={
                                    <a>{item.environmentName}</a>
                            }>
                            </List.Item.Meta>
                        </List.Item>
                    )}
                >
                </List>
            </Sider>
            <Content>
                <div>
                    <Row><h2>KEY列表</h2></Row>
                    <Row>
                        <Form layout="inline" name="horizontal_login">
                            <Form.Item name="environmentName">
                                <Input placeholder="查找key" />
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
                        <Col span={24}><Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} /></Col>
                    </Row>
                </div>
            </Content>
            
        </Layout>

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