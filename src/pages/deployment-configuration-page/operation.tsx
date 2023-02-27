import "../drawer.less";

import { Button, Card, Col, Drawer, Form, Input, Row, Space } from "antd";
import { useEffect, useState } from "react";

import { IDeploymentConfigurationService } from "@/domain/deployment-configurations/ideployment-configuration-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { formItemDoubleRankLayout } from "@/constans/layout/optionlayout";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

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
    const [formData] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);

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
                props.id && console.log(1111)
                break;
        }
    };
    /**
       * 底部栏OK事件
       */
    const onFinish = () => {
        let param = formData.getFieldsValue();

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
                            htmlType="submit"
                        >
                            保存
                        </Button>
                    </Space>
                }>

                <Card title="基础配置" size="default" bordered={false}  >
                    <Form
                        {...formItemDoubleRankLayout}
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
                <Card title="容器配置" size="default" bordered={false}  >
                    <Form
                        {...formItemDoubleRankLayout}
                    >
                        <Row>
                            <Col span="12">
                                <Form.Item
                                    name="appId"
                                    label="应用唯一标识："
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
                                    name="englishName"
                                    label="应用英文名"
                                    rules={[{ required: true }]}
                                >
                                    <Input style={{ borderRadius: 6 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Drawer>
        </div>
    )
}
export default Operation;