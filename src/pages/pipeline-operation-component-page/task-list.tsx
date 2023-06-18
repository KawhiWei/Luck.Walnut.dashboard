import {
    Button,
    Card,
    Col,
    Drawer,
    Form,
    Input,
    Modal,
    Row
} from "antd";
import {
    formItemSingleRankLayout,
    tailLayout,
} from "@/constans/layout/optionlayout";
import { useEffect, useState } from "react";

import { IOperationConfig } from "@/shared/operation/operationConfig";
import { IStageDto } from "@/domain/applicationpipelines/applicationpipeline-dto";
import { OperationTypeEnum } from "@/shared/operation/operationType";

interface IProp {

    /**
     * 回调事件
     */
    onCallbackEvent: any;

    /**
     * 阶段下标
     */
    stageIndex: number;
}

/***
 * 任务列表
 */
const TaskList = (props: IProp) => {
    /**
     * 页面初始化事件
     */
    useEffect(() => {
        editOperationState(true, "选择任务");

    }, []);

    const [operationState, setOperationState] = useState<IOperationConfig>({
        visible: false,
    });
    /**
     * 弹框取消事件
     */
    const onCancel = () => {
        editOperationState(false);
        props.onCallbackEvent();
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
            <Drawer
                width={"35%"}
                style={{ borderRadius: 6 }}
                getContainer={false}
                onClose={() => onCancel()}
                title={
                    <div
                        style={{
                            borderRadius: 10,
                        }}
                    >
                        {operationState.title}
                    </div>
                }
                // closable={false}
                open={operationState.visible}
                footer={null}
            >

            </Drawer>
        </div>
    );
};

export default TaskList;
