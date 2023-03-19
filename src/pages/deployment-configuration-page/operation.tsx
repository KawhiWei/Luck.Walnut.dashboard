import "../drawer.less";

import { Button, Card, Col, Drawer, Form, Input, InputNumber, Popconfirm, Row, Space, Switch, Table, Tooltip, message } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    MinusCircleOutlined,
    PlusOutlined,
    WarningOutlined
} from "@ant-design/icons";
import { IDeploymentConfigurationDto, IDeploymentInputDto, IMasterContainerConfigurationInputDto, IMasterContainerConfigurationOutputDto } from "@/domain/deployment-configurations/deployment-configuration-dto";
import { useEffect, useState } from "react";

import ContainerConfigurationOperation from "./container-configuration-operation";
import { IDeploymentConfigurationService } from "@/domain/deployment-configurations/ideployment-configuration-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import _ from "lodash";
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
    /**
     * 主容器配置Id
     */
    masterContainerId?: string
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

    const [masterContainerConfiguration, setMasterContainerConfiguration] = useState<IMasterContainerConfigurationInputDto>({
        containerName: '',
        restartPolicy: '',
        isInitContainer: false,
        imagePullPolicy: ''
    });

    const [deploymentConfigurationData, setDeploymentConfigurationData] = useState<IDeploymentConfigurationDto>({
        name: "",
        environmentName: "",
        applicationRuntimeType: 0,
        deploymentType: 0,
        chineseName: "",
        appId: "",
        kubernetesNameSpaceId: "",
        replicas: 1,
        maxUnavailable: 0,
        imagePullSecretId: ""
    });


    const [masterContainerConfigurationFormData] = Form.useForm();
    const [containerConfigurationDataArray, setContainerConfigurationArray] = useState<Array<IMasterContainerConfigurationOutputDto>>([]);

    const columns = [
        {
            title: '容器名称',
            dataIndex: 'containerName',
            width: 200,
        },
        {
            title: '重启规则',
            dataIndex: 'restartPolicy',
            width: 140,

        },
        {
            title: '是否初始容器',
            dataIndex: 'isInitContainer',
            width: 200,
            render: (_: any, record: IMasterContainerConfigurationOutputDto) => {
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
        },
        {
            title: '操作',
            width: 200,
            dataIndex: 'operation',
            render: (_: any, record: IMasterContainerConfigurationOutputDto) => {
                return (
                    <div className="table-operation">
                        <Tooltip placement="top" title="发布">
                            <EditOutlined
                                style={{ color: "orange", marginRight: 10, fontSize: 16 }}
                                onClick={() => editContainerConfigurationRow(record.id)} />
                        </Tooltip>
                        <Tooltip placement="top" title="删除">
                            <Popconfirm
                                placement="top"
                                title="确认删除?"
                                okText="确定"
                                cancelText="取消"
                                onConfirm={() => deleteContainerConfigurationRow(record.id)}
                                icon={<WarningOutlined />}
                            >
                                <DeleteOutlined style={{ color: "red", fontSize: 16 }} />
                            </Popconfirm>
                        </Tooltip>
                    </div>
                )
            },
        },
    ];

    /***
     * 修改一个容器配置
     */
    const editContainerConfigurationRow = (_id: string) => {
        if (props.operationType === OperationTypeEnum.edit && props.id) {
            setContainerConfigurationElement(<ContainerConfigurationOperation
                operationType={OperationTypeEnum.edit}
                deploymentId={props.id}
                id={_id}
                onCallbackEvent={onContainerConfigurationCallBack}></ContainerConfigurationOperation>)
        }

    }


    /**
     * 删除容器配置
     * @param _id 
     */
    const deleteContainerConfigurationRow = (_id: string) => {
        props.id && _deploymentConfigurationService.deleteDeploymentContainerConfiguration(props.id, _id).then(res => {
            if (!res.success) {
                message.error(res.errorMessage, 3);
            } else {
                onGetDeploymentConfigurationDetail();
            }
        });
    }

    /**
     * 清空子组件
     */
    const clearElement = () => {
        setContainerConfigurationElement(null);
    };

    /**
     * 容器配置组件回调事件
     */
    const onContainerConfigurationCallBack = () => {
        clearElement();
        onGetDeploymentConfigurationDetail()
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
                deploymentConfigurationFormData.setFieldsValue(deploymentConfigurationData)
                masterContainerConfigurationFormData.setFieldsValue(masterContainerConfiguration)
                editOperationState(true, "添加");
                break;
            case OperationTypeEnum.edit:
                onGetDeploymentConfigurationDetail()
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看");
                break;

        }
    };

    /**
     * 查询配置详情
     */
    const onGetDeploymentConfigurationDetail = () => {
        (props.id && props.masterContainerId) && _deploymentConfigurationService.getDeploymentConfigurationDetail(props.id, props.masterContainerId).then(rep => {
            if (rep.success) {
                console.log(rep)
                deploymentConfigurationFormData.setFieldsValue(rep.result.deploymentConfiguration);
                masterContainerConfigurationFormData.setFieldsValue(rep.result.masterContainerConfiguration)
                // setContainerConfigurationArray(rep.result);
                editOperationState(true, "编辑");
            } else {
                message.error(rep.errorMessage, 3);
            }
        })
    }

    /**
       * 底部栏OK事件
       */
    const onFinish = () => {
        deploymentConfigurationFormData.validateFields().then((_deployment: IDeploymentConfigurationDto) => {

            masterContainerConfigurationFormData.validateFields().then((_masterContainer: IMasterContainerConfigurationInputDto) => {
                _deployment.appId = props.appId;
                _deployment.kubernetesNameSpaceId = "test";

                let param = {
                    deploymentConfiguration: _deployment,
                    masterContainerConfiguration: _masterContainer
                }
                console.log(param)
                switch (props.operationType) {
                    case OperationTypeEnum.add:
                        onCreate(param);
                        break;
                    case OperationTypeEnum.edit:
                        // props.id && onUpdate(props.id, _deployment)
                        props.id && onUpdateDeployment(param)
                        break;
                }
            }).catch((error) => { })


        }).catch((error) => { });
    };

    /**
     * 修改事件
     */
    const onUpdate = (_id: string, _deployment: IDeploymentConfigurationDto) => {
        setLoading(true);
        _deploymentConfigurationService.updateDeploymentConfiguration(_id, _deployment).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3);
            } else {
                message.success("保存成功", 3);
                props.onCallbackEvent && props.onCallbackEvent();
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    /**
     * 修改事件
     */
    const onUpdateDeployment = (_deployment: IDeploymentInputDto) => {
        setLoading(true);
        (props.id && props.masterContainerId) && _deploymentConfigurationService.updateDeployment(props.id, props.masterContainerId, _deployment).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3);
            } else {
                message.success("保存成功", 3);
                props.onCallbackEvent && props.onCallbackEvent();
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    /**
     * 弹框取消事件
     */
    const onCreate = (_param: IDeploymentInputDto) => {
        setLoading(true);
        _deploymentConfigurationService.createDeploymentConfiguration(_param).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3);
            } else {
                message.success("保存成功", 3);
                props.onCallbackEvent && props.onCallbackEvent();
            }
        }).finally(() => {
            setLoading(false);
        });
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
        setOperationState({ visible: _visible, title: _title + '部署配置' });
    };
    /**
     * 添加容器配置
     */
    const addChange = () => {
        if (props.id) {
            setContainerConfigurationElement(<ContainerConfigurationOperation
                operationType={OperationTypeEnum.add}
                deploymentId={props.id}
                onCallbackEvent={onContainerConfigurationCallBack}

            ></ContainerConfigurationOperation>)
        }

    };


    return (
        <div>
            <Drawer
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
                        validateMessages={validateMessages}
                    >
                        <Row>
                            <Col span="12">
                                <Form.Item
                                    name="name"
                                    label="名称："
                                    rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="chineseName"
                                    label="中文名称："
                                    rules={[{ required: true }]}>
                                    <Input />
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
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="kubernetesNameSpaceId"
                                    label="命名空间："
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row>
                            <Col span="12">
                                <Form.Item
                                    name="applicationRuntimeType"
                                    label="应用运行时类型："
                                    rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="deploymentType"
                                    label="部署类型："
                                    rules={[{ required: true }]}
                                >
                                    <Input />
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
                                    <Input />
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
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                            <Col span="12">
                                <Form.Item
                                    name="maxUnavailable"
                                    label="最大不可用："
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                {/* <Card title="容器配置" size="default" bordered={false} extra={
                    <Button
                        shape="round"
                        type="primary"
                        style={{ margin: "8px 8px" }}
                        disabled={props.operationType === OperationTypeEnum.add}
                        onClick={() => {
                            addChange();
                        }}>
                        <PlusOutlined />
                        添加容器配置
                    </Button>
                }>
                        <Table
                            bordered
                            dataSource={containerConfigurationDataArray}
                            columns={columns}
                            size="small"
                            scroll={{ x: 800 }}
                        />
                </Card> */}
                <Card title="容器配置" size="default" bordered={false} >
                    <Form
                        {...formItemDoubleRankLayout}
                        form={masterContainerConfigurationFormData}
                        name="nest-messages"
                        layout="horizontal"
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                    >
                        <Card title="容器基础配置" size="small" bordered={false}  >
                            <Row>
                                <Col span="12">
                                    <Form.Item
                                        name="containerName"
                                        label="容器名称："
                                        rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item
                                        name="restartPolicy"
                                        label="重启规则："
                                        rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form.Item
                                        name="isInitContainer"
                                        label="是否初始容器："
                                        rules={[{ required: true }]}
                                        valuePropName={"checked"}
                                    >
                                        <Switch />
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item
                                        name="imagePullPolicy"
                                        label="镜像拉取规则："
                                        rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                        <Card title="存活探针配置" size="small" bordered={false}  >
                            <Row>
                                <Col span="12">
                                    <Form.Item
                                        name={["readinessProbe", "scheme"]}
                                        label="方案："
                                    >
                                        <Input
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item
                                        name={["readinessProbe", "path"]}
                                        label="路径："
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form.Item
                                        name={["readinessProbe", "port"]}
                                        label="端口："
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item
                                        name={["readinessProbe", "initialDelaySeconds"]}
                                        label="延迟时间："
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form.Item
                                        name={["readinessProbe", "periodSeconds"]}
                                        label="间隔时间："
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                        <Card title="准备探针配置" size="small" bordered={false}  >
                            <Row>
                                <Col span="12">
                                    <Form.Item
                                        name={["liveNessProbe", "scheme"]}
                                        label="方案："
                                    >
                                        <Input
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item
                                        name={["liveNessProbe", "path"]}
                                        label="路径："
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form.Item
                                        name={["liveNessProbe", "port"]}
                                        label="端口："
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item
                                        name={["liveNessProbe", "initialDelaySeconds"]}
                                        label="延迟时间："
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form.Item
                                        name={["liveNessProbe", "periodSeconds"]}
                                        label="间隔时间："
                                    >
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                        <Card title="limit资源配置" size="small" bordered={false}  >
                            <Row>
                                <Col span="12">
                                    <Form.Item
                                        name={["limits", "cpu"]}
                                        label="Cpu："
                                    >
                                        <Input
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item
                                        name={["limits", "memory"]}
                                        label="Memory："
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                        <Card title="request资源配置" size="small" bordered={false}  >
                            <Row>
                                <Col span="12">
                                    <Form.Item
                                        name={["requests", "cpu"]}
                                        label="Cpu："
                                    >
                                        <Input
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item
                                        name={["requests", "memory"]}
                                        label="Memory："
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                        <Card title="环境变量" size="small" bordered={false}  >
                            <Form.List name="environments">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'key']}
                                                    label="Key："
                                                >
                                                    <Input placeholder="请输入Key" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'value']}
                                                    label="Value："
                                                >
                                                    <Input placeholder="请输入Value" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                添加环境变量
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Card>
                    </Form>
                </Card>
            </Drawer>
            {/* {subContainerConfigurationElement} */}
        </div>
    )
}
export default Operation;