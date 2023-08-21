import "@/pages/drawer.less";

import { Button, Card, Col, Drawer, Form, Input, InputNumber, Row, Space, Switch, message } from "antd";
import {
    MinusCircleOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { IMasterContainerConfigurationInputDto } from "@/domain/kubernetes/workloads/workload-dto";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IWorkLoadService } from "@/domain/kubernetes/workloads/iworkload-service";
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
    deploymentId: string;
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
    const _deploymentConfigurationService: IWorkLoadService = useHookProvider(IocTypes.WorkLoadService);
    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [deploymentContainerConfiguration, setDeploymentContainerConfiguration] = useState<IMasterContainerConfigurationInputDto>({
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
                containerConfigurationFormData.setFieldsValue(deploymentContainerConfiguration)
                editOperationState(true, "添加");
                break;
            case OperationTypeEnum.edit:
                props.id && onGetDeploymentContainerConfigurationDetail(props.id)
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看");
                break;
        }
    };

    const onGetDeploymentContainerConfigurationDetail = (_id: string) => {
        _deploymentConfigurationService.getDeploymentContainerConfigurationDetail(_id).then(rep => {
            if (rep.success) {
                containerConfigurationFormData.setFieldsValue(rep.result);
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
        containerConfigurationFormData.validateFields().then((_deploymentContainer: IMasterContainerConfigurationInputDto) => {
            switch (props.operationType) {
                case OperationTypeEnum.add:
                    break;
                case OperationTypeEnum.edit:
                    props.id && onUpdate(props.deploymentId, props.id, _deploymentContainer)
                    break;
            }
        })
            .catch((error) => {
                
            });

    };



    /**
     * 修改事件
     */
    const onUpdate = (_deploymentId: string, _id: string, _deploymentContainer: IMasterContainerConfigurationInputDto) => {
        setLoading(true);
        _deploymentConfigurationService.updateDeploymentContainerConfiguration(_deploymentId, _id, _deploymentContainer).then(rep => {
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
                    
                </Form>
            </Drawer>
        </div>
    )
}
export default ContainerConfigurationOperation;