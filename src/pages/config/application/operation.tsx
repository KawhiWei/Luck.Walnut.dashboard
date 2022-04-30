import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import { useEffect, useState } from "react";

import { IApplicationService } from "@/domain/applications/iapplication-service";
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
/**
 * form表单布局设置
 */
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
};

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
    
    const _applicationService: IApplicationService = useHookProvider(IocTypes.ApplicationService);

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
        }
        // props.id && _menuservice.getloadRow(props.id).then(res => {
        //     if (res.success) {
        //         console.log(res);
        //         formData.setFieldsValue(res.data);
        //         editOperationState(true, "查看")
        //     }
        // })
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
        _applicationService.addApplication(param).then(rep=>{
            console.log(rep)
        })
        // // console.log(param)
        // let inputDto=new MenuInputDto(param.name,param.path,param.component,param.componentName,"","","","",);
        // switch (props.operationType) {
        //     case OperationTypeEnum.add:
        //         onCreate(inputDto);
        //         break;
        //     case OperationTypeEnum.edit:
        //         onEdit(inputDto);
        //         break;
        //     case OperationTypeEnum.view:
        //         break;
        // }
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
                                name="englishName"
                                label="应用英文名"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="chinessName"
                                label="应用中文名"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form.Item
                                name="appId"
                                label="应用标识"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span="12">
                            <Form.Item
                                name="status"
                                label="状态">
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                    <Col span="12">
                            <Form.Item
                                name="departmentName"
                                label="所属部门"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    
                        <Col span="12">
                            <Form.Item
                                name="linkMan"
                                label="联系人"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" style={{ textAlign: 'right' }}>
                            <Form.Item>
                                <Button style={{ margin: '0 8px' }} onClick={() => onCancel()}>取消</Button>
                                <Button style={{ margin: '0 8px' }} type="primary" htmlType="submit">保存</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
export default Operation;