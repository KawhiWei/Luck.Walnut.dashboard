import { Button, Form, Modal, Table, Row,Input, Tag, PaginationProps,Col,message } from "antd";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { useEffect, useState } from "react";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import { IocTypes } from "@/shared/config/ioc-types";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"

interface IProp {
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;
    /**
     * Id
     */
    id?: string;
    /**
     * 操作类型
     */
    operationType: OperationTypeEnum;
    /**
     * 环境id
     */
    envId: string;
}

const ConfigRelease = (props: IProp) => {
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const _environmentService: IEnvironmentService = useHookProvider(IocTypes.EnvironmentService);
    const [loading, setloading] = useState<boolean>(false);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
    const [tableData, setTableData] = useState<Array<any>>([]);
    const pagination: PaginationProps = {
        ...tacitPagingProps,
        total: paginationConfig.total,
        current: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
        onShowSizeChange: (current: number, pageSize: number) => {
            
            setPaginationConfig((Pagination) => {
                Pagination.current = current;
                Pagination.pageSize = pageSize;
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
            title: "配置项key",
            dataIndex: "key",
            key: "key",
            // : 100
        }, {
            title: "配置项Value",
            dataIndex: "value",
            key: "value",
        }, {
            title: "配置项类型",
            dataIndex: "type",
            key: "type",
        }, {
            title: "组",
            dataIndex: "group",
            key: "group",
        },{
            title: "是否公开",
            dataIndex: "isOpen",
            key: "id",
            render: (text: any, record: any) => {
                return <div>
                    {record.isOpen?<Tag color="cyan">是</Tag>:<Tag color="orange">否</Tag>}
                </div>
            }
        }, {
            title: "是否发布",
            dataIndex: "isPublish",
            key: "id",
            render: (text: any, record: any) => {
                return <div>
                    {record.isPublish?<Tag color="cyan">是</Tag>:<Tag color="orange">否</Tag>}
                </div>
            }
        }, {
            title: "操作",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: any) => {
                return <div className="table-operation">
                        {/*  */}
                        {/* <Button type="primary" onClick={() => editRow(record.id)}>编辑</Button>
                        <Button type="primary" danger onClick={() => deleteClick(record.id, "config")}>删除</Button> */}
                        {/* onClick={() => deleteClick(record.id)} */}
                        {/*  */}
                </div>
            }
        }
    ]

    useEffect(() => {
        onGetLoad()
    }, [])

    const onGetLoad = () => {
        switch (props.operationType){
            case OperationTypeEnum.add:
                editOperationState(true, "添加")
                break;
        }
    }

    /**
     * 获取数据
     */
    const getTable = () => {
        setloading(true);
        props.envId && _environmentService.getConfigRelease(props.envId, {pageSize: paginationConfig.pageSize,pageCount:paginationConfig.current}).then((x) => {
            if(x.success){
                setPaginationConfig((Pagination) => {
                    Pagination.total = x.result.total;
                    return Pagination;
                });
                setTableData(x.result.data);
                setloading(false);
            }
        })
    }

    

    /**
     * 弹框取消
     */
    const onCancel = () => {
        editOperationState(false)
        props.onCallbackEvent && props.onCallbackEvent()
    }

    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const release = () =>  {
        setloading(true);
        props.envId && _environmentService.releasePublish(props.envId,selectedRowKeys).then((rep) => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3)
            } else {
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
    }

    return (<div>
        <Modal width={800}
            title={operationState.title}
            visible={operationState.visible}
            closable={false}
            maskClosable={false}
            getContainer={false}
            onCancel = {onCancel}
        >
            <Form layout="inline" name="horizontal_login">
                <Form.Item name="environmentName">
                    <Input placeholder="查找key" />
                </Form.Item>
                <Button type="primary" htmlType="submit" >查询</Button>
            </Form>
            <Row>
                <Col span="24" style={{ textAlign: 'right' }}>
                <Button type="primary" style={{ margin: '8px 8px '}} onClick={() => { release() }}>发布环境</Button>
                </Col>
            </Row>
            <Table bordered columns={columns} rowSelection={rowSelection} dataSource={tableData}>

            </Table>
        </Modal>
    </div>)
}
export default ConfigRelease;