import { OperationTypeEnum } from "@/shared/operation/operationType";
import { Button, Drawer, Form, Space } from "antd";
import "../drawer.less";
import { useEffect, useState } from "react";
import { IDeploymentConfigurationService } from "@/domain/deployment-configurations/ideployment-configuration-service";
import useHookProvider from "@/shared/customHooks/ioc-hook-provider";
import { IocTypes } from "@/shared/config/ioc-types";
import { IOperationConfig } from "@/shared/operation/operationConfig";

interface IProp{
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
}

const validateMessages = {

}
const Operation = (props: IProp) => {
    const _deploymentConfigurationService: IDeploymentConfigurationService = useHookProvider(IocTypes.DeploymentConfigurationService);
    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {

    },[]);
    const onCancel = () => {

    }

    return (
        <div>
            <Drawer style={{ borderRadius: 6 }}
                getContainer={false}
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
                closable={false}
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