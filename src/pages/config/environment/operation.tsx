import {Button, Col, Form, Input, Modal, Row, message} from "antd";
import { formItemLayout, tailLayout } from "@/constans/layout/optionlayout";
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
    operationType: OperationTypeEnum
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
    const _environmentService: IEnvironmentService = useHookProvider(IocTypes.EnvironmentService);
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [formData] = Form.useForm();

    /**
         * 页面初始化事件
         */
    useEffect(() => {
        onGetLoad()
    }, [formData]);

    const onGetLoad=()=>{
        switch (props.operationType) {
            case OperationTypeEnum.add:
                editOperationState(true, "添加")
                // formData.setFieldsValue(initformData);
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看")
                break;
            // case OperationTypeEnum.edit:
            //     props.id && _environmentService.getDetail(props.id).then(rep => {
            //         console.log(rep)
            //         if (rep.success) {
            //             formData.setFieldsValue(rep.result);
            //             editOperationState(true, "修改")
            //         }
            //     })
            //     break;
        }
    }

    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    }

    const onFinish = () => {
        let field = formData.getFieldsValue();        
        let param={
            environmentName:field.environmentName,
            applicationId:props.id
        }
        console.log(param)
        
        switch (props.operationType) {
            case OperationTypeEnum.add:
                onAdd(param);
                break;
            // case OperationTypeEnum.edit:
            //     onUpdate(param);
            //     break;
        }
    };

    const onAdd=(_param: any) => {
        _environmentService.addEnvironment(_param).then(res => {
            if (!res.success) {
                message.error(res.errorMessage, 3)
            }
            else {
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })
    }

    /**
    * 弹框取消事件
    */
    const onCancel = () => {
        editOperationState(false)
        props.onCallbackEvent && props.onCallbackEvent()
    };
    return (<div>
        <Modal width={500} getContainer={false} 
            maskClosable={false} 
            title={operationState.title}
            closable={false} 
            visible={operationState.visible}
            footer={null}
        >
            <Form form={formData}
                {...formItemLayout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="environmentName"
                    label="环境名称"
                    rules={[{ required: true }]}
                    style={{ textAlign:'left'}}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                    style={{ textAlign:'right'}}
                >
                    <Button onClick={() => onCancel()}>取消</Button>
                    <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>)
}
export default Operation;
