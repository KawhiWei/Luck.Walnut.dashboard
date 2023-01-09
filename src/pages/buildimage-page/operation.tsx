import { OperationTypeEnum } from "@/shared/operation/operationType";
import { Modal, Form, Row, Col, Input, Button, message } from "antd";
import { useEffect, useState } from "react";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { formItemDoubleRankLayout, tailLayout } from "@/constans/layout/optionlayout";
import { IBuildImageService } from  "@/domain/buildimages/ibuildimage-service";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import { IocTypes } from "@/shared/config/ioc-types";

interface IProp{
    onCallbackEvent?: any;
    id?: string;
    operationType: OperationTypeEnum;
}

const validateMessages = {
    required: "${label} 不可为空",
    types: {

    }
}

const Operation = (props: IProp) => {

    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    const [formData] = Form.useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const _buildImageService: IBuildImageService = useHookProvider(
        IocTypes.BuildImageService
    );

    useEffect(() => {
        onLoad();

    },[formData])

    const onLoad = () => {
        switch (props.operationType){
            case OperationTypeEnum.add:
                editOperationState(true, "添加");
                break;
            case OperationTypeEnum.view:
                editOperationState(true, "查看");
                props.id &&
                _buildImageService.getDetail(props.id).then((rep) => {
                    if (rep.success) {
                        formData.setFieldsValue(rep.result);
                        editOperationState(true, "查看");
                    } else {
                        message.error(rep.errorMessage, 3);
                    }
                });
                break;
            case OperationTypeEnum.edit:
                props.id &&
                _buildImageService.getDetail(props.id).then((rep) => {
                    if (rep.success) {
                        formData.setFieldsValue(rep.result);
                        editOperationState(true, "修改");
                    } else {
                        message.error(rep.errorMessage, 3);
                    }
                });
                break;
        }
    }

    const onCancel = () => {
        editOperationState(false);
        props.onCallbackEvent && props.onCallbackEvent();
    }

    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    };

    const onFinish = () => {
        let param = formData.getFieldsValue();
        switch(props.operationType){
            case OperationTypeEnum.add:
                onAdd(param);
                break;
            case OperationTypeEnum.edit:
                onUpdate(param);
                break;
        }
    }
    const onAdd = (_param:any) => {
        setLoading(true);
        _buildImageService.addBuildImage(_param).then(rep => {
            if(rep.success){
                message.success("保存成功", 3);
                props.onCallbackEvent && props.onCallbackEvent();
            }else{
                message.error(rep.errorMessage, 3);
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    const onUpdate = (_param:any) => {
        props.id && 
        _buildImageService.update(props.id, _param)
        .then(rep => {
            if (!rep.success) {
                message.error(rep.errorMessage, 3);
            } else {
                message.success("保存成功", 3);
                props.onCallbackEvent && props.onCallbackEvent();
            }
        }).finally(() => {
            setLoading(false);
        })
    }
    return (
        <div>
            <Modal
                width={"30%"}
                style={{ borderRadius: 6 }}
                getContainer={false}
                onCancel={onCancel}
                title={
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        {operationState.title}
                    </div>
                }
                closable={false}
                open={operationState.visible}
                footer={null}
            >
                <Form
                    form={formData}
                    {...formItemDoubleRankLayout}
                    name="nest-messages"
                    layout="horizontal"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Row>
                        <Col span="24" style={{ textAlign: "right" }}>
                            <Form.Item
                                name={"name"}
                                label="名称:"
                                rules={[{ required: true }]}
                            >
                                <Input style={{borderRadius: 6}} disabled={props.operationType === OperationTypeEnum.view}/>
                            </Form.Item>
                        </Col>
                        <Col span="24" style={{ textAlign: "right" }}>
                            <Form.Item
                                name={"buildImageName"}
                                label="镜像名:"
                                rules={[{ required: true }]}
                            >
                                <Input style={{borderRadius: 6}} disabled={props.operationType === OperationTypeEnum.view}/>
                            </Form.Item>
                        </Col>
                        <Col span="24" style={{ textAlign: "right" }}>
                            <Form.Item
                                name={"compileScript"}
                                label="构建脚本:"
                                rules={[{ required: true }]}
                            >
                                <Input style={{borderRadius: 6}} disabled={props.operationType === OperationTypeEnum.view}/>
                            </Form.Item>
                        </Col>
                        {props.operationType !==  OperationTypeEnum.view ? 
                        <Col span="24" style={{ textAlign: "right" }}>
                            <Form.Item {...tailLayout}>
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
                            </Form.Item>
                        </Col> 
                        : 
                        <Col span="24" style={{ textAlign: "right" }}>
                            <Form.Item {...tailLayout}>
                                <Button
                                    shape="round"
                                    disabled={loading}
                                    onClick={() => onCancel()}
                                >
                                    确定
                                </Button>
                            </Form.Item>
                        </Col>}
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
export default Operation;