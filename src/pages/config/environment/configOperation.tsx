import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import {Col, Form, Modal, Row,Input, Button, message} from "antd";
import { useEffect, useState } from "react";
import { IocTypes } from "@/shared/config/ioc-types";
import { IOperationConfig } from "@/shared/operation/operationConfig";
import { formItemLayout, tailLayout } from "@/constans/layout/optionlayout";
import { IEnvironmentService } from "@/domain/environment/ienvironment-service";


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

const ConfigOperation = (props:IProp) => {
    const [formData] = Form.useForm();
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })
    return (<div>
        <Modal width={500} getContainer={false} 
            maskClosable={false} 
            title={operationState.title}
            closable={false} 
            visible={operationState.visible}
            footer={null}
        ></Modal>
    </div>)

}
export default ConfigOperation;