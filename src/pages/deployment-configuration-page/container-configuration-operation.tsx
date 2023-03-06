import "../drawer.less";

import { Button, Card, Col, Drawer, Form, Input, InputNumber, Row, Space, Switch } from "antd";
import {
    MinusCircleOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { IContainerConfigurationDto } from "@/domain/deployment-configurations/deployment-configuration-dto";
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
     * 部署配置Id
     */
    deploymentConfigurationId: string;
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
const ContainerConfigurationOperation = (props: IProp) => {
    const _deploymentConfigurationService: IDeploymentConfigurationService = useHookProvider(IocTypes.DeploymentConfigurationService);
    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [containerConfigurationDto, setIContainerConfigurationDto] = useState<IContainerConfigurationDto>({
        containerName: '',
        restartPolicy: '',
        isInitContainer: false,
        imagePullPolicy: ''
    });
    const [containerConfigurationFormData] = Form.useForm();

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
                containerConfigurationFormData.setFieldsValue(containerConfigurationDto)
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
        containerConfigurationFormData.validateFields().then((values) => {




        })
        .catch((info) => 
        {
                console.log('Validate Failed:', info);
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
        setOperationState({ visible: _visible, title: _title + "容器配置" });
    };
    return (
        <div>
            <Drawer style={{ borderRadius: 6 }}
                width="60%"
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
                <Form
                    {...formItemDoubleRankLayout}
                    form={containerConfigurationFormData}
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
            </Drawer>
        </div>
    )
}
export default ContainerConfigurationOperation;