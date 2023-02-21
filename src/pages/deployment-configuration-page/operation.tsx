import "../drawer.less";

import { Button, Drawer, Form, Space } from "antd";
import { useEffect, useState } from "react";

import { IDeploymentConfigurationService } from "@/domain/deployment-configurations/ideployment-configuration-service";
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
     * id
     */
    id?: string;

    /**
     * 操作类型
     */
    operationType: OperationTypeEnum;

    /**
     * 操作类型
     */
    appId: string;
}

const validateMessages = {

}
const Operation = (props: IProp) => {
    const _deploymentConfigurationService: IDeploymentConfigurationService = useHookProvider(IocTypes.DeploymentConfigurationService);
    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
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
                }
            >
                <Form>

                </Form>
            </Drawer>
        </div>
    )
}
export default Operation;