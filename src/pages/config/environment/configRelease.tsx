import { Button, Form, Modal } from "antd";
import { OperationTypeEnum } from "@/shared/operation/operationType";
import { useEffect, useState } from "react";
import { IOperationConfig } from "@/shared/operation/operationConfig";

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

const ConfigRelease = (props: IProp) => {
    const [formData] = Form.useForm();
    const [operationState, setOperationState] = useState<IOperationConfig>({ visible: false })

    useEffect(() => {
        onGetLoad()
    }, [formData])

    const onGetLoad = () => {
        switch (props.operationType){
            case OperationTypeEnum.add:
                editOperationState(true, "添加")
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

    const editOperationState = (_visible: boolean, _title?: string) => {
        setOperationState({ visible: _visible, title: _title });
    }

    return (<div>
        <Modal width={800}
            title={operationState.title}
            visible={operationState.visible}
            footer={null}
            closable={false}
            maskClosable={false}
            getContainer={false}
        >
            123
        </Modal>
    </div>)
}
export default ConfigRelease;