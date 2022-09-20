import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Space, message } from "antd";
import { formItemLayout, tailLayout } from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IocTypes } from "@/shared/config/ioc-types";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import React from 'react';
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";

const { RangePicker } = DatePicker;

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

const ProjectOperation = (props: IProp) => {

    const _applicationService: IApplicationService = useHookProvider(IocTypes.ApplicationService);
    const [loading, setLoading] = useState<boolean>(false);

    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    const [formData] = Form.useForm();

    /**
         * 页面初始化事件
         */
    useEffect(() => {
        onGetLoad()
    }, [formData]);



    /**
     * 修改弹框属性
     * @param _visible 
     * @param _title 
     */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    }

    /**
         * 编辑获取一个表单
         * @param _id 
         */
    const onGetLoad = () => {
        switch (props.operationType) {
            case OperationTypeEnum.add:
                editOperationState(true, "添加")
                // formData.setFieldsValue(initformData);
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看")
                break;
            case OperationTypeEnum.edit:
                props.id && _applicationService.getDetail(props.id).then(rep => {
                    console.log(rep)
                    if (rep.success) {
                        formData.setFieldsValue(rep.result);
                        editOperationState(true, "修改")
                    }
                    else{
                        message.error(rep.errorMessage, 3)
                    }
                })
                break;
        }
    }

    /**
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false)
        props.onCallbackEvent && props.onCallbackEvent()
    };


    /**
         * 底部栏OK事件
         */
    const onFinish = () => {
        let param = formData.getFieldsValue();
        switch (props.operationType) {
            case OperationTypeEnum.add:
                onAdd(param);
                break;
            case OperationTypeEnum.edit:
                onUpdate(param);
                break;
        }
        setLoading(false)
    }
    const onAdd = (_param: any) => {
        setLoading(true)
        _applicationService.addApplication(_param).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3)
            }
            else {
                message.success("保存成功",3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })

    }
    const onUpdate = (_param: any) => {
        props.id && _applicationService.update(props.id, _param).then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3)
            }
            else {
                message.success("保存成功",3)
                props.onCallbackEvent && props.onCallbackEvent();
            }
        })


    }

    return (
        <div>
            
            <Modal width={1000} getContainer={false} maskClosable={false} title={operationState.title} closable={false} visible={operationState.visible}
                footer={null}>
                <Form form={formData}
                    {...formItemLayout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Row>
                    <Col span="12">
                            <Form.Item
                                name="name"
                                label="项目名称"
                                rules={[{ required: true }]}
                            >
                                <Input  disabled={props.operationType === OperationTypeEnum.edit} />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                label="项目状态"
                                name="describe"
                                rules={[{ required: true }]}
                            >
                                <Input  style = {{borderRadius:8 }}/>
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row>
                    <Col span="12">
                            <Form.Item
                                label="负责人"
                                name="projectPrincipal"
                                rules={[{ required: true }]}
                            >
                                <Input  style = {{borderRadius:8 }}/>
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="projectStatus"
                                label="状态"
                                rules={[{ required: true }]}
                            >
                                <Input  style = {{borderRadius:8 }}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="departmentName"
                                label="项目开始时间"
                                rules={[{ required: true }]}
                            >
                                {/* <DatePicker /> */}
                            </Form.Item>
                        </Col>

                        <Col span="12">
                        <Form.Item
                                name="departmentName"
                                label="项目结束时间"
                            >
                                 {/* <DatePicker /> */}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" style={{ textAlign: 'right' }}>
                            <Form.Item {...tailLayout}>
                                <Button shape="round" onClick={() => onCancel()}>取消</Button>
                                <Button shape="round" style={{ margin: '0 8px' }} type="primary" loading={loading} htmlType="submit">保存</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
export default ProjectOperation;