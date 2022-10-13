import { Button, Card, Col, Descriptions, Form, Input, Layout, List, Modal, PaginationProps, Popconfirm, Row, Spin, Table, Tabs, Tag, Tooltip, message } from "antd";
import { DeleteOutlined, DeleteTwoTone, EditOutlined, FileAddTwoTone, LeftOutlined, WarningOutlined } from '@ant-design/icons';
import { formItemDoubleRankLayout, tailLayout } from "@/constans/layout/optionlayout";
import { initPaginationConfig, tacitPagingProps } from "../../shared/ajax/request"
import { useEffect, useState } from "react";

import ConfigOperation from "../config/operation";
import ConfigRelease from "./configRelease";
import { IApplication } from "@/domain/applications/application";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IocTypes } from "@/shared/config/ioc-types";
import Operation from "./operation";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { useHistory } from "react-router-dom";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

interface IProp {
    /**
     * Id
     */
    appId?: string;


    /**
     * 环境信息数据
     */
    environmentDataArray: Array<any>;

    /**
     * 环境信息数据
     */
    defaultActiveKey?: string;
}

const EnvironmentPage = (props: IProp) => {
    const columns = [
        {
            title: "AppId",
            dataIndex: "applicationId",
            key: "applicationId",
            // : 100
        },
        {
            title: "环境名称",
            dataIndex: "environmentName",
            key: "environmentName",
        },
        {
            title: "操作",
            dataIndex: "id",
            key: "id",
        }
    ]

    const environmentDataArray = new Array(2).fill(null).map((_, index) => {
        const id = String(index + 1);
        return { label: `Tab ${id}`, children: `Content of Tab Pane ${index + 1}`, key: id };
    });

    return (
        <div>
            <Row>
                <Col span={24}>
                    {/* <Table  columns={columns} dataSource={props.environmentDataArray} scroll={{ y: 600 }} /> */}
                    {/* <Tabs defaultActiveKey="1"
                        items={environmentDataArray}
                    >
                    </Tabs> */}
                </Col>
            </Row>
        </div>)
}

export default EnvironmentPage;