import { Button, Col, Form, Input, Modal, Row, Switch, message } from "antd";
import { formItemLayout, tailLayout } from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IEnvironmentService } from "@/domain/environment/ienvironment-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import TextArea from "antd/lib/input/TextArea";
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

const ConfigOperation = (props: IProp) => {
    const [formData] = Form.useForm();
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const _environmentService: IEnvironmentService = useHookProvider(IocTypes.EnvironmentService);

    /**
    * 页面初始化事件
    */
    useEffect(() => {
        onGetLoad()
    }, [formData]);

    const onFinish = () => {
        let param = formData.getFieldsValue();
        switch (props.operationType) {
            case OperationTypeEnum.add:
                onAdd(param);
                break;
                case OperationTypeEnum.edit:
                onAdd(param);
                break;
        }
    }

    const onAdd = (_param: any) => {
        _environmentService.addAppConfiguration(props.envId, _param).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3)
            } else {
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
    }

    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    }
    /**
     * 编辑
     */
    const onGetLoad = () => {
        switch (props.operationType) {
            case OperationTypeEnum.add:
                editOperationState(true, "添加")
                break;
            case OperationTypeEnum.edit:
                props.id && _environmentService.getConfigDetail(props.id).then(rep => {
                    console.log(rep)
                    if (rep.success) {
                        formData.setFieldsValue(rep.result);
                        editOperationState(true, "修改")
                    }
                })
                break;
        }
    }

    /**
     * 弹框取消
     */
    const onCancel = () => {
        editOperationState(false)
        props.onCallbackEvent && props.onCallbackEvent()
    }

    return (<div>
        <Modal width={800} getContainer={false}
            maskClosable={false}
            title={operationState.title}
            closable={false}
            visible={operationState.visible}
            footer={null}
        >
            <Form form={formData}
                {...formItemLayout}
                labelAlign={"right"}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="key"
                            label="Key"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="type"
                            label="配置值格式">
                            <Input />
                        </Form.Item>
                    </Col>

                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="isOpen"
                            label="是否公开"
                        // rules={[{ required: true }]}
                        >
                             <Switch />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                <Col span="24" style={{ textAlign: 'right' }}>
                        <Form.Item
                            name="value"
                            label="配置项Value"
                            rules={[{ required: true }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        </Col>
                </Row>
                <Row>
                    <Col span="24" style={{ textAlign: 'right' }}>
                        <Form.Item {...tailLayout}>
                            <Button onClick={() => onCancel()}>取消</Button>
                            <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    </div>)

}
export default ConfigOperation;