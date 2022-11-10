import {
    ApplicationLevelMap,
    ApplicationStateMap,
} from "@/domain/applications/application-map";
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    message,
} from "antd";
import {
    formItemDoubleRankLayout,
    formItemSingleRankLayout,
    tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { IApplicationPipelineService } from "@/domain/applicationpipelines/iapplicationpipeline-service";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import { IocTypes } from "@/shared/config/ioc-types";
import { useHistory } from "react-router-dom";

interface IProp {

    /**
       * 操作成功回调事件
       */
    onCallbackEvent?: any;
    /**
    * 操作类型
    */
    operationType: OperationTypeEnum;

    id?: string;
    stageList: Array<any>;
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

const SaveOperation = (props: IProp) => {

    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    const _applicationPipelineService: IApplicationPipelineService =
    useHookProvider(IocTypes.ApplicationPipelineService);
    const [formData] = Form.useForm();

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        onGetLoad();
    },[])
    const onGetLoad = () =>{
        switch (props.operationType){
            case OperationTypeEnum.add:
                editOperationState(true, "添加");
                break;
        }
    }
    const history = useHistory();
    /**
   * 修改弹框属性
   * @param _visible
   * @param _title
   */
    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    };
    const onCancel = () =>{
        editOperationState(false);
        props.onCallbackEvent && props.onCallbackEvent();
    }
    const onFinish = () => {
        setLoading(true);
        let data = formData.getFieldsValue();
        var param = {
            appId: data.appId,
            appEnvironmentId: "string",
            name: data.Name,
            pipelineState: 0,
            pipelineScript: props.stageList
        }
        _applicationPipelineService.create(param).then(rep => {
            console.log(rep);
            if(!rep.success){
                message.error(rep.errorMessage, 3);
            }else{
                message.success("保存成功", 3);
                history.push({
                    pathname: "/application/dashboard",
                    state:{
                        defaultActiveKey:"2"
                    }
                });
            }

        }).finally(() => {
            setLoading(false);
        })
    }
    
    return (
        <div>
            <Modal
                width={1000}
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
                visible={operationState.visible}
                footer={null}
            >
                <Form
                    form={formData}
                    {...formItemSingleRankLayout}
                    name="nest-messages"
                    layout="horizontal"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Row>
                        <Col span="24">
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
                    </Row>
                    <Row>
                        <Col span="24">
                            <Form.Item
                                name="Name"
                                label="名称"
                                rules={[{ required: true }]}
                            >
                                <Input style={{ borderRadius: 6 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
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
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}
export default SaveOperation;