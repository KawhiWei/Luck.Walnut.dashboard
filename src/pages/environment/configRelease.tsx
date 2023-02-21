import { Button, Col, Form, Input, Modal, PaginationProps, Row, Table, Tag, message } from "antd";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"
import { useEffect, useState } from "react";

import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

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
        }
    ]

    useEffect(() => {
        onGetLoad()
    }, [])

    const onGetLoad = () => {
        editOperationState(true, "发布配置")
        getTable();
    }

    /**
     * 获取数据
     */
    const getTable = () => {
        setloading(true);
        let param = {pageSize: paginationConfig.pageSize,pageIndex:paginationConfig.current};
        props.envId && _environmentService.getConfigRelease(props.envId, param).then((x) => {
            if(x.success){
                setPaginationConfig((Pagination) => {
                    Pagination.total = x.result.total;
                    return Pagination;
                });
                // x.result.data.map((item: any, index: number) => {
                //     item.key = item.id;
                //     return item;
                // });
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
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const release = () =>  {
        setloading(true);
        let param:Array<string> = [];
        selectedRowKeys.map(key => {
            param.push(key.toString());
        });
        props.envId && _environmentService.releasePublish(props.envId, param ).then((rep) => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3)
            } else {
                message.success("发布成功")
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
        setloading(false);
    }

    return (<div>
        <Modal width={800}
            title={operationState.title}
            visible={operationState.visible}
            closable={false}
            maskClosable={false}
            getContainer={false}
            footer={
            <Row>
                <Col span="24" style={{ textAlign: 'right' }}>
                <Button type="primary" style={{ margin: '8px 8px '}} onClick={() => { release() }}>发布配置</Button>
                <Button type="primary" style={{ margin: '8px 8px '}}  onClick={() => {onCancel()}}>取消</Button>
                </Col>
            </Row>
            }
        >
            <Form layout="inline" name="horizontal_login">
                <Form.Item name="environmentName">
                    <Input placeholder="查找key" />
                </Form.Item>
                <Button type="primary" htmlType="submit" >查询</Button>
            </Form>
            {/* <Row>
                <Col span="24" style={{ textAlign: 'right' }}>
                <Button type="primary" style={{ margin: '8px 8px '}} onClick={() => { release() }}>发布环境</Button>
                <Button type="primary" style={{ margin: '8px 8px '}}  onClick={() => {onCancel()}}>取消</Button>
                </Col>
            </Row> */}
            <Table bordered columns={columns}  dataSource={tableData} loading={loading} 
                pagination={pagination}
                rowSelection={rowSelection}
                rowKey={"id"}
            >

            </Table>

        </Modal>
    </div>)
}
export default ConfigRelease;