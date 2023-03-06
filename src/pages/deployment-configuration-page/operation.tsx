import "../drawer.less";

import { Button, Card, Col, Drawer, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Switch, Table, Typography } from "antd";
import {
    EditOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { ComponentEnumType } from "@/constans/enum/columnEnum";
import ContainerConfigurationOperation from "./container-configuration-operation";
import { IContainerConfigurationOutputDto } from "@/domain/deployment-configurations/deployment-configuration-dto";
import { IDeploymentConfigurationService } from "@/domain/deployment-configurations/ideployment-configuration-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { formItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

// import "../description.less";



interface IProp {
    /**
     * 操作成功回调事件
     */
    onCallbackEvent?: any;

    /**
     * id
     */
    id?: string;

    /**
     * 操作类型
     */
    operationType: OperationTypeEnum;

    /**
     * 应用Id
     */
    appId: string;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    componentType: ComponentEnumType,
    record: IContainerConfigurationOutputDto;
    children: React.ReactNode;
}





const validateMessages = {
    required: "${label} 不可为空",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};
const Operation = (props: IProp) => {
    const _deploymentConfigurationService: IDeploymentConfigurationService = useHookProvider(IocTypes.DeploymentConfigurationService);
    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });

    const [subContainerConfigurationElement, setContainerConfigurationElement] = useState<any>(null);
    const [deploymentConfigurationFormData] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * 
     */
    const [containerConfigurationOperationType, setContainerConfigurationOperationType] = useState<OperationTypeEnum>(OperationTypeEnum.view);
    const [containerConfigurationFormData] = Form.useForm();
    const [ContainerConfigurationData, setContainerConfigurationData] = useState<Array<IContainerConfigurationOutputDto>>([
        {
            id: "64000d29aa331e36c1d1edc9",
            containerName: "string",
            restartPolicy: "string",
            isInitContainer: false,
            imagePullPolicy: "string",
            image: "string",
            readinessProbe: {
                scheme: "test001",
                path: "api/application/dashboard",
                port: 3000,
                initialDelaySeconds: 2000,
                periodSeconds: 2000,
            },
            liveNessProbe: {
                scheme: "test003",
                path: "api/application/dashboard",
                port: 3000,
                initialDelaySeconds: 2000,
                periodSeconds: 2000,
            }
        },
        {
            id: "64000d29aa331e36c1d1edc8",
            containerName: "string",
            restartPolicy: "string",
            isInitContainer: true,
            imagePullPolicy: "string",
            image: "string",
            readinessProbe: {
                scheme: "test003",
                path: "api/application/dashboard",
                port: 3000,
                initialDelaySeconds: 2000,
                periodSeconds: 2000,
            },
            liveNessProbe: {
                scheme: "test003",
                path: "api/application/dashboard",
                port: 3000,
                initialDelaySeconds: 2000,
                periodSeconds: 2000,
            }
        }

    ]);
    const [editingKey, setEditingKey] = useState("");

    const columns = [
        {
            title: '容器名称',
            dataIndex: 'containerName',
            width: 200,
            editable: true,
            componentType: ComponentEnumType.textInput
        },
        {
            title: '重启规则',
            dataIndex: 'restartPolicy',
            width: 140,
            editable: true,
            componentType: ComponentEnumType.select
        },
        {
            title: '是否初始容器',
            dataIndex: 'isInitContainer',
            width: 200,
            editable: true,
            componentType: ComponentEnumType.switch,
            render: (_: any, record: IContainerConfigurationOutputDto) => {
                return (
                    <Switch disabled={true} checked={record.isInitContainer}></Switch>
                );
            },
        },
        {
            title: '镜像拉取规则',
            dataIndex: 'imagePullPolicy',
            width: 200,
            editable: true,
            componentType: ComponentEnumType.select
        },
        {
            title: '操作',
            width: 200,
            dataIndex: 'operation',
            render: (_: any, record: IContainerConfigurationOutputDto) => {
                return isEditOrAdd(record.id) ? (
                    <span>
                        <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                            保存
                        </Typography.Link>
                        <Popconfirm title="您确定取消编辑吗?" onConfirm={onContainerConfigurationCancel} okText="是" cancelText="否">
                            <a>取消</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span>
                        {/* <Typography.Link disabled={editingKey !== ''} onClick={() => editContainerConfiguration(record)}>
                        编辑
                    </Typography.Link> */}
                        {/* <Typography.Link disabled={editingKey !== ''} onClick={() => editDrawerContainerConfiguration(record)}>
                            Drawer编辑
                        </Typography.Link> */}
                        <EditOutlined style={{ color: "orange", fontSize: 20, }} onClick={() => editDrawerContainerConfiguration(record)} />
                    </span>

                );
            },
        },
    ];


    /**
     * 
     * @returns 
     */
    const isEditOrAdd = (_id: string) => {
        return (containerConfigurationOperationType === OperationTypeEnum.add || containerConfigurationOperationType === OperationTypeEnum.edit) && editingKey === _id;
    }

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IContainerConfigurationOutputDto) => ({
                record,
                componentType: col.componentType,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditOrAdd(record.id),
            }),
        };
    });

    /**
     * 当前单元格渲染组件
     * @param param0 
     * @returns 
     */
    const EditableCell: React.FC<EditableCellProps> = ({
        editing,
        dataIndex,
        title,
        record,
        children,
        componentType,
        ...restProps
    }) => {
        return (
            <td {...restProps}>
                {editing ? (
                    getComponents(componentType, title, dataIndex)
                ) : (
                    children
                )}
            </td>
        );
    };

    /**
     * 获取编辑行的表单组件
     * @param componentType 
     * @param title 
     * @param columnName 
     * @returns 
     */
    const getComponents = (componentType: ComponentEnumType, title: string, columnName: string) => {
        console.log(columnName);
        switch (componentType) {
            case ComponentEnumType.textInput:
                return <Form.Item
                    name={columnName}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>;
            case ComponentEnumType.select:
                return <Form.Item
                    name={columnName}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="string">Demo</Select.Option>
                    </Select>
                </Form.Item>;
            case ComponentEnumType.numBerInput:
                return <Form.Item
                    name={columnName}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>;
            case ComponentEnumType.switch:
                return <Form.Item
                    name={columnName}
                    style={{ margin: 0 }}
                    valuePropName={"checked"}

                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Switch />
                </Form.Item>;
            case ComponentEnumType.doubleTextInput:
                return <Form.Item
                    name={columnName}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>;
            case ComponentEnumType.doubleTextInput:
                return <Form.Item
                    name={columnName}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>;
            default:
                return null;
        }

    };

    /**
     * table可编辑行事件
     * @param record 
     */
    const editContainerConfiguration = (record: IContainerConfigurationOutputDto) => {
        containerConfigurationFormData.setFieldsValue(record);
        setEditingKey(record.id);
        setContainerConfigurationOperationType(OperationTypeEnum.edit)
    };

    /**
     * table可编辑行事件
     * @param record 
     */
    const editDrawerContainerConfiguration = (record: IContainerConfigurationOutputDto) => {

        setContainerConfigurationElement(<ContainerConfigurationOperation

            operationType={OperationTypeEnum.edit}
            deploymentConfigurationId={""}
            onCallbackEvent={clearElement}

        ></ContainerConfigurationOperation>)


        // setContainerConfigurationOperationType(OperationTypeEnum.edit)
    };


    const clearElement = () => {
        setContainerConfigurationElement(null);
    };

    /**
     * table表格编辑行保存
     * @param id 
     */
    const save = (id: string) => {

        console.log(id, containerConfigurationFormData.getFieldsValue());
        setEditingKey('');
        setContainerConfigurationOperationType(OperationTypeEnum.view)

    };

    const onContainerConfigurationCancel = () => {
        setEditingKey('');
        setContainerConfigurationOperationType(OperationTypeEnum.view)
    };



    /**
     * 初始化加载事件
     */
    useEffect(() => {
        onLoad();
    }, []);



    /**
     * 编辑获取一个表单
     * @param _id
     */
    const onLoad = () => {
        switch (props.operationType) {
            case OperationTypeEnum.add:
                editOperationState(true, "添加");
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看");
                break;
            case OperationTypeEnum.edit:
                editOperationState(true, "编辑");
                props.id && console.log(1111)
                break;
        }
    };
    /**
       * 底部栏OK事件
       */
    const onFinish = () => {
        let param = deploymentConfigurationFormData.getFieldsValue();
        console.log(param)
    };

    /**
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false);
        props.onCallbackEvent && props.onCallbackEvent();
    };

    /**
     * 修改弹框属性
     * @param _visible
     * @param _title
     */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    };
    /**
     * 添加容器配置
     */
    const addChange = () => {

        setContainerConfigurationElement(<ContainerConfigurationOperation
            operationType={OperationTypeEnum.add}
            deploymentConfigurationId={""}
            onCallbackEvent={clearElement}

        ></ContainerConfigurationOperation>)
    };


    return (
        <div>
            <Drawer style={{ borderRadius: 6 }}
                width="80%"
                title={
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        {operationState.title}
                    </div>
                }
                onClose={() => onCancel()}
                closable={true}
                open={operationState.visible}
                footer={
                    <Space style={{ float: "right" }}>
                        <Button
                            shape="round"
                            disabled={loading}
                            onClick={() => onCancel()}
                        >
                            取消
                        </Button>
                        <Button
                            shape="round"
                            style={{ margin: "0 8px" }}
                            type="primary"
                            loading={loading}
                            onClick={() => onFinish()}
                        >
                            保存
                        </Button>
                    </Space>
                }>
                <Card title="基础配置" size="default" bordered={false}  >
                    <Form
                        {...formItemDoubleRankLayout}
                        form={deploymentConfigurationFormData}
                        name="nest-messages"
                        layout="horizontal"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                    >
                        <Row>
                            <Col span="12">
                                <Form.Item
                                    name="name"
                                    label="名称："
                                    rules={[{ required: true }]}>
                                    <Input style={{ borderRadius: 6 }} />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="chineseName"
                                    label="中文名称："
                                    rules={[{ required: true }]}>
                                    <Input style={{ borderRadius: 6 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Form.Item
                                    name="environmentName"
                                    label="部署环境："
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        style={{ borderRadius: 6 }}
                                        disabled={props.operationType === OperationTypeEnum.edit}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="applicationRuntimeType"
                                    label="应用运行时类型："
                                    rules={[{ required: true }]}>
                                    <Input style={{ borderRadius: 6 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Form.Item
                                    name="deploymentType"
                                    label="部署类型："
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        style={{ borderRadius: 6 }}
                                        disabled={props.operationType === OperationTypeEnum.edit}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="kubernetesNameSpaceId"
                                    label="命名空间："
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        style={{ borderRadius: 6 }}
                                        disabled={props.operationType === OperationTypeEnum.edit}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Form.Item
                                    name="imagePullSecretId"
                                    label="镜像拉取证书："
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        style={{ borderRadius: 6 }}
                                        disabled={props.operationType === OperationTypeEnum.edit}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <Form.Item
                                    name="replicas"
                                    label="部署副本数量："
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        style={{ borderRadius: 6 }}
                                        disabled={props.operationType === OperationTypeEnum.edit}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="maxUnavailable"
                                    label="最大不可用："
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        style={{ borderRadius: 6 }}
                                        disabled={props.operationType === OperationTypeEnum.edit}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card title="容器配置" size="default" bordered={false} extra={
                    <Button
                        shape="round"
                        type="primary"
                        style={{ margin: "8px 8px" }}
                        onClick={() => {
                            addChange();
                        }}
                    >
                        <PlusOutlined />
                        添加容器配置
                    </Button>
                }>
                    <Form form={containerConfigurationFormData} component={false}>
                        <Table
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={ContainerConfigurationData}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                                onChange: onContainerConfigurationCancel,
                            }}
                            size="small"
                            scroll={{ x: 800 }}
                        />
                    </Form>
                </Card>
            </Drawer>
            {subContainerConfigurationElement}
        </div>
    )
}
export default Operation;