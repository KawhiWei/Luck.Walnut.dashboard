import { Button, Col, PaginationProps, Row, Table } from "antd";
import { initPaginationConfig, tacitPagingProps } from "../../../shared/ajax/request"

import { useState } from "react";

const UserPage = () => {
    const [tableData, setTableData] = useState<Array<any>>([]);
    const [loading, setloading] = useState<boolean>(false);
    const [paginationConfig, setPaginationConfig] = useState<initPaginationConfig>(new initPaginationConfig());
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
    const addChange = () => {
        // setOperationElement(<UserOperation onCallbackEvent={getTable} operationType={OperationTypeEnum.add} />)
    }
    const columns = [
        {
            title: "应用英文名",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "应用中文名",
            dataIndex: "nickName",
            key: "nickName",
        },
        {
            title: "应用标识",
            dataIndex: "appId",
            key: "appId",
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
            // render: (text: any, record: IBusinessUserDto) => {
            //     return record.isSystem ?null: <div>
            //         <Button type="primary" onClick={() => editRow(record.id)}>编辑</Button>
            //         <Button type="primary" onClick={() => userAllocationRole(record.id)}>分配角色</Button>
            //         <Button type="primary" danger onClick={() => deleteRow(record.id)}>删除</Button>
            //     </div>
            // }
        }
    ];
    
    return (<div>
        <Row>
            <Button type="primary" onClick={() => { addChange() }}>添加</Button>
            <Button type="primary" onClick={() => { }}>查询</Button>
        </Row>
        <Row>
            <Col span={24}><Table bordered columns={columns} dataSource={tableData} loading={loading} pagination={pagination} /></Col>
        </Row>
        {/* {subAllocationRoleElement}
        {subOperationElement} */}
    </div>)
    
}

export default UserPage;